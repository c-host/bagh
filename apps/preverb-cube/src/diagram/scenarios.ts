/** Short teaching scenarios: point of view vs vertical wording (Geographic Space). */

export interface Scenario {
  id: string
  title: string
  /** Plain text; newline characters render as line breaks in the details panel. */
  body: string
  /** Preverb ids to emphasize on the diagram */
  highlightIds: string[]
}

export const PV_SCENARIOS: Scenario[] = [
  {
    id: 'point_of_view',
    title: 'Point of view (PV)',
    body: `1. Topic

This scenario is only about the vertical axis of Geographic Space (GS): how an utterance classifies motion as “up” or “down.” In Georgian that choice shows up as vertical preverbs (ა- vs ჩა-) on the diagram’s green axis. The same real-world motion can still be worded with “up” in one sentence and “down” in another.

2. Concrete picture

The examples use a building with numbered floors so that height in GS is visible: a higher floor is higher on the vertical axis than a lower floor. 

3. Terms (all in GS, vertical)

SP (speaker position) — where the speaker is located along that vertical scale in the scene being described (here: which floor “I” am on).

TS (teller position) — the viewpoint that the GS in the clause is built from; spatial relations get a concrete reading relative to TS. In simple face-to-face description, TS is the same place as SP. They can split though: in "Nino says that she is going up", vertical “up” in the clause is anchored to Nino, the teller (TS), who is not the person uttering the whole sentence, the speaker (SP).

PV (point of view) — the vantage (here height) the utterance uses to label the path as upward or downward. PV can sit at the same height as SP/TS, above them, or below them.

4. Three PV placements relative to SP/TS

(1) PV at the same height as SP/TS.
(2) PV higher than SP/TS.
(3) PV lower than SP/TS.

5. Examples 
Throughout this section, SP and TS coincide: both are on the fourth floor. The only thing that changes is the friend’s destination floor and the vertical wording.

First situation — friend’s path ends on the third floor, one vertical step below the speaker/teller (fourth floor).

I am on the fourth floor. My friend is going to the third floor.

I can say: My friend is going up to the third floor.
Roles: the destination is below the speaker’s level in GS, but the phrase uses “up” → PV is lower than SP/TS → (3). That upward wording matches the up pole (ა-) in the model, not “moving to a higher floor than the speaker.”

I can say: My friend is going down to the third floor.
Roles: “down” fits a vantage at or above SP/TS → (2) or (1). That wording matches the down pole (ჩა-).

Second situation — friend’s path ends on the sixth floor, above the speaker/teller (fourth floor).

I am on the fourth floor. My friend is going to the sixth floor. 

I can say: My friend is going up to the sixth floor.
Roles: PV lower than SP/TS, or PV aligned with SP/TS → (3) or (1); upward wording, up pole (ა-).

I can say: My friend is going down to the sixth floor.
Roles: PV higher than SP/TS → (2); downward wording, down pole (ჩა-), even though the sixth floor is above the speaker in GS.

6. Diagram

Green axis: ა- toward the up pole, ჩა- toward the down pole. Vertical preverb choice (or English “up”/“down”) follows the PV pattern, not the speaker’s floor height by itself.`,
    highlightIds: ['a', 'cha'],
  },
  {
    id: 'ego_inclusion',
    title: 'Ego Space (ES) folds into Alter Space (AS)',
    body: `1. Topic

This scenario is about Communicational Space (CS): how Georgian marks whether motion or orientation is toward the speech participants (I/II) or toward a third party non-participant (III).

2. ES vs AS

CS divides Ego Space (ES: speaker and addressee, I–II) from Alter Space (AS: third persons).

3. ES is not “physical distance”

Do not read ES as “physically close” in Geographic Space. Near and far in GS use distance, but how they apply is flexible; ES is flexible too. Both depend on speaker or teller attitude.

4. Inclusion → complex preverbs with მო-

When ES widens, narrows, or treats AS as inside the participant sphere, Georgian uses complex preverbs: a simple direction (შე-, ჩა-, გა-, etc.) plus მო- (“hither,” toward I/II). 

If another person’s space is structured as part of the participant sphere, the simple + მო- complex is the usual form.`,
    highlightIds: ['shemo', 'chamo', 'gamo', 'amo', 'tsamo', 'gadmo', 'mimo'],
  },
]
