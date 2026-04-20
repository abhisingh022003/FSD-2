import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/health`
      )
      setMessage(response.data.message)
      setError(null)
    } catch (err) {
      setError('Failed to connect to backend')
      setMessage('Error')
    }
  }

  return (
    <div className="container">
      <h1>CI/CD Pipeline Demo</h1>
      <p className="status">{message}</p>
      {error && <p className="error">{error}</p>}
      <button onClick={fetchData}>Refresh</button>
    </div>
  )
}

export default App
