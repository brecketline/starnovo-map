function LandmarkCard({ landmark, onClose }) {
  if (!landmark) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#F4E8C1',
      borderTop: '3px solid #3B2A1A',
      borderRadius: '16px 16px 0 0',
      padding: '24px',
      maxHeight: '60vh',
      overflowY: 'auto',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
      fontFamily: '"EB Garamond", Georgia, serif',
      zIndex: 1000
    }}>

      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#3B2A1A',
          fontFamily: '"EB Garamond", Georgia, serif'
        }}
      >
        ✕
      </button>

      <h2 style={{
        fontFamily: '"Cinzel", Georgia, serif',
        fontSize: '20px',
        color: '#3B2A1A',
        marginBottom: '8px',
        paddingRight: '32px'
      }}>
        {landmark.name}
      </h2>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#6B4C2A'
      }}>
        {landmark.hours && <span> Hours: {landmark.hours}</span>}
        {landmark.duration && <span>Visit: {landmark.duration}</span>}
      </div>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.7',
        color: '#3B2A1A',
        marginBottom: '16px'
      }}>
        {landmark.description}
      </p>

      {landmark.fact && (
        <div style={{
          background: '#E8D5A3',
          borderLeft: '3px solid #6B2D0E',
          padding: '12px 16px',
          borderRadius: '0 8px 8px 0',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#3B2A1A'
        }}>
          <strong style={{ fontFamily: '"Cinzel", Georgia, serif', fontSize: '12px' }}>
            ✦ DID YOU KNOW
          </strong>
          <p style={{ margin: '6px 0 0 0' }}>{landmark.fact}</p>
        </div>
      )}

    </div>
  )
}

export default LandmarkCard