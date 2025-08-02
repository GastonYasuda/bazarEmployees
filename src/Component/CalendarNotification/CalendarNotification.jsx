import React, { useContext, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import Accordion from 'react-bootstrap/Accordion';
import { apiEmployee } from "../../Context/EmployeeApiContext";
import InformationContainer from "../InformationContainer/InformationContainer";



const CalendarNotification = () => {
    const { notAssistEmployeesState } = useContext(apiEmployee)
    const [selected, setSelected] = useState();
    const [notAssistEspacio, setNotAssistEspacio] = useState([])
    const [notAssistPunto, setNotAssistPunto] = useState([])
    const [notAssistCiudad, setNotAssistCiudad] = useState([])


    useEffect(() => {
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

    }, [notAssistEmployeesState])

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

                            <InformationContainer store={'espacio'} notAssist={notAssistEspacio} />

                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Ciudad</Accordion.Header>
                        <Accordion.Body>

                            <InformationContainer store={'ciudad'} notAssist={notAssistCiudad} />

                        </Accordion.Body>
                    </Accordion.Item>



                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Punto</Accordion.Header>
                        <Accordion.Body>

                            <InformationContainer store={'punto'} notAssist={notAssistPunto} />

                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>




            </section>

        </div>
    );
};

export default CalendarNotification;





