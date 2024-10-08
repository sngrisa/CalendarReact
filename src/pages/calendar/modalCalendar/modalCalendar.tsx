import { useState } from 'react';
import Modal from 'react-modal';
import { IEventCalendar } from '../calendar';
import "./modalCalendar.scss";
import { MdEventRepeat, MdOutlineEvent, MdEvent, MdOutlineSubtitles } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from "sweetalert2";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { MdError } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const customStyles = {
    content: {
        position: 'fixed',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px',
        height: '800px', // Aumenta la altura aquí
        zIndex: 1000,
        padding: '20px', // Asegúrate de que haya un poco de espacio
        overflow: 'auto', // Permite el desplazamiento si el contenido es muy grande
    },
};

type ValuePiece = Date | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IEventCalendarModal {
    title: string;
    notes: string;
    start: Date;
    end: Date;
}

Modal.setAppElement('#root');

const ModalCalendar = ({ event }: { event: IEventCalendar }) => {
    const now: any = moment().minute(0).seconds(0).add(1, 'hours');
    const nowPlus: any = now.clone().add(1, 'hours');

    let subtitle: any = "";

    const [date, setDate] = useState<Value>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Value>(nowPlus.toDate());

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const [formValues, setFormValues] = useState<IEventCalendarModal>({
        title: "Martina",
        notes: "",
        start: now.toDate(),
        end: nowPlus.toDate()
    });

    const [validField, setValidField] = useState<boolean>(false);

    const { title, notes, start, end } = formValues;

    const openModal = (): void => {
        setIsOpen(!modalIsOpen);
    }

    const afterOpenModal = (): void => {
        subtitle.style.color = '#f00';
    }

    const InputChange = ({ target }: { target: any }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    const closeModal = (): void => {
        setIsOpen(false);
    }

    const startHandledDate = (event: any) => {
        setDate(event);
        setFormValues({
            ...formValues,
            start: event
        })
    }

    const startHandledEndDate = (event: any) => {
        setDateEnd(event);
        setFormValues({
            ...formValues,
            end: event
        })
    }

    const handleSubmitForm = (event: any) => {
        event.preventDefault();
        const memoStart = moment(start);
        const memoEnd = moment(end);

        if (memoStart.isSameOrAfter(memoEnd)) {
            alertInfo("La fecha debe ser menor a la fecha de fin del evento", "Verifique que la fecha de Inicio sea menor", "error");
            return;
        }

        if (title.trim().length < 2) {
            alertInfo("No deje el campo de titulo vacio", "Verifique que el titulo del evento sea mayor a 2 digitos", "error");
            setValidField(false);
            return;
        }
        setValidField(true);
        closeModal();
    }


    const alertInfo = (msg: string, msg2: string, iconFile: string): void => {
        Swal?.fire({
            icon: `${iconFile}`,
            title: `${msg}`,
            text: `${msg2}`,
            confirmButtonText: "Aceptar",
        });
    }

    return (
        <>
            <div className='flex items-center justify-center mx-auto'>
                <Button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded font-bold mt-12 hover:bg-slate-500">
                    <span className='mr-2 h-12 w-auto flex items-center'><IoAddCircle /></span> Añadir Evento
                </Button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal cursor-pointer"
                    overlayClassName="modal-fondo"
                    closeTimeoutMS={200}
                >
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer">
                        <span className='mr-2 text-red-700'><MdEventRepeat /></span>
                        Nuevo evento
                    </h1>
                    <hr className="mb-4" />
                    <form className="container mx-auto" onSubmit={handleSubmitForm} autoComplete='off'>
                        <div className="mb-4">
                            <label className="text-sm mb-1 font-bold flex items-center justify-center">
                                <span className='mr-2 text-2xl text-green-800'><MdOutlineEvent /></span>
                                Fecha y hora inicio
                            </label>
                            <div className="flex justify-center mb-2">
                                <DateTimePicker
                                    onChange={startHandledDate}
                                    value={date}
                                    className="border border-gray-300 rounded-lg w-full px-3 py-2 cursor-pointer font-bold date-time-picker_wrapper"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center text-sm mb-1 font-bold justify-center">
                                <span className='mr-2 text-orange-500 text-2xl'><MdEvent /></span>
                                Fecha y hora fin
                            </label>
                            <div className="flex justify-center mb-2">
                                <DateTimePicker
                                    onChange={startHandledEndDate}
                                    value={dateEnd}
                                    minDate={date}
                                    className="border border-gray-300 rounded-lg w-full px-3 py-2 cursor-pointer font-bold date-time-picker_wrapper"
                                />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="mb-4">
                            <label className="flex items-center text-sm font-bold mb-1 justify-center">
                                <span className='mr-2 text-2xl text-slate-400'><MdOutlineSubtitles /></span>
                                Título y notas
                            </label>
                            <input
                                type="text"
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Título del evento"
                                name="title"
                                autoComplete="off"
                                value={title}
                                onChange={InputChange}
                            />
                            {
                                !validField &&
                                <Alert className="bg-red-700 text-white mt-2">
                                    <AlertTitle className="font-bold flex items-center"><span className='mr-2 font-bold text-3xl'><MdError /></span>Atención</AlertTitle>
                                    <AlertDescription>
                                        El campo de titulo tiene menos de 2 caracteres
                                    </AlertDescription>
                                </Alert>
                            }

                        </div>
                        <div className="mb-4">
                            <textarea
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Notas"
                                rows="5"
                                name="notes"
                                value={notes}
                                onChange={InputChange}
                            ></textarea>
                            <small className="text-gray-500">Información adicional</small>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200"
                        >
                            <span className='mr-2 font-bold text-lg'><FaSave /></span>Guardar
                        </button>
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default ModalCalendar;