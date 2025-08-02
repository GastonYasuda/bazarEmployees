import React, { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import Accordion from 'react-bootstrap/Accordion';
import { apiEmployee } from "../../Context/EmployeeApiContext";
import { Link } from "react-router-dom";



const CalendarNotification = () => {
    const [selected, setSelected] = useState();
    const { setActiveStore } = useContext(apiEmployee)

    const handleButton = (store) => {
        setActiveStore(store)
    }

    return (
        <div>
            <section className="calendarNotification_container">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                />
            </section>

            <section className="cardNotifications">

                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Espacio</Accordion.Header>
                        <Accordion.Body>
                            Aca van las notificaciones de Espacio

                            <Link to={'/espacio'}>
                                Ir a la planilla de espacio
                            </Link>



                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Ciudad</Accordion.Header>
                        <Accordion.Body>
                            Aca van las notificaciones de Ciudad

                            <Link to={'/ciudad'}>
                                Ir a la planilla de ciudad
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Punto</Accordion.Header>
                        <Accordion.Body>
                            Aca van las notificaciones de Punto

                            <Link to={'/punto'}>
                                Ir a la planilla de punto
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>



            </section>

        </div>
    );
};

export default CalendarNotification;





