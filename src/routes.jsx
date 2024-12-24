import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './List';
import App from './App';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;