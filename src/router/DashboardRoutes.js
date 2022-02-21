
import {Routes, Route} from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { Navbar } from "../components/ui/Navbar";

export const DashboardRoutes = () => {
    return (
        <>
          <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="calendar" element={<CalendarScreen/>}/>
                    <Route path="/" element={<CalendarScreen/>}/>
                </Routes>
            </div>
        </>
    )
}