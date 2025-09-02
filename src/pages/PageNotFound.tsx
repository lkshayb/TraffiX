import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate = useNavigate()
    return (
      <div style={{ padding: '12px' }}>
        <h1>Page Not Found</h1>
        <p>Page Not Found</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    )
  }
  
  
  