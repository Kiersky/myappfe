const ShortenedUrlDisplay = ({ shortenedUrl, onCopy }) => {
    return (
        <div className="shortened-url">
            <p>Shortened URL: {shortenedUrl}</p>
            <button onClick={onCopy}>Copy to Clipboard</button>
        </div>
    );
};

export default ShortenedUrlDisplay;