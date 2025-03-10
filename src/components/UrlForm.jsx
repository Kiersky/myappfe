import { useState } from 'react';

const UrlForm = ({ onSubmit, loading }) => {
    const [url, setUrl] = useState('');
    const [suffix, setSuffix] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ url, suffix });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'url' && value === '') {
            setUrl('');
            setSuffix('');
        } else if (name === 'url') {
            setUrl(value);
        } else if (name === 'suffix') {
            setSuffix(value);
        }
    };

    return (
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
    );
};

export default UrlForm;