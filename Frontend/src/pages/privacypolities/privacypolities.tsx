import { FaDatabase, FaLock, FaMouse, FaNewspaper, FaRegNewspaper, FaShieldAlt, FaUsers } from "react-icons/fa";
import ItemPrivacyPolity from "./itemPrivacyPolity/itemPrivacyPolity";
import { RiUserSharedFill } from "react-icons/ri";
import { FaBugSlash } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { ITermsAndUse } from "../termsanduse/termsanduse";


export interface ITermsPrivacyPolities {
    id: string | number;
    title: string;
    desc: string;
    icon: any;
}

const Privacypolities = () => {


    let privacyPolicy: IPrivacyPolicy[] = [
        {
            id: 1,
            title: "Información Recopilada",
            desc: "Recopilamos información personal cuando te registras en nuestra aplicación. Esta información puede incluir: \n\n - **Nombre completo**: para personalizar tu experiencia y comunicación. \n - **Dirección de correo electrónico**: para la verificación de la cuenta y comunicaciones relacionadas. \n - **Número de teléfono**: para la autenticación y soporte. \n - **Fecha de nacimiento**: para cumplir con requisitos legales y verificar la edad. \n - **Datos de uso**: como la duración de las sesiones, interacciones con la aplicación y preferencias de usuario, que nos ayudan a mejorar la funcionalidad y usabilidad.",
            icon: <FaUsers />
        },
        {
            id: 2,
            title: "Uso de la Información",
            desc: "La información recopilada se utiliza para: \n\n - **Proporcionar acceso a funcionalidades**: habilitar el uso de todas las características de la aplicación. \n - **Personalización**: adaptar el contenido y las recomendaciones a tus preferencias y comportamientos. \n - **Comunicación**: enviarte actualizaciones sobre la aplicación, información sobre eventos, y respuestas a tus consultas. \n - **Análisis**: comprender cómo se utiliza la aplicación para realizar mejoras y optimizaciones. \n - **Cumplimiento legal**: para cumplir con cualquier requerimiento legal o normativo. \n\n No utilizamos tus datos para fines de marketing o promociones sin tu consentimiento explícito.",
            icon: <FaRegNewspaper />
        },
        {
            id: 3,
            title: "Seguridad de los Datos",
            desc: "Implementamos diversas medidas de seguridad para proteger tu información personal, incluyendo: \n\n - **Cifrado de datos**: toda la información sensible se cifra durante la transmisión y almacenamiento. \n - **Autenticación de dos factores**: añadimos una capa extra de seguridad que requiere tanto tu contraseña como un código enviado a tu dispositivo. \n - **Controles de acceso**: solo personal autorizado tiene acceso a tus datos, y todos los empleados están entrenados en la importancia de la privacidad. \n\n Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet puede garantizarse como 100% segura. Hacemos esfuerzos razonables para proteger tu información, pero no podemos garantizar su seguridad absoluta.",
            icon: <FaLock />
        },
        {
            id: 4,
            title: "Compartición de Datos",
            desc: "No compartimos tu información personal con terceros, excepto en los siguientes casos: \n\n - **Cumplimiento legal**: si se requiere por ley o en respuesta a procesos legales. \n - **Consentimiento**: cuando tengamos tu consentimiento explícito para compartir tus datos. \n - **Proveedores de servicios**: trabajamos con terceros para ofrecer ciertos servicios (como soporte técnico y análisis de datos), quienes están obligados a proteger tu información y utilizarla solo para los fines específicos acordados. \n\n Nunca venderemos ni alquilaremos tu información personal a terceros.",
            icon: <FaShieldAlt />
        },
        {
            id: 5,
            title: "Tus Derechos",
            desc: "Como usuario, tienes ciertos derechos respecto a tu información personal, que incluyen: \n\n - **Derecho de acceso**: puedes solicitar una copia de la información que tenemos sobre ti. \n - **Derecho de rectificación**: puedes solicitar correcciones de información incorrecta o incompleta. \n - **Derecho de eliminación**: puedes pedir que eliminemos tu información personal cuando ya no sea necesaria. \n - **Derecho de oposición**: puedes oponerte al tratamiento de tus datos en ciertas circunstancias. \n\n Para ejercer estos derechos, puedes contactarnos a través de la sección de ayuda en la aplicación. Nos comprometemos a responder a tus solicitudes en un plazo razonable y conforme a la ley aplicable.",
            icon: <IoMdContact />
        },
        {
            id: 6,
            title: "Modificaciones a la Política de Privacidad",
            desc: "Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento para reflejar cambios en nuestras prácticas. Las modificaciones se publicarán en la aplicación y entrarán en vigor inmediatamente. \n\n Te recomendamos revisar esta sección periódicamente para estar al tanto de los cambios. Si realizamos cambios significativos, te informaremos a través de la aplicación o por correo electrónico, asegurando que estés al tanto de cómo se manejan tus datos.",
            icon: <FaRegNewspaper />
        },
        {
            id: 7,
            title: "Contacto",
            desc: "Si tienes preguntas, inquietudes o reclamaciones sobre nuestra Política de Privacidad o el tratamiento de tu información personal, no dudes en contactarnos a través de la sección de ayuda dentro de la aplicación. Nuestro equipo de soporte está disponible para asistirte y resolver cualquier duda que puedas tener. \n\n También puedes enviarnos un correo electrónico a [tu correo electrónico de soporte] o visitar nuestra página de contacto en el sitio web para más información.",
            icon: <IoMdContact />
        }
    ];


    const getCurrentMonthAndYear = () => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long' };
        return today.toLocaleDateString('es-ES', options);
    };

    return (
        <>
            <hr className="relative block bg-slate-800" style={{ height: '350px' }}></hr>
            <section className="relative py-16 backgroundTerms">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="text-center mt-12">

                                <h3 className="text-4xl font-bold leading-normal mb-2 text-purple-950 uppercase">
                                    <span className="flex justify-center text-8xl mt-4 text-purple-500"><FaNewspaper /></span> Politicas de privacidad
                                </h3>
                                <div className="mb-2 text-gray-700 mt-10 font-bold">
                                    {getCurrentMonthAndYear().toString().toUpperCase()}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                <div className="flex flex-wrap justify-center">
                                    {
                                        privacyPolicy.map((itemPrivacyPolity: ITermsPrivacyPolities, idx: string | number) => {
                                            return (<ItemPrivacyPolity key={idx} itemPrivacyPolity={itemPrivacyPolity} />)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Privacypolities;