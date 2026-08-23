// Notes
import Dashboard from "./components/Notes/Dashborad";
import { ToastContainer } from 'react-toastify';
import BasicExample from "./components/Notes/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <BasicExample />
            <main>

                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard />
                        }
                    />
                </Routes>
            </main>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;