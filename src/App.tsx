import { Crisp } from "crisp-sdk-web";

import { Routes, Route } from 'react-router';

import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";

import Home from './pages/Home';
import About from './pages/About';
import Policy from "./pages/Policy.tsx";

function App() {

    Crisp.configure("11d81aa1-c3e9-4295-a6ca-b207d63f37de");

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/about" element={ <About /> } />
                <Route path='/privacy' element={<Policy policyType="Privacy" />} />
                <Route path='/rental-agreement' element={<Policy policyType="Rental" />} />
                <Route path='/membership' element={<Policy policyType="Membership" />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
