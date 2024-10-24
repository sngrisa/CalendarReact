// @ts-ignore
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdError } from "react-icons/md";
import { useStore } from '../../../store/useStore'; // Ajusta la ruta
import { MdEventRepeat, MdOutlineEvent, MdEvent, MdOutlineSubtitles } from "react-icons/md";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import "./modalCalendarDetails.scss";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import { Button } from '../../../components/ui/button';
import { IoIosCloseCircle } from "react-icons/io";


type ValuePiece = Date | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

export interface IEventCalendarModal {
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

let subtitle: any = "";

Modal.setAppElement('#root');

const ModalCalendarDetails = () => {
    const subtitleRef = useRef<any>();
    const { isModalOpenDetails, closeModalDetails, selectedEvent, updateEvent } = useStore();
    const now = moment().minute(0).seconds(0).add(1, 'hours');
    const nowPlus = now.clone().add(1, 'hours');

    const [date, setDate] = useState<Value>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Value>(nowPlus.toDate());
    const [titleError, setTitleError] = useState<string | null>(null);
    const [notesError, setNotesError] = useState<string | null>(null);

    const [formValues, setFormValues] = useState<IEventCalendarModal>({
        title: selectedEvent?.title || '',
        notes: selectedEvent?.notes || '',
        start: selectedEvent?.start || new Date(),
        end: selectedEvent?.end || new Date(),
    });

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if (selectedEvent) {
            setFormValues({
                _id: selectedEvent._id,
                title: selectedEvent.title,
                notes: selectedEvent.notes,
                start: selectedEvent.start,
                end: selectedEvent.end,
            });
        }
    }, [selectedEvent]);


    const afterOpenModal = (): void => {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    };

    const InputChange = ({ target }: { target: any }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

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

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const memoStart = moment(start);
        const memoEnd = moment(end);

        if (memoStart.isSameOrAfter(memoEnd)) {
            alertInfo("La fecha de inicio debe ser anterior a la fecha de fin", "Verifique las fechas ingresadas", "error");
            return;
        }

        if (title.trim().length < 2) {
            alertInfo("El campo de título no puede estar vacío", "El título debe tener al menos 2 caracteres", "error");
            return;
        }
        if (selectedEvent) {
            const updatedEvent = {
                ...selectedEvent,
                title,
                notes,
                start: date,
                end: dateEnd,
            };

            updateEvent(updatedEvent)
            closeModalDetails();
        }
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            useStore.getState().removeEvent(selectedEvent._id);
            closeModalDetails();
        }
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
            <div className='flex items-center justify-center mx-auto mb-10'>
                <Modal
                    isOpen={isModalOpenDetails}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalDetails}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal cursor-pointer"
                    overlayClassName="modal-fondo"
                    closeTimeoutMS={200}
                >
                    <h1 className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer">
                        <span className='mr-2 text-green-700'><MdEventRepeat /></span>
                        {selectedEvent?.title.toUpperCase()}
                    </h1>
                    <hr className="mb-4" />
                    <form className="container mx-auto" onSubmit={handleSubmit} autoComplete='off'>
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
                                className="block w-full border border-gray-300 notes rounded-lg px-3 py-2"
                                placeholder="Notas"
                                rows="3"
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
                                className="w-full bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-green-800 transition duration-200"
                            >
                                <span className='mr-2 font-bold text-lg'><GrUpdate /></span>Actualizar Evento
                            </Button>
                            <Button
                                type='button' onClick={handleDeleteEvent}
                                className="w-full bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-red-800 transition duration-200"
                            >
                                <span className='mr-2 font-bold text-lg'><GrUpdate /></span>Eliminar Evento
                            </Button>
                        </div>
                        <Button type='button' onClick={closeModalDetails}
                            className="flex items-center w-full bg-red-700 mt-4 text-white font-semibold py-2 rounded-lg justify-center hover:bg-red-800 transition duration-200"><span className='text-2xl mr-1'><IoIosCloseCircle /></span>Cerrar</Button>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default ModalCalendarDetails;