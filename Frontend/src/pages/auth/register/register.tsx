
import { GiArchiveRegister } from "react-icons/gi";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import "./register.scss";
import { FaUserPlus } from "react-icons/fa";
import { IoChevronBackCircle } from "react-icons/io5";


const Register = () => {
    return (
        <>
            <section id="register-section">
                <div className="container-register">
                    <header>
                    </header>
                    <div className="register-form">
                        <form autoCapitalize="off" autoComplete="off">
                            <h2 className="text-center font-bold text-2xl flex items-center justify-center"><span className="mr-2 text-red-950"><GiArchiveRegister /></span>Registrarse</h2>
                            <label>Username:</label>
                            <Input required type="text" name="username" id="username" placeholder="Ingrese un username" />
                            <label>Email:</label>
                            <Input required type="email" name="email" id="email" placeholder="Ingrese su email" />
                            <label>Password:</label>
                            <Input type="password" required name="password" id="password" placeholder="Ingrese la contraseña" />
                            <hr className="text-white"/>
                            <p className="text-sm mb-6 mt-4 text-2x1">Usted al registrarse acepta nuestros <a href="/termsanduse" className="text-purple-800 hover:text-purple-950">Términos de uso</a> y <a className="text-purple-800 hover:text-purple-950" href="/privacypolities">Nuestras politicas de privacidad</a></p>
                            <Button type="submit" className="flex items-center btn-register" style={{ height: "42px" }}><span className="mr-1 text-2xl"><FaUserPlus /></span>Registrarse</Button>
                            <hr className="text-black mt-4"/>
                            <a href="/auth/login"><Button type="button" className="flex items-center backbtn" style={{ height: "42px" }} variant={"destructive"}><span className="mr-1 text-2xl"><IoChevronBackCircle /></span>Ya tengo cuenta</Button></a>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;