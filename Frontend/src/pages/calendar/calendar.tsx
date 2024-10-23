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

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const { openModalDetails, openModal, events } = useStore();
  const [lastView, setLastView] = useState<string>(localStorage.getItem('lastChange') || 'month');

  const onHandledClick = () => {
    openModal();
  };

  const onSelectedItem = (event: any) => {
    useStore.getState().setSelectedEvent(event);
    openModalDetails();
  };

  const onViewChange = (event: string) => {
    setLastView(event);
    localStorage.setItem('lastChange', event);
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: 'darkblue',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'whitesmoke',
    }
  });

  return (
    <div id="calendar-screen" className="container mx-auto gap-4">
      <ModalCalendar />
      <Calendar
        localizer={localizer}
        events={events.map(event => ({
          ...event,
          start: new Date(event.start), // Asegúrate de que sea un objeto Date
          end: new Date(event.end), // Asegúrate de que sea un objeto Date
        }))}
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
      
      <ModalCalendarDetails />
    </div>
  );
};

export default CalendarComponent;