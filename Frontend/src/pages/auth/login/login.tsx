import { Button } from "../../../components/ui/button";
import "./login.scss";
import { IoLogInSharp } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import "./login.scss";
import { IoMdCalendar } from "react-icons/io";

const Login = () => {
  return (
    <>
      <section className="section-login">
        <div className="container-login">
          <header>
            <div className="logo"></div>
          </header>
          <div className="signup-form text-white">
            <form autoComplete="off" autoCapitalize="off">
              <h2 className="text-center font-bold text-2xl flex items-center justify-center"><span className="mr-2 text-red-950"><RiLoginCircleFill /></span>Iniciar Sesion</h2>
              <label htmlFor="email" className="text-center font-bold">Email:</label>
              <Input type="email" id="email" placeholder="Ingrese su email" required />
              <label htmlFor="password" className="text-center font-bold">Contraseña:</label>
              <Input type="password" id="password" placeholder="Ingrese la contraseña" required />
              <Button type="submit" style={{ height: "42px" }} className="hover:bg-purple-800"><span className="text-3xl mr-2"><IoLogInSharp /></span>Iniciar Sesión</Button>
              <hr className="text-white" />
              <Button variant={"outline"} style={{ height: '42px' }} className="social-btn google-btn flex items-center justify-center"><span className="text-5x1 mr-2"><FaGoogle /></span>Continuar con Google</Button>
              <p>No tiene cuenta? <a href="/auth/register">Crear una cuenta</a></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;