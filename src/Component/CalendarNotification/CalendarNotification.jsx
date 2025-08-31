import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";



const CalendarNotification = () => {


    const [showSpecialDates, setShowSpecialDates] = useState([])

    useEffect(() => {
        toLocalMidnight()


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    function toLocalMidnight() {
        const stored = localStorage.getItem('allSpecialDates');
        if (!stored) return;

        const parsed = JSON.parse(stored);

        const normalized = parsed.map(element => ({
            specialDateData: new Date(element.specialDateData), // objeto Date
            specialDateStore: element.specialDateStore // la propiedad para el color
        }));

        setShowSpecialDates(normalized);
    }



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
        //console.log('hola date', date);

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
                    tileContent={({ date }) => {
                        // obtener todos los objetos que coincidan con la fecha
                        const matchedDates = showSpecialDates.filter(d => isSameDay(d.specialDateData, date));
                        if (matchedDates.length === 0) return null;

                        // obtener solo specialDateStore únicos
                        const uniqueStores = [...new Set(matchedDates.map(d => d.specialDateStore))];

                        return (
                            <div
                                style={{
                                    textAlign: 'right',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    gap: '2px',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                {uniqueStores.map((store, index) => {
                                    let color;
                                    switch (store) {
                                        case 'espacio':
                                            color = 'violet';
                                            break;
                                        case 'punto':
                                            color = 'red';
                                            break;
                                        case 'ciudad':
                                            color = 'yellow';
                                            break;
                                        default:
                                            color = 'gray';
                                    }
                                    return <FaTimes key={index} color={color} />;
                                })}
                            </div>
                        );
                    }}
                />




            </section>

            <section className="refSection">
                <span> <FaTimes color={'violet'} />Espacio</span>
                <span> <FaTimes color={'red'} />Punto</span>
                <span><FaTimes color={'orange'} />Ciudad</span>

            </section>

        </div>
    );
};

export default CalendarNotification;





