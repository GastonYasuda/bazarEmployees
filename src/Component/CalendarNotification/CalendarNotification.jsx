import React, { useContext, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { apiEmployee } from "../../Context/EmployeeApiContext";
import InformationContainer from "../InformationContainer/InformationContainer";
import TestMyCalendar from "../TestMyCalendar/TestMyCalendar";



const CalendarNotification = () => {
    const { notAssistEmployeesState, shiftInformationEspacio, shiftInformationPunto, shiftInformationCiudad, } = useContext(apiEmployee)
    const [notAssistEspacio, setNotAssistEspacio] = useState([])
    const [notAssistPunto, setNotAssistPunto] = useState([])
    const [notAssistCiudad, setNotAssistCiudad] = useState([])


    useEffect(() => {
        console.log(shiftInformationEspacio);


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

    return (
        <div>
            <section className="calendarNotification_container">
                <TestMyCalendar />
            </section>

            <section className="cardNotifications">

                {/* <Accordion defaultActiveKey={['0']} alwaysOpen>

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Espacio</Accordion.Header>
                        <Accordion.Body>

                            <InformationContainer store={'espacio'} notAssist={notAssistEspacio} shiftInformation={shiftInformationEspacio} />


                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Ciudad</Accordion.Header>
                        <Accordion.Body>

                            <InformationContainer store={'ciudad'} notAssist={notAssistCiudad} shiftInformation={shiftInformationPunto} />

                        </Accordion.Body>
                    </Accordion.Item>



                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Punto</Accordion.Header>
                        <Accordion.Body>

                            <InformationContainer store={'punto'} notAssist={notAssistPunto} shiftInformation={shiftInformationCiudad} />

                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion> */}




            </section>

        </div>
    );
};

export default CalendarNotification;





