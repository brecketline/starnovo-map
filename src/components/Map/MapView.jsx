import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import LandmarkLayer from './LandmarkLayer'

const medievalStyle = {
  version: 8,
  name: 'Starnovo Medieval',
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors'
    }
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
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm',
      paint: {
        'raster-opacity': 0.55,
        'raster-saturation': -1,
        'raster-contrast': 0.3,
        'raster-brightness-min': 0.6
      }
    }
  ]
}

function MapView() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: medievalStyle,
      center: [25.6525, 43.0818],
      zoom: 15
    })

    map.current.on('load', () => {
      setMapReady(true)
    })
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {mapReady && <LandmarkLayer map={map.current} />}
    </div>
  )
}

export default MapView