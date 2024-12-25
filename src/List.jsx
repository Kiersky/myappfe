import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    const [urlData, setUrlData] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [answer, setAnswer] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/urls');
                const data = await response.json();
                setUrlData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnswer('Generated short URL: short.ly/abc123');
    };

    const handleConfirm = () => {
        setConfirmed(true);
    };

    const isDateExpired = (date) => {
        return new Date(date) < new Date();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="url-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Enter your URL"
                        className="url-input"
                    />
                    <button type="submit" className="shorten-button">
                        Shorten URL
                    </button>
                </div>
            </form>

            {answer && (
                <div className="answer-section">
                    <div className="answer-content">
                        <p className="answer-text">{answer}</p>
                        <button
                            onClick={handleConfirm}
                            disabled={confirmed}
                            className={`confirm-button ${confirmed ? 'disabled' : ''}`}
                        >
                            {confirmed ? 'Confirmed' : 'Confirm'}
                        </button>
                    </div>
                </div>
            )}

            <div className="table-container">
                <table className="url-table">
                    <thead>
                    <tr className="table-header">
                        <th>ID</th>
                        <th>Long URL</th>
                        <th>Short URL</th>
                        <th>Category</th>
                        <th>Expiration Date</th>
                        <th>Open Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {urlData.map((row) => (
                        <tr key={row.id}>
                            <td className="table-cell id">{row.id}</td>
                            <td className="table-cell truncate">{row.longUrl}</td>
                            <td className="table-cell short-url">{row.shortUrl}</td>
                            <td className="table-cell">{row.category}</td>
                            <td className={`table-cell ${isDateExpired(row.expirationDate) ? 'expired' : 'active'}`}>
                                {row.expirationDate}
                            </td>
                            <td className="table-cell right">{row.urlOpenCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <Link to="/app">Go to App</Link>
            </nav>
        </div>
    );
};

export default List;