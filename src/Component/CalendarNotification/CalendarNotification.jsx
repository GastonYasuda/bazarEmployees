import React, { useState } from "react";
import Calendar from 'react-calendar';
import { FaCircle, FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";



const CalendarNotification = () => {

    const specialDates = [
        new Date(2025, 8, 5),
        new Date(2025, 7, 25)
    ];





    const isSameDay = (a, b) => {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    }

    //------------------------------------------------------------------------------

    const [saveInfoToSelectDate, setSaveInfoToSelectDate] = useState([])

    const navigate = useNavigate();

    //primero que busque si la fecha seleccionada existe, si no existe crearla. Y si existe agregarle.

    const addInfoToSelectDate = (date) => {
        const dateJson = date.toISOString().split("T")[0]
        navigate(`/${dateJson}`);
        const esta = saveInfoToSelectDate.includes(dateJson);

        if (!esta) {
            setSaveInfoToSelectDate(prevDate => [...prevDate, dateJson])
        }
    }

    return (
        <div>
            <section className="calendarNotification_container">
                <Calendar
                    onChange={addInfoToSelectDate}
                    locale="es-ES"
                    tileContent={({ date }) =>
                        specialDates.some((d) => isSameDay(d, date)) ? (
                            <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                                <FaCircle color="red" />
                                <FaTimes color="red" />
                            </div>
                        ) : null
                    }
                />

            </section>

        </div>
    );
};

export default CalendarNotification;





