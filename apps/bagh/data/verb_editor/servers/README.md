# Verb Editor Servers

This directory contains all the server components needed for the verb editor frontend.

## 🏗️ Server Architecture

The verb editor uses multiple specialized servers to provide different functionalities:

### 📡 Available Servers

1. **GNC Proxy Server** (Port 5001)
   - **Purpose**: Handles GNC API calls to avoid CORS issues
   - **Features**: Raw gloss generation, argument pattern detection
   - **File**: `gnc_proxy_server.py`
   - **Startup**: `start_gnc_server.py`

2. **Example Generator Server** (Port 5000)
   - **Purpose**: Generates examples for verbs
   - **Features**: Multi-preverb support, case marking
   - **File**: `example_generator_server.py`
   - **Startup**: `start_example_server.py`

3. **Scraper Server** (Port 8000)
   - **Purpose**: Scrapes verb data from external sources
   - **Features**: Lingua.ge integration, data transformation
   - **File**: `start_scraper_server.py`
   - **Startup**: `start_scraper_server.py`

## 🚀 Server Management

### Unified Startup

Use the combined server manager to start any combination of servers:

```bash
# Start all servers
python start_all_servers.py

# Start specific servers
python start_all_servers.py --gnc
python start_all_servers.py --example
python start_all_servers.py --scraper

# Start combinations
python start_all_servers.py --gnc --example
python start_all_servers.py --scraper --gnc
```

### Individual Startup

Start servers individually if needed:

```bash
# GNC Proxy Server
python start_gnc_server.py

# Example Generator Server
python start_example_server.py

# Scraper Server
python start_scraper_server.py
```

## 🔧 Development

### Adding New Servers

To add a new server:

1. Create the server implementation file (e.g., `new_server.py`)
2. Create a startup script (e.g., `start_new_server.py`)
3. Add the server to `start_all_servers.py`:
   - Add startup function
   - Add command line argument
   - Update server selection logic
   - Update endpoint display

### Server Requirements

All servers should:
- ✅ Use consistent port management
- ✅ Include health check endpoints
- ✅ Handle CORS properly
- ✅ Provide clear error messages
- ✅ Include proper logging

## 📋 API Endpoints

### GNC Proxy Server (Port 5001)
- `POST /api/gnc/analyze` - Analyze verb form
- `GET /api/gnc/health` - Health check
- `GET /api/gnc/cache/stats` - Cache statistics
- `POST /api/gnc/cache/clear` - Clear cache

### Example Generator Server (Port 5000)
- `POST /generate_examples` - Generate examples
- `GET /health` - Health check
- `GET /test` - Test endpoint

### Scraper Server (Port 8000)
- `POST /scrape` - Scrape verb data
- `GET /health` - Health check
- `GET /status` - Server status

## 🛠️ Troubleshooting

### Port Conflicts
If a port is already in use:
```bash
# Check what's using the port
netstat -ano | findstr :5001  # Windows
lsof -i :5001                 # macOS/Linux

# Kill the process
taskkill /PID <process_id>    # Windows
kill <process_id>             # macOS/Linux
```

### Server Not Starting
1. Check dependencies: `pip install flask flask-cors requests`
2. Check Python version: `python --version`
3. Check file permissions
4. Review error messages in terminal

### CORS Issues
All servers include CORS headers, but if issues persist:
1. Check browser console for errors
2. Verify server is running on correct port
3. Check firewall settings
