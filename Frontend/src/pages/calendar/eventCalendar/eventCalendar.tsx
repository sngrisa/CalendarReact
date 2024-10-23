import { IEventCalendar } from "../calendar";
import { FaUser } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const EventCalendar = ({ event }: { event: IEventCalendar }) => {

    const { title, user } = event;

    return (
        <>
            <div>
                <strong className="flex items-center font-semibold uppercase"><span className="mr-2 text-slate-300 text-2xl"><MdEvent /></span>{title}</strong>
                <strong className="flex items-center font-bold uppercase"><span className="mr-2  text-slate-300 text-2xl"><FaUser /></span>{user.name}</strong>
            </div>

        </>
    )
}

export default EventCalendar;