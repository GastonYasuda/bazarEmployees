/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react'

export const apiEmployee = createContext();

const EmployeeApiContext = ({ children }) => {

    const [infoMissingMorning, setInfoMissingMorning] = useState([])
    const [infoMissingAfternoon, setInfoMissingAfternoon] = useState([])
    const [infoShiftFixMissing, setInfoShiftFixMissing] = useState([])
    const [infoMissingEmployee, setInfoMissingEmployee] = useState([])


    const entryAllTime = [
        { id: 1, entryTime: 9 },
        { id: 2, entryTime: 13.5 },
        { id: 3, entryTime: 14.5 },
        { id: 4, entryTime: 16 }
    ]

    const exitAllTime = [
        { id: 1, exitTime: 14.5 },
        { id: 2, exitTime: 15.5 },
        { id: 3, exitTime: 16 },
        { id: 4, exitTime: 20 }
    ]

    const employeeData = [
        { id: 0, name: "Mely", entry: entryAllTime[0].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "espacio" }, //medio turno
        { id: 1, name: "Luca", entry: entryAllTime[0].entryTime, exit: exitAllTime[2].exitTime, assist: true, store: "espacio" }, //cubre almuerzo
        { id: 2, name: "Ori", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "espacio" }, //Luca
        { id: 3, name: "Anto", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "espacio" }, // Mely cubre almuerzo Luca
        { id: 4, name: "Dari", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "espacio" }, //doble turno
        { id: 5, name: "Jorge", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "espacio" }, //Dari cuando Anto hace doble turno
        { id: 6, name: "Belen", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "punto" }, //Dari cuando Anto hace doble turno
        { id: 7, name: "Orne", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "punto" }, //Dari cuando Anto hace doble turno
        { id: 8, name: "Jenn", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "punto" }, //Dari cuando Anto hace doble turno
        { id: 9, name: "AntoP", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "punto" }, //Dari cuando Anto hace doble turno
        { id: 10, name: "Thian", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "ciudad" }, //Dari cuando Anto hace doble turno
        { id: 11, name: "Ari", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "ciudad" }, //Dari cuando Anto hace doble turno
        { id: 12, name: "Luz", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "ciudad" }, //Dari cuando Anto hace doble turno
        { id: 13, name: "Mili", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "ciudad" }, //Dari cuando Anto hace doble turno

    ]

    const [employees, setEmployees] = useState(employeeData);

    const [espacioMorningEmployees, setEspacioMorningEmployees] = useState([])
    const [espacioAfternoonEmployees, setEspacioAfternoonEmployees] = useState([])
    const [puntoMorningEmployees, setPuntoMorningEmployees] = useState([])
    const [puntoAfternoonEmployees, setPuntoAfternoonEmployees] = useState([])
    const [ciudadMorningEmployees, setCiudadMorningEmployees] = useState([])
    const [ciudadAfternoonEmployees, setCiudadAfternoonEmployees] = useState([])

    const [espacioEmployees, setEspacioEmployees] = useState([])
    const [puntoEmployees, setPuntoEmployees] = useState([])
    const [ciudadEmployees, setCiudadEmployees] = useState([])

    useEffect(() => {
        searchStoreEmployee("espacio")
        searchStoreEmployee("punto")
        searchStoreEmployee("ciudad")
    }, [employees])


    const searchStoreEmployee = (state) => {
        const byStore = employees.filter((employee) => employee.store === state)
        // console.log('soy state', state);
        // console.log('soy bystore', byStore);



        if (state === "espacio") {
            // console.log("Espacio", byStore);
            setEspacioEmployees(byStore) //me guarda todos los empleados de espacio 
            morningShift(byStore) //me guarda los empleados de espacio de ma;ana
            afternoonShift(byStore) //me guarda los empleados de espacio de tarde

        } else if (state === "punto") {
            // console.log("Punto", byStore);
            setPuntoEmployees(byStore)
            morningShift(byStore)
            afternoonShift(byStore)

        } else if (state === "ciudad") {
            // console.log("Ciudad", byStore);
            setCiudadEmployees(byStore)
            morningShift(byStore)
            afternoonShift(byStore)
        }
    }

    const morningShift = (data) => {

        const morning = data.filter((employee) => employee.entry === 9 && employee.assist === true);
        // console.log('que morning?', morning[0].store); //todos los que trabajan manana

        if (morning.length !== 0) {

            if (morning[0].store === 'espacio') {
                setEspacioMorningEmployees(morning);

            } else if (morning[0].store === 'punto') {
                setPuntoMorningEmployees(morning)

            } else if (morning[0].store === 'Ciuciudaddad') {
                setCiudadMorningEmployees(morning)

            }
        }

    }


    const afternoonShift = (data) => {
        const afternoon = data.filter((employee) => employee.exit === 20 && employee.assist === true);

        if (afternoon.length !== 0) {

            if (afternoon[0].store === 'espacio') {
                setEspacioAfternoonEmployees(afternoon)

            } else if (afternoon[0].store === 'punto') {
                setPuntoAfternoonEmployees(afternoon)

            } else if (afternoon[0].store === 'ciudad') {
                setCiudadAfternoonEmployees(afternoon)

            }
        }
    }




    const saveInfo = (infoMessage, state) => {

        //si state es diferente que me guarde otro 
        //si se resuelve el problema que se borre el mensaje
        if (state === 'missingMorning') {

            setInfoMissingMorning((prevMessage) => [...prevMessage, infoMessage])

        } else if (state === 'missingAfternoon') {
            setInfoMissingAfternoon((prevMessage) => [...prevMessage, infoMessage])

        } else if (state === 'shiftFixMissing') {
            setInfoShiftFixMissing([infoMessage])

        } else if (state === 'missingEmployee') {
            setInfoMissingEmployee((prevMessage) => [...prevMessage, infoMessage])
        }

    }

    function formatHour(decimalHour) {
        const hour = Math.floor(decimalHour);
        const minutes = Math.round((decimalHour - hour) * 60);
        const paddedMinutes = minutes.toString().padStart(2, '0');
        return `${hour}:${paddedMinutes}`;
    }

    function mayPrimera(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <apiEmployee.Provider value={{ mayPrimera, infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee, saveInfo, formatHour, employees, setEmployees, espacioMorningEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees, espacioAfternoonEmployees, espacioEmployees, entryAllTime, exitAllTime, puntoEmployees, ciudadEmployees }}>
            {children}
        </apiEmployee.Provider>
    )
}

export default EmployeeApiContext
