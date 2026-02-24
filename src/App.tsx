import { useEffect, useRef } from "react";
import { Crisp } from "crisp-sdk-web";
import { Navigate, Route, Routes } from "react-router";

import Footer from "./components/Footer.tsx";
import NavBar from "./components/NavBar.tsx";
import { useThemeMode } from "./hooks/useThemeMode";
import About from "./pages/About";
import Home from "./pages/Home";
import Policy from "./pages/Policy.tsx";

const CRISP_WEBSITE_ID = "11d81aa1-c3e9-4295-a6ca-b207d63f37de";

function App() {
  const { mode, setMode } = useThemeMode();
  const crispReadyRef = useRef(false);

  useEffect(() => {
    if (crispReadyRef.current) {
      return;
    }

    Crisp.configure(CRISP_WEBSITE_ID);
    crispReadyRef.current = true;
  }, []);

  return (
    <div className="appShell">
      <NavBar themeMode={mode} onThemeChange={setMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Policy policyType="Privacy" />} />
        <Route path="/rental-agreement" element={<Policy policyType="Rental" />} />
        <Route path="/membership" element={<Policy policyType="Membership" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
