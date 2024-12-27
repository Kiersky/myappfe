import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    const [urlData, setUrlData] = useState([]);
    const [prompt, setPrompt] = useState('');
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
        const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setAnswer('Generated short URL: short.ly/abc123');
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/generate_query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text_input: prompt }),
            });
            const data = await response.json();
            setAnswer(` ${data.query}`);
            setConfirmed(false);
        } catch (error) {
            console.error('Error generating query:', error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch('http://localhost:5001/confirm_query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: answer }),
            });
            if (response.ok) {
                setConfirmed(true);
            } else {
                console.error('Error confirming query:', response.statusText);
            }
        } catch (error) {
            console.error('Error confirming query:', error);
        }
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
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt"
                        className="url-input"
                    />
                    <button type="submit" className="shorten-button">
                        Enter
                    </button>
                </div>
            </form>

            {answer && (
                <div className="answer-section">
                    <div className="answer-content">
                        <p className="answer-text">Generated query:{answer}</p>
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