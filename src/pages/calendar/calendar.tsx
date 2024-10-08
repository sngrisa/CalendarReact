import "./calendar.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import { messages } from "../../lang/messages";
import EventCalendar from "./eventCalendar/eventCalendar";
import ModalCalendar from "./modalCalendar/modalCalendar";

export interface IColorEventCalendar {
  backgroundColor: string;
  borderRadius: string;
  opacity: number,
  display: string;
  color: string;
}

export interface IEventCalendar {
  title: string,
  start: any,
  end: any,
  bgcolor: string,
  notes: string,
  user: IUserEvent
}

export interface IUserEvent {
  _id: string,
  name: string
}


moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ }) => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastChange') || 'month');

  const onHandledClick = (event: any) => {
    console.log(event);
  }

  const onSelectedItem = (event: any) => {

  }

  const onViewChange = (event: any): void => {
    setLastView(event);
    localStorage.setItem('lastChange', event);
  }

  const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
    const style: IColorEventCalendar = {
      backgroundColor: 'darkblue',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'whitesmoke'
    }
    return {
      style
    }
  }

  const [evenList, setEvenList] = useState<IEventCalendar[]>([
    {
      title: "Locomia",
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: "red",
      notes: "Prosap",
      user: {
        _id: "1",
        name: "Fernando Stetmann"
      }
    }
  ]);

  return (
    <>
      <div id="calendar-screen">
        <Calendar
          localizer={localizer}
          events={evenList}
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
      </div>
    </>
  );
}

export default CalendarComponent;