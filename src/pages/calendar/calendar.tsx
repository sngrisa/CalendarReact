import "./calendar.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import { messages } from "../../lang/messages";
import EventCalendar from "./eventCalendar/eventCalendar";
import ModalCalendar from "./modalCalendar/modalCalendar";
import { useStore } from "../../store/useStore";
import ModalCalendarDetails from "./modalCalendarDetails/modalCalendarDetails";

export interface IColorEventCalendar {
  backgroundColor: string;
  borderRadius: string;
  opacity: number;
  display: string;
  color: string;
}

export interface IEventCalendar {
  id?: string | number;
  title: string;
  start: Date; // Use Date for better type safety
  end: Date; // Use Date for better type safety
  bgcolor: string;
  notes: string;
  user: IUserEvent;
}

export interface IUserEvent {
  _id: string;
  name: string;
}

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {

  const { openModalDetails, openModal, events } = useStore();

  const [selectedEvent, setSelectedEvent] = useState<IEventCalendar>();

  const [lastView, setLastView] = useState<string>(localStorage.getItem('lastChange') || 'month');

  const onHandledClick = (event: IEventCalendar) => {
    openModal();
  };

  const onSelectedItem = (event: IEventCalendar) => {
    useStore.getState().setSelectedEvent(event);
    openModalDetails();
};

  const onViewChange = (event: string): void => {
    setLastView(event);
    localStorage.setItem('lastChange', event);
  };

  const eventStyleGetter = (event: IEventCalendar) => {
    const style: IColorEventCalendar = {
      backgroundColor: 'darkblue',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'whitesmoke',
    };
    return { style };
  };

  return (
    <div id="calendar-screen">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="rbc-calendar"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: EventCalendar }}
        onDoubleClickEvent={onHandledClick}
        onSelectEvent={onSelectedItem}
        onView={onViewChange}
        view={lastView}
      />
      <ModalCalendar />
      <ModalCalendarDetails event={selectedEvent}/>
    </div>
  );
};

export default CalendarComponent;
