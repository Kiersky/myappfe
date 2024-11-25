import { useState } from 'react'
import './App.css'

function App() {
    const [url, setUrl] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/shorten?url=${encodeURIComponent(url)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            setShortenedUrl(data.shortenedUrl)
        } catch (error) {
            console.error('Error:', error)
        }
    }
   /* const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            })
            const data = await response.json()
            setShortenedUrl(data.shortenedUrl)
        } catch (error) {
            console.error('Error:', error)
        }
    }*/

    return (
        <div className="card">
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={handleSubmit}>Submit</button>
            {shortenedUrl && <p>Shortened URL: {shortenedUrl}</p>}
        </div>
    )
}

export default App