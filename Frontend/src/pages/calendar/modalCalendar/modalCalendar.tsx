"use client"
// @ts-ignore
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdError } from "react-icons/md";
import { useStore } from './../../../store/useStore'; // Ajusta la ruta
import { MdEventRepeat, MdOutlineEvent, MdEvent, MdOutlineSubtitles } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { Alert, AlertDescription, AlertTitle } from "./../../../components/ui/alert";
import { Button } from './../../../components/ui/button'; // Ajusta la ruta
import "./modalCalendar.scss";
import { IoIosCloseCircle } from "react-icons/io";
import Swal, { SweetAlertIcon } from 'sweetalert2';


type ValuePiece = Date | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IEventCalendarModal {
    _id?: number | string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
}

const customStyles = {
    content: {
        position: 'fixed',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px',
        height: '800px',
        zIndex: 1000,
        padding: '20px',
        overflow: 'auto',
    },
};



Modal.setAppElement('#root');

const ModalCalendar = () => {
    const subtitleRef = useRef<any>();
    const { isModalOpen, closeModal, openModal, addEvent } = useStore();
    const now = moment().minute(0).seconds(0).add(1, 'hours');
    const nowPlus = now.clone().add(1, 'hours');

    const [date, setDate] = useState<Value>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Value>(nowPlus.toDate());
    const [titleError, setTitleError] = useState<string | null>(null);
    const [notesError, setNotesError] = useState<string | null>(null);
    const [id, setId] = useState<number>(0);

    const [formValues, setFormValues] = useState<IEventCalendarModal>({
        title: "",
        notes: "",
        start: now.toDate(),
        end: nowPlus.toDate()
    });

    const { title, notes, start, end } = formValues;


    const afterOpenModal = (): void => {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    };

    const InputChange = ({ target }: { target: any }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        if (target.name === "title") {
            if (target.value.trim().length < 2) {
                setTitleError("El título debe tener al menos 2 caracteres.");
            } else {
                setTitleError(null);
            }
        }

        if (target.name === "notes") {
            if (target.value.trim().length < 5) {
                setNotesError("Las notas deben tener al menos 5 caracteres.");
            } else {
                setNotesError(null);
            }
        }
    };

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

        const memoStart = moment(formValues.start);
        const memoEnd = moment(formValues.end);

        // Validar que la fecha de inicio sea anterior a la de fin
        if (memoStart.isSameOrAfter(memoEnd)) {
            alertInfo("La fecha de inicio debe ser anterior a la fecha de fin", "Verifique las fechas ingresadas", "error");
            return;
        }

        // Validar que el título tenga al menos 2 caracteres
        if (title.trim().length < 2) {
            alertInfo("El campo de título no puede estar vacío", "El título debe tener al menos 2 caracteres", "error");
            return;
        }

        const newEvent: any = {
            _id: id,
            title: formValues.title,
            start: memoStart.toDate(), // Asegúrate de que esto sea un objeto Date válido
            end: memoEnd.toDate(), // Asegúrate de que esto sea un objeto Date válido
            bgcolor: 'darkblue',
            notes: formValues.notes,
            user: {
                _id: '1',
                name: 'Fernando Stetmann',
            },
        };

        addEvent(newEvent);
        closeModal();
        setId(id + 1);
    };

    const alertInfo = (msg: string, msg2: string, iconFile: SweetAlertIcon): void => {
        Swal.fire({
            icon: iconFile,
            title: msg,
            text: msg2,
            confirmButtonText: "Aceptar",
        });
    };

    return (
        <>
            <div className='container mx-auto mb-10'>
                <section className='flex items-start justify-start'>
                    <Button onClick={openModal} className="bg-black w-full text-white px-4 py-2 rounded font-bold mt-12 hover:bg-slate-500">
                        <span className='h-12 w-auto flex items-center mr-2'><IoAddCircle /></span>Añadir Evento
                    </Button>
                </section>

                <Modal
                    isOpen={isModalOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal-addevent cursor-pointer"
                    overlayClassName="modal-fondo"
                    closeTimeoutMS={200}
                >
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer">
                        <span className='mr-2 text-red-700'><MdEventRepeat /></span>
                        {title}
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
                                titleError &&
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
                                className="block w-full border border-gray-300 rounded-lg px-3 py-2 notes"
                                placeholder="Notas"
                                rows="4"
                                name="notes"
                                value={notes}
                                onChange={InputChange}
                            ></textarea>
                            {
                                notesError &&
                                <Alert className="bg-red-700 text-white mt-2">
                                    <AlertTitle className="font-bold flex items-center"><span className='mr-2 font-bold text-3xl'><MdError /></span>Atención</AlertTitle>
                                    <AlertDescription>
                                        El campo de notas tiene menos de 2 caracteres
                                    </AlertDescription>
                                </Alert>
                            }
                        </div>
                        <div className='grid grid-cols-2'>
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-200"
                            >
                                <span className='mr-2 font-bold text-lg'><FaSave /></span>Guardar
                            </Button>
                            <Button className='text-white border bg-red-600 hover:bg-red-700' onClick={closeModal}><span className='text-2xl'><IoIosCloseCircle /></span>Cerrar</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default ModalCalendar;
