#!/usr/bin/env python3
"""
Convert a GeoJSON (features) of places into a simplified JSON array:
[{"name":"City","state":"CA","lat":..,"lon":..,"population":..}, ...]

This script attempts to infer US state from common properties (`addr:state`,
`is_in`, `is_in:state`, `state`) using a name->postal mapping. It's best-effort.
"""
import sys, json

STATES = {
    'alabama':'AL','alaska':'AK','arizona':'AZ','arkansas':'AR','california':'CA','colorado':'CO','connecticut':'CT','delaware':'DE','florida':'FL','georgia':'GA','hawaii':'HI','idaho':'ID','illinois':'IL','indiana':'IN','iowa':'IA','kansas':'KS','kentucky':'KY','louisiana':'LA','maine':'ME','maryland':'MD','massachusetts':'MA','michigan':'MI','minnesota':'MN','mississippi':'MS','missouri':'MO','montana':'MT','nebraska':'NE','nevada':'NV','new hampshire':'NH','new jersey':'NJ','new mexico':'NM','new york':'NY','north carolina':'NC','north dakota':'ND','ohio':'OH','oklahoma':'OK','oregon':'OR','pennsylvania':'PA','rhode island':'RI','south carolina':'SC','south dakota':'SD','tennessee':'TN','texas':'TX','utah':'UT','vermont':'VT','virginia':'VA','washington':'WA','west virginia':'WV','wisconsin':'WI','wyoming':'WY','district of columbia':'DC','wash.':'WA'
}

def infer_state(props):
    keys = ['addr:state','is_in:state','state','is_in']
    for k in keys:
        v = props.get(k)
        if not v: continue
        s = v.strip().lower()
        # If already two-letter code
        if len(s) == 2 and s.isalpha():
            return s.upper()
        # try direct mapping
        if s in STATES:
            return STATES[s]
        # sometimes 'is_in' contains comma-separated parts like 'Springfield, Illinois'
        parts = [p.strip().lower() for p in s.replace(';',',').split(',') if p.strip()]
        for p in parts:
            if p in STATES:
                return STATES[p]
            # allow matching 'illinois' -> IL
            if p.endswith(' state'):
                p2 = p.replace(' state','')
                if p2 in STATES: return STATES[p2]
    return ''

def main():
    if len(sys.argv) < 3:
        print('Usage: geojson_to_locations.py in.geojson out.json', file=sys.stderr)
        sys.exit(1)
    infile, outfile = sys.argv[1], sys.argv[2]
    data = json.load(open(infile))
    out = []
    for f in data.get('features', []):
        props = f.get('properties', {})
        geom = f.get('geometry')
        if not geom: continue
        coords = geom.get('coordinates')
        if not coords: continue
        lon, lat = coords[0], coords[1]
        name = props.get('name') or props.get('ref') or ''
        if not name: continue
        state = infer_state(props)
        pop = props.get('population') or props.get('pop') or None
        try:
            pop = int(pop) if pop is not None and str(pop).isdigit() else None
        except Exception:
            pop = None
        out.append({'name': name, 'state': state, 'lat': lat, 'lon': lon, 'population': pop})
    with open(outfile, 'w') as f:
        json.dump(out, f, indent=2)

if __name__ == '__main__':
    main()
