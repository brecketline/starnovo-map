import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import LandmarkLayer from './LandmarkLayer'
import LandmarkCard from '../Cards/LandmarkCard'

const medievalStyle = {
  version: 8,
  name: 'Starnovo Medieval',
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    openmaptiles: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet'
    },
    terrain: {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      tileSize: 256,
      encoding: 'terrarium'
    }
  },
  terrain: {
    source: 'terrain',
    exaggeration: 1.8
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#F4E8C1'
      }
    },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      paint: {
        'fill-color': '#7BA7BC',
        'fill-outline-color': '#5A8A9E'
      }
    },
    {
      id: 'landuse-green',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: ['in', 'class', 'grass', 'park', 'forest', 'meadow'],
      paint: {
        'fill-color': '#C8D4A8',
        'fill-opacity': 0.6
      }
    },
    {
      id: 'hillshade',
      type: 'hillshade',
      source: 'terrain',
      paint: {
        'hillshade-exaggeration': 0.5,
        'hillshade-shadow-color': '#8B7355',
        'hillshade-highlight-color': '#F4E8C1',
        'hillshade-illumination-direction': 270,
        'hillshade-illumination-anchor': 'map'
      }
    },
    {
      id: 'building',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'building',
      paint: {
        'fill-color': '#DDD0A8',
        'fill-outline-color': '#B8A882',
        'fill-opacity': 0.8
      }
    },
    {
      id: 'roads-minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['in', 'class', 'minor', 'service', 'track', 'path'],
      paint: {
        'line-color': '#C9B07A',
        'line-width': 1.2
      }
    },
    {
      id: 'roads-major',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
      paint: {
        'line-color': '#B8943A',
        'line-width': 2.5
      }
    },
    {
      id: 'place-labels',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['in', 'class', 'suburb', 'neighbourhood', 'quarter'],
      layout: {
        'text-field': ['get', 'name:en'],
        'text-font': ['Open Sans Regular'],
        'text-size': 11,
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.1
      },
      paint: {
        'text-color': '#3B2A1A',
        'text-halo-color': '#F4E8C1',
        'text-halo-width': 1.5,
        'text-opacity': 0.8
      }
    }
  ]
}

function MapView() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [selectedLandmark, setSelectedLandmark] = useState(null)

  useEffect(() => {
    if (map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: medievalStyle,
      center: [25.6525, 43.0818],
      zoom: 15,
      pitch: 55,
      maxPitch: 70,
      bearing: -17
    })

    map.current.on('load', () => {
      setMapReady(true)
    })
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {mapReady && (
        <LandmarkLayer
          map={map.current}
          onMarkerClick={(landmark) => setSelectedLandmark(landmark)}
        />
      )}
      <LandmarkCard
        landmark={selectedLandmark}
        onClose={() => setSelectedLandmark(null)}
      />
    </div>
  )
}

export default MapView