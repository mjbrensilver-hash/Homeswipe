<<<<<<< HEAD
## OSRM (California) Setup

This project can integrate with a local OSRM routing backend to compute precise driving-route distances for California (NorCal & SoCal). A helper script is provided at `bin/setup_osrm_california.sh` that downloads the Geofabrik PBFs and starts OSRM containers (requires Docker).

Usage:

1. Make the script executable and run it (this will download many MB/GB of data):

```bash
chmod +x bin/setup_osrm_california.sh
./bin/setup_osrm_california.sh
```

2. The script starts two containers:
- NorCal OSRM: http://localhost:5000
- SoCal OSRM: http://localhost:5001

3. The app (`script.js`) will attempt to use these endpoints for routed distances when available. If OSRM is not running, the app falls back to geocoded centroid distances (haversine).

Notes:
- Docker and ~20+ GB disk may be required depending on extracts.
- For a single California dataset, download `california-latest.osm.pbf` and adjust the script.

For a single California dataset, download `california-latest.osm.pbf` and adjust the script.

### Full USA OSRM

If you have sufficient disk and CPU you can build a full-USA OSRM dataset. A helper script is provided at `bin/setup_osrm_usa.sh`.

Usage (warning: very large download and heavy preprocessing):

```bash
chmod +x bin/setup_osrm_usa.sh
./bin/setup_osrm_usa.sh
```

This will start an OSRM routed container on `http://localhost:5000` that the app will use for precise driving distances.
If you don't have the resources, prefer regional extracts (per-state or NorCal/SoCal) instead.
=======
d
=

>>>>>>> d657564dde181c648960b96b09d8298b21c544e1
[Read the docs](https://docs.stevelosh.com/d/).
