import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import { landmarks } from '../../data/landmarks'

function LandmarkLayer({ map, onMarkerClick }) {
  useEffect(() => {
    if (!map) return

    const markers = []

    landmarks.forEach((landmark) => {
      const el = document.createElement('div')
      el.className = 'landmark-marker'
      el.innerHTML = '✦'
      el.style.cssText = `
        width: 32px;
        height: 32px;
        background-color: #6B2D0E;
        border: 2px solid #3B2A1A;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #F4E8C1;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      `

      el.addEventListener('click', () => {
        onMarkerClick(landmark)
      })

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(landmark.coordinates)
        .addTo(map)

      markers.push(marker)
    })

    return () => {
      markers.forEach((marker) => marker.remove())
    }
  }, [map, onMarkerClick])

  return null
}

export default LandmarkLayer