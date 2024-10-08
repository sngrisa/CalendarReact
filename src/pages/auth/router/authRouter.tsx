import { lazy } from 'react';
import { Routes, Route  } from 'react-router-dom';

// Lazy load the Login and Register components
const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}

export default AuthRouter;