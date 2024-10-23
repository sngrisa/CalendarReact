import CalendarComponent from "../calendar/calendar";
import Features from "./features/features";
import "./home.scss";
import Main from "./main/main";
import OtherFeatures from "./otherFeatures/otherFeatures";
import TestCalendar from "./testCalendar/testCalendar";

const Home = () => {
    return (
        <>
            <Main />
            <div className="mt-36">
                <Features />
                <OtherFeatures />
                <TestCalendar />
            </div>
        </>
    )
}

export default Home;