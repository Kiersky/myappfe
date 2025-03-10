import {useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import ShortenedUrlDisplay from './components/ShortenedUrlDisplay';

function App() {
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async ({ url, suffix }) => {
        if (!isValidUrl(url)) {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, suffix }),
            });
            const data = await response.json();
            setShortenedUrl(data.shortUrl);
        } catch (error) {
            setError('Failed to shorten the URL');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
    };

    return (
        <div className="card">
            <UrlForm onSubmit={handleSubmit} loading={loading} />
            {error && <p className="error">{error}</p>}
            {shortenedUrl && (
                <ShortenedUrlDisplay
                    shortenedUrl={shortenedUrl}
                    onCopy={copyToClipboard}
                />
            )}
            <nav>
                <Link to="/">Go to List</Link>
            </nav>
        </div>
    );
}

export default App;