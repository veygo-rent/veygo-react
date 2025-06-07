import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home!</Link> | <Link to="/about">About!</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
