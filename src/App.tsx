import { Routes, Route } from 'react-router';

import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";

import Home from './pages/Home';
import About from './pages/About';
import Privacy from "./pages/Privacy.tsx";
import Rental from "./pages/Rental.tsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/privacy" element={<Privacy />} />
                <Route path='rental-agreement' element={<Rental />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
