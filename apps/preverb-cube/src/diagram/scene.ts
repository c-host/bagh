import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { AXIS_COLORS, CUBE_AXIS_ENDPOINTS, CUBE_AXIS_SEGMENTS } from './axis-labels'
import { axisArrowsForPreverb } from './preverb-arrows'
import type { DirectionArrowId, LayoutData, PreverbEntry, PreverbTier } from './types'
import { escapeHtml } from '../util/html'

/** Vertical offset (world units): plane sits this far below the და- label anchor. */
const DA_PLANE_BELOW_LABEL = 0.1

/**
 * Translucent “enclosure” inner box (world units). The wireframe cube is 2×2×2 (from −1 to +1 on each axis).
 * Set each dimension below 2 so the shell sits inside the edges; larger → closer to the wireframe; smaller → tighter core.
 */
const ENCLOSURE_BOX_SIZE: [number, number, number] = [1, 1, 1]

const DIM_LINE = 0.06
const DIM_CONE = 0.09
const HI_LINE = 0.58
const HI_CONE = 0.72

const TIER_CLASS: Record<string, string> = {
  modern_simple: 'pd-label--modern-simple',
  modern_complex: 'pd-label--modern-complex',
  old_simple: 'pd-label--old-simple',
  old_complex: 'pd-label--old-complex',
}

type SceneTheme = 'light' | 'dark'

export class PreverbScene {
  readonly scene: THREE.Scene
  readonly camera: THREE.PerspectiveCamera
  readonly renderer: THREE.WebGLRenderer
  readonly labelRenderer: CSS2DRenderer
  readonly controls: OrbitControls
  private readonly container: HTMLElement
  private currentTheme: SceneTheme = 'light'
  private readonly pickMeshes = new Map<string, THREE.Mesh>()
  private readonly labelById = new Map<string, CSS2DObject>()
  private readonly raycaster = new THREE.Raycaster()
  private readonly pointer = new THREE.Vector2()
  private animationId = 0
  private onPick: ((id: string | null) => void) | null = null
  private readonly defaultCameraPosition = new THREE.Vector3(2.8, 2.2, 3.2)
  private readonly defaultTarget = new THREE.Vector3(0, 0, 0)
  private readonly axisArrowById = new Map<DirectionArrowId, THREE.ArrowHelper>()
  private readonly axisLines: THREE.Line[] = []
  private cubeEdges: THREE.LineSegments | null = null
  private daPlane: THREE.Mesh | null = null
  private tsaHintArrow: THREE.ArrowHelper | null = null
  /** Faint inner volume so შე-/გა- read as into / out of an enclosure */
  private enclosureShell: THREE.Mesh | null = null
  /**
   * Inbound “into volume” shaft: starts near the შე- (−Z) face, ends toward the interior.
   * Used whenever `she` is highlighted without `ga` (plain შე-, შემო-, წამო-, etc.).
   */
  private sheInboundArrow: THREE.ArrowHelper | null = null
  /** გადა-: two Z-axis arrows from center toward −Z / +Z enclosure bounds (outward, bounded) */
  private readonly gadaEnclosureArrows: THREE.ArrowHelper[] = []
  /** World position of წა- (tsa) label (updated in buildLabels); departure hint starts here */
  private readonly tsaHintAnchor = new THREE.Vector3(0.85, 0.15, -0.35)
  /** World position of და- label (updated in buildLabels); horizontal plane is placed just below */
  private readonly daPlaneAnchor = new THREE.Vector3(0.2, -0.76, -0.48)

  constructor(container: HTMLElement, _fontFamily?: string) {
    this.container = container
    const w = container.clientWidth || 640
    const h = container.clientHeight || 480

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf8f9fa)

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    this.camera.position.copy(this.defaultCameraPosition)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    container.appendChild(this.renderer.domElement)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(w, h)
    this.labelRenderer.domElement.className = 'pd-label-layer'
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0'
    this.labelRenderer.domElement.style.left = '0'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    container.appendChild(this.labelRenderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.copy(this.defaultTarget)
    this.controls.enableDamping = true
    this.controls.minDistance = 2
    this.controls.maxDistance = 12

    const amb = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(amb)

    const box = new THREE.BoxGeometry(2, 2, 2)
    const edges = new THREE.EdgesGeometry(box)
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x495057, linewidth: 1 })
    )
    this.cubeEdges = line
    this.scene.add(line)

    const shellGeom = new THREE.BoxGeometry(...ENCLOSURE_BOX_SIZE)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x5b4d8c,
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    this.enclosureShell = new THREE.Mesh(shellGeom, shellMat)
    this.scene.add(this.enclosureShell)

    for (const seg of CUBE_AXIS_SEGMENTS) {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...seg.from),
        new THREE.Vector3(...seg.to),
      ])
      const mat = new THREE.LineBasicMaterial({
        color: AXIS_COLORS[seg.key],
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
      const axisLine = new THREE.Line(geom, mat)
      this.axisLines.push(axisLine)
      this.scene.add(axisLine)
    }

    const arrowSpec: { id: DirectionArrowId; dir: THREE.Vector3; color: number }[] = [
      { id: 'a', dir: new THREE.Vector3(0, 1, 0), color: AXIS_COLORS.y },
      { id: 'cha', dir: new THREE.Vector3(0, -1, 0), color: AXIS_COLORS.y },
      { id: 'mi', dir: new THREE.Vector3(1, 0, 0), color: AXIS_COLORS.x },
      { id: 'mo', dir: new THREE.Vector3(-1, 0, 0), color: AXIS_COLORS.x },
      /** Toward შე- at −Z (into) */
      { id: 'she', dir: new THREE.Vector3(0, 0, -1), color: AXIS_COLORS.z },
      /** Toward გა- at +Z (out) */
      { id: 'ga', dir: new THREE.Vector3(0, 0, 1), color: AXIS_COLORS.z },
    ]
    for (const { id, dir, color } of arrowSpec) {
      const ah = new THREE.ArrowHelper(
        dir.clone().normalize(),
        new THREE.Vector3(0, 0, 0),
        1.02,
        color,
        0.2,
        0.14
      )
      const lineM = ah.line.material as THREE.LineBasicMaterial
      lineM.transparent = true
      lineM.opacity = DIM_LINE
      lineM.depthWrite = false
      const coneM = ah.cone.material as THREE.MeshBasicMaterial
      coneM.transparent = true
      coneM.opacity = DIM_CONE
      coneM.depthWrite = false
      ah.userData.arrowId = id
      this.axisArrowById.set(id, ah)
      this.scene.add(ah)
    }

    const inboundDir = new THREE.Vector3(0, 0, 1)
    const inboundOrigin = new THREE.Vector3(0, 0, -1.07)
    this.sheInboundArrow = new THREE.ArrowHelper(
      inboundDir,
      inboundOrigin,
      0.94,
      AXIS_COLORS.z,
      0.2,
      0.14
    )
    const inL = this.sheInboundArrow.line.material as THREE.LineBasicMaterial
    inL.transparent = true
    inL.opacity = DIM_LINE
    inL.depthWrite = false
    const inC = this.sheInboundArrow.cone.material as THREE.MeshBasicMaterial
    inC.transparent = true
    inC.opacity = DIM_CONE
    inC.depthWrite = false
    this.sheInboundArrow.visible = false
    this.scene.add(this.sheInboundArrow)

    {
      const hz = ENCLOSURE_BOX_SIZE[2] / 2
      /**
       * ArrowHelper `length` is origin → cone tip. Enclosure spans z ∈ [−hz, +hz], so length = hz
       * brings each tip to that inner face.
       */
      const arrowLen = Math.max(0.1, hz)
      /** Heads scale with enclosure but stay shorter than total length */
      const headL = Math.min(Math.max(0.1, hz * 0.38), arrowLen * 0.42)
      const headW = headL * 0.62
      const center = new THREE.Vector3(0, 0, 0)
      const specs: { dir: THREE.Vector3 }[] = [
        { dir: new THREE.Vector3(0, 0, -1) },
        { dir: new THREE.Vector3(0, 0, 1) },
      ]
      for (const s of specs) {
        const ah = new THREE.ArrowHelper(s.dir, center, arrowLen, AXIS_COLORS.z, headL, headW)
        const lineM = ah.line.material as THREE.LineBasicMaterial
        lineM.transparent = true
        lineM.opacity = DIM_LINE
        lineM.depthWrite = false
        const coneM = ah.cone.material as THREE.MeshBasicMaterial
        coneM.transparent = true
        coneM.opacity = DIM_CONE
        coneM.depthWrite = false
        ah.visible = false
        ah.renderOrder = 10
        ah.line.renderOrder = 10
        ah.cone.renderOrder = 10
        this.scene.add(ah)
        this.gadaEnclosureArrows.push(ah)
      }
    }

    const planeGeom = new THREE.PlaneGeometry(0.85, 0.85)
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x5c6770,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    this.daPlane = new THREE.Mesh(planeGeom, planeMat)
    this.daPlane.rotation.x = -Math.PI / 2
    this.daPlane.position.set(0.14, -0.94, -0.4)
    this.daPlane.visible = false
    this.scene.add(this.daPlane)

    const tsaDir = new THREE.Vector3(0.9, 0.06, 0.2).normalize()
    this.tsaHintArrow = new THREE.ArrowHelper(
      tsaDir,
      this.tsaHintAnchor.clone(),
      0.42,
      AXIS_COLORS.x,
      0.11,
      0.085
    )
    const tsaL = this.tsaHintArrow.line.material as THREE.LineBasicMaterial
    tsaL.transparent = true
    tsaL.depthWrite = false
    const tsaC = this.tsaHintArrow.cone.material as THREE.MeshBasicMaterial
    tsaC.transparent = true
    tsaC.depthWrite = false
    this.tsaHintArrow.visible = false
    this.scene.add(this.tsaHintArrow)

    this.setDiagramHints(null, null)
    this.setTheme('light')

    for (const ax of CUBE_AXIS_ENDPOINTS) {
      const wrap = document.createElement('div')
      wrap.className = 'pd-axis-label'
      wrap.innerHTML = `<span class="pd-axis-label__primary">${escapeHtml(ax.primary)}</span><span class="pd-axis-label__secondary">${escapeHtml(ax.secondary)}</span>`
      const obj = new CSS2DObject(wrap)
      obj.position.set(...ax.position)
      this.scene.add(obj)
    }

    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown)
    window.addEventListener('resize', this.onResize)
    this.loop()
  }

  setPickCallback(cb: (id: string | null) => void) {
    this.onPick = cb
  }

  /**
   * Dim all axis arrows until a preverb is selected; then brighten arrows listed for that id.
   * Shows optional hints: horizontal plane for და-, extra departure arrow for წა- (tsa).
   */
  setDiagramHints(selectedPreverbId: string | null, layout: LayoutData | null) {
    const keys = axisArrowsForPreverb(selectedPreverbId, layout)
    const active = keys ? new Set(keys) : null
    /** “Into” only (no paired “out” on Z) → inbound arrow from boundary, not center→შე- */
    const useInboundShe = !!(active?.has('she') && !active?.has('ga'))

    for (const [arrowId, ah] of this.axisArrowById) {
      let on = active?.has(arrowId) ?? false
      if (arrowId === 'she' && useInboundShe) on = false
      const lineM = ah.line.material as THREE.LineBasicMaterial
      const coneM = ah.cone.material as THREE.MeshBasicMaterial
      lineM.opacity = on ? HI_LINE : DIM_LINE
      coneM.opacity = on ? HI_CONE : DIM_CONE
    }

    if (this.sheInboundArrow) {
      const showIn = useInboundShe
      this.sheInboundArrow.visible = showIn
      const lineM = this.sheInboundArrow.line.material as THREE.LineBasicMaterial
      const coneM = this.sheInboundArrow.cone.material as THREE.MeshBasicMaterial
      if (showIn) {
        lineM.opacity = HI_LINE
        coneM.opacity = HI_CONE
      } else {
        lineM.opacity = DIM_LINE
        coneM.opacity = DIM_CONE
      }
    }

    const showGadaEnclosure = selectedPreverbId === 'gada'
    for (const ah of this.gadaEnclosureArrows) {
      ah.visible = showGadaEnclosure
      const lineM = ah.line.material as THREE.LineBasicMaterial
      const coneM = ah.cone.material as THREE.MeshBasicMaterial
      if (showGadaEnclosure) {
        lineM.opacity = HI_LINE
        coneM.opacity = HI_CONE
      } else {
        lineM.opacity = DIM_LINE
        coneM.opacity = DIM_CONE
      }
    }

    if (this.daPlane) {
      const showDa = selectedPreverbId === 'da'
      this.daPlane.visible = showDa
      if (showDa) {
        this.daPlane.position.set(
          this.daPlaneAnchor.x,
          this.daPlaneAnchor.y - DA_PLANE_BELOW_LABEL,
          this.daPlaneAnchor.z
        )
      }
    }
    if (this.enclosureShell) {
      const mat = this.enclosureShell.material as THREE.MeshBasicMaterial
      const id = selectedPreverbId ?? ''
      const emphasize =
        id === 'she' ||
        id === 'ga' ||
        id === 'gada' ||
        id === 'shemo' ||
        id === 'tsamo' ||
        id === 'gamo'
      const baseOpacity = this.currentTheme === 'dark' ? 0.09 : 0.055
      const activeOpacity = this.currentTheme === 'dark' ? 0.16 : 0.12
      mat.opacity = emphasize ? activeOpacity : baseOpacity
    }

    if (this.tsaHintArrow) {
      const show = selectedPreverbId === 'tsa'
      this.tsaHintArrow.visible = show
      if (show) {
        this.tsaHintArrow.position.copy(this.tsaHintAnchor)
        const dep = new THREE.Vector3(0.88, 0.05, 0.22).normalize()
        this.tsaHintArrow.setDirection(dep)
        const lineM = this.tsaHintArrow.line.material as THREE.LineBasicMaterial
        const coneM = this.tsaHintArrow.cone.material as THREE.MeshBasicMaterial
        lineM.opacity = HI_LINE
        coneM.opacity = HI_CONE
      } else {
        const lineM = this.tsaHintArrow.line.material as THREE.LineBasicMaterial
        const coneM = this.tsaHintArrow.cone.material as THREE.MeshBasicMaterial
        lineM.opacity = DIM_LINE
        coneM.opacity = DIM_CONE
      }
    }
  }

  private onPointerDown = (e: PointerEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const meshes = [...this.pickMeshes.values()]
    const hits = this.raycaster.intersectObjects(meshes, false)
    if (hits.length && hits[0].object.userData.preverbId) {
      this.onPick?.(hits[0].object.userData.preverbId as string)
    } else {
      this.onPick?.(null)
    }
  }

  private onResize = () => {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (w === 0 || h === 0) return
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.labelRenderer.setSize(w, h)
  }

  private loop = () => {
    this.animationId = requestAnimationFrame(this.loop)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)
  }

  buildLabels(
    layout: LayoutData,
    preverbs: PreverbEntry[],
    options: {
      modernPreverbsOnly: boolean
      mode: 'overview' | 'verb'
      usedIds: Set<string> | null
      selectedId: string | null
      scenarioHighlight: Set<string> | null
      /** Emphasize one morphological tier (legend filter); null = all */
      legendTier: PreverbTier | null
    }
  ) {
    for (const m of this.pickMeshes.values()) {
      this.scene.remove(m)
    }
    this.pickMeshes.clear()
    for (const l of this.labelById.values()) {
      this.scene.remove(l)
    }
    this.labelById.clear()

    const byId = new Map(preverbs.map((p) => [p.id, p]))

    for (const e of layout.entries) {
      const p = byId.get(e.id)
      if (!p) continue

      const ox = e.labelOffset?.[0] ?? 0
      const oy = e.labelOffset?.[1] ?? 0
      const oz = e.labelOffset?.[2] ?? 0
      const pos = new THREE.Vector3(e.position[0] + ox, e.position[1] + oy, e.position[2] + oz)

      if (e.id === 'tsa') this.tsaHintAnchor.copy(pos)
      if (e.id === 'da') this.daPlaneAnchor.copy(pos)

      if (options.modernPreverbsOnly && !p.modernPreverb) continue
      if (options.mode === 'verb' && options.usedIds && !options.usedIds.has(p.id)) continue

      const div = document.createElement('div')
      div.className = `pd-label ${TIER_CLASS[p.tier] ?? ''}`
      div.textContent = p.display
      const tierDim = options.legendTier != null && p.tier !== options.legendTier
      if (tierDim) div.classList.add('pd-label--dim')
      if (options.selectedId === p.id) div.classList.add('pd-label--selected')
      if (options.scenarioHighlight?.has(p.id)) div.classList.add('pd-label--scenario')

      const label = new CSS2DObject(div)
      label.position.copy(pos)
      this.scene.add(label)
      this.labelById.set(p.id, label)

      const geom = new THREE.SphereGeometry(0.18, 12, 12)
      const mat = new THREE.MeshBasicMaterial({
        visible: false,
        transparent: true,
        opacity: 0,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.copy(pos)
      mesh.userData.preverbId = p.id
      this.scene.add(mesh)
      this.pickMeshes.set(p.id, mesh)
    }
  }

  updateLabelStyles(
    options: {
      modernPreverbsOnly: boolean
      mode: 'overview' | 'verb'
      usedIds: Set<string> | null
      selectedId: string | null
      scenarioHighlight: Set<string> | null
      legendTier: PreverbTier | null
    },
    preverbs: PreverbEntry[]
  ) {
    const byId = new Map(preverbs.map((p) => [p.id, p]))
    for (const [id, label] of this.labelById) {
      const p = byId.get(id)
      if (!p) continue
      const el = label.element as HTMLDivElement
      el.className = `pd-label ${TIER_CLASS[p.tier] ?? ''}`
      if (options.modernPreverbsOnly && !p.modernPreverb) {
        el.style.display = 'none'
        continue
      }
      el.style.display = ''
      const tierDim = options.legendTier != null && p.tier !== options.legendTier
      if (tierDim) el.classList.add('pd-label--dim')
      if (options.selectedId === id) el.classList.add('pd-label--selected')
      if (options.scenarioHighlight?.has(id)) el.classList.add('pd-label--scenario')
    }
    for (const [id, mesh] of this.pickMeshes) {
      const p = byId.get(id)
      mesh.visible = !!(p && (!options.modernPreverbsOnly || p.modernPreverb))
    }
  }

  resize() {
    this.onResize()
  }

  /**
   * Draw one frame (after orbit changes) so `canvas.toDataURL` / drawImage see the current view.
   * The render loop also runs continuously; this is for snapshots right before capture.
   */
  renderOnce() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)
  }

  resetView() {
    this.camera.position.copy(this.defaultCameraPosition)
    this.controls.target.copy(this.defaultTarget)
    this.camera.up.set(0, 1, 0)
    this.controls.update()
  }

  setTheme(theme: SceneTheme) {
    this.currentTheme = theme
    const isDark = theme === 'dark'
    this.scene.background = new THREE.Color(isDark ? 0x0b1220 : 0xf8f9fa)

    if (this.cubeEdges) {
      const edgeMat = this.cubeEdges.material as THREE.LineBasicMaterial
      edgeMat.color.setHex(isDark ? 0x94a3b8 : 0x495057)
    }

    for (const axisLine of this.axisLines) {
      const axisMat = axisLine.material as THREE.LineBasicMaterial
      axisMat.opacity = isDark ? 0.66 : 0.5
    }

    if (this.enclosureShell) {
      const shellMat = this.enclosureShell.material as THREE.MeshBasicMaterial
      shellMat.opacity = isDark ? 0.09 : 0.055
    }

    if (this.daPlane) {
      const planeMat = this.daPlane.material as THREE.MeshBasicMaterial
      planeMat.color.setHex(isDark ? 0x94a3b8 : 0x5c6770)
      planeMat.opacity = isDark ? 0.24 : 0.18
    }
  }

  destroy() {
    cancelAnimationFrame(this.animationId)
    window.removeEventListener('resize', this.onResize)
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown)
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
    this.labelRenderer.domElement.remove()
    if (this.daPlane) {
      this.daPlane.geometry.dispose()
      ;(this.daPlane.material as THREE.Material).dispose()
    }
    if (this.enclosureShell) {
      this.enclosureShell.geometry.dispose()
      ;(this.enclosureShell.material as THREE.Material).dispose()
    }
    if (this.tsaHintArrow) {
      this.tsaHintArrow.dispose()
    }
    if (this.sheInboundArrow) {
      this.sheInboundArrow.dispose()
    }
    for (const ah of this.gadaEnclosureArrows) {
      ah.dispose()
    }
    for (const ah of this.axisArrowById.values()) {
      ah.dispose()
    }
  }
}
