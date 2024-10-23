import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import { lazy, Suspense } from "react";
import CalendarComponent from "../pages/calendar/calendar";
import Termsanduse from "../pages/termsanduse/termsanduse";
import Privacypolities from "../pages/privacypolities/privacypolities";

// Lazy load the AuthRouter
const AuthRouter = lazy(() => import('./../pages/auth/router/authRouter'));

const RoutesConfig = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/calendar" element={<CalendarComponent />} />
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/privacypolities" element={<Privacypolities />}/>
                <Route path="/termsanduse" element={<Termsanduse />}/>
            </Routes>
            
        </Suspense>
    );
}

export default RoutesConfig;