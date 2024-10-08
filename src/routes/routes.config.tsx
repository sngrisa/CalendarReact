import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import { lazy, Suspense } from "react";

// Lazy load the AuthRouter
const AuthRouter = lazy(() => import('./../pages/auth/router/authRouter'));

const RoutesConfig = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
        </Suspense>
    );
}

export default RoutesConfig;