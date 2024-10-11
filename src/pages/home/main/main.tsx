import { IoCalendarNumber } from "react-icons/io5";
import "./main.scss";

const Main = () => {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black">¡Bienvenido a Calendar App!</h1>
                        <p className="max-w-2xl mb-6 font-light text-purple-950 lg:mb-8 md:text-lg lg:text-xl ">Aquí encontrarás todo lo que necesitas para organizar tu tiempo. Explora nuestras opciones y empieza a planificar tus días de manera sencilla.</p>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <span className="imageMain"><IoCalendarNumber /></span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main;