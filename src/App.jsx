import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function App() {
    const [url, setUrl] = useState('')
    const [suffix, setSuffix] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!isValidUrl(url)) {
            setError('Please enter a valid URL')
            return
        }

        setLoading(true)
        setError('')
        try {
            const response = await fetch('http://localhost:8080/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, suffix }),
            })
            const data = await response.json()
            setShortenedUrl(data.shortUrl)
        } catch (error) {
            setError('Failed to shorten the URL')
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        if(name==='url'&&value===''){
            setUrl(value)
            setShortenedUrl('')
            setSuffix('')
        } else if (name==='url') {
            setUrl(value)
            setShortenedUrl('')
        }
        else if (name==='suffix'){
            setSuffix(value)
        }
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl)
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    name="url"
                    value={url}
                    onChange={handleInputChange}
                    placeholder="Enter URL"
                />
                <input
                    type="text"
                    name="suffix"
                    value={suffix}
                    onChange={handleInputChange}
                    placeholder="Enter suffix"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {shortenedUrl && (
                <div className="shortened-url">
                    <p>Shortened URL: {shortenedUrl}</p>
                    <button onClick={copyToClipboard}>Copy to Clipboard</button>
                </div>
            )}
            <nav>
                <Link to="/">Go to List</Link>
            </nav>
        </div>
    )
}

export default App