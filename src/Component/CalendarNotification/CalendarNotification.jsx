import React, { useContext, useEffect, useState } from "react";
// import Accordion from 'react-bootstrap/Accordion';
import { apiEmployee } from "../../Context/EmployeeApiContext";
// import InformationContainer from "../InformationContainer/InformationContainer";

import Calendar from 'react-calendar';
import { FaCircle, FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate } from "react-router-dom";



const CalendarNotification = () => {
    const { notAssistEmployeesState, shiftInformationEspacio } = useContext(apiEmployee)
    const [notAssistEspacio, setNotAssistEspacio] = useState([])
    const [notAssistPunto, setNotAssistPunto] = useState([])
    const [notAssistCiudad, setNotAssistCiudad] = useState([])


    useEffect(() => {
        // console.log(shiftInformationEspacio);



        if (notAssistEmployeesState.length !== 0) {

            notAssistEmployeesState.forEach(notAssist => {
                // console.log(notAssist.name);
                // console.log(`no viene ${notAssist.name} en ${notAssist.store} de ${notAssist.entry} a ${notAssist.exit}`);

                if (notAssist.store === 'espacio') {
                    setNotAssistEspacio(notAssistEmployeesState)
                } else if (notAssist.store === 'punto') {
                    setNotAssistPunto(notAssistEmployeesState)
                } else if (notAssist.store === 'ciudad') {
                    setNotAssistCiudad(notAssistEmployeesState)
                }
            });


        }

    }, [notAssistEmployeesState, shiftInformationEspacio])

    const specialDates = [new Date(2025, 7, 5), new Date(2025, 7, 25)];

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

        if (esta) {
            console.log(`La fecha ${dateJson} ya esta creada`);

        } else {
            console.log(`La fecha ${dateJson} va a ser creada`);

            setSaveInfoToSelectDate(prevDate => [...prevDate, dateJson])
        }
    }


    // const handleDateChange = (date) => {
    //     console.log('Fecha seleccionada:', date.toISOString());

    //     setSelectedDate(date.toISOString());
    // };




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





