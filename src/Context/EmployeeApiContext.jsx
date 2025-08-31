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
        { id: 0, name: "Mely", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" }, //medio turno
        { id: 1, name: "Luca", entry: entryAllTime[0].entryTime, exit: exitAllTime[2].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" }, //cubre almuerzo
        { id: 2, name: "Ori", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" }, //Luca
        { id: 3, name: "Anto", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" }, // Mely cubre almuerzo Luca
        { id: 4, name: "Dari", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" }, //doble turno
        { id: 5, name: "Jorge", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "espacio", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 6, name: "Belen", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "punto", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 7, name: "Orne", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "punto", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 8, name: "Jenn", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "punto", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 9, name: "AntoP", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "punto", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 10, name: "Thian", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "ciudad", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 11, name: "Ari", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "ciudad", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 12, name: "Luz", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "ciudad", doubleShift: false, cutEntry: "", cutEnd: "" },
        { id: 13, name: "Vale", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "ciudad", doubleShift: false, cutEntry: "", cutEnd: "" },

    ]

    const [employees, setEmployees] = useState(employeeData);



    const [espacioEmployees, setEspacioEmployees] = useState([])
    const [puntoEmployees, setPuntoEmployees] = useState([])
    const [ciudadEmployees, setCiudadEmployees] = useState([])


    useEffect(() => {
        searchStoreEmployee("espacio")
        searchStoreEmployee("punto")
        searchStoreEmployee("ciudad")
        ask()

    }, [employees])


    const searchStoreEmployee = (state) => {
        const byStore = employees.filter((employee) => employee.store === state)
        // console.log('soy state', state);
        // console.log('soy bystore', byStore);

        if (state === "espacio") {
            // console.log("Espacio", byStore);
            setEspacioEmployees(byStore) //me guarda todos los empleados de espacio 


        } else if (state === "punto") {
            // console.log("Punto", byStore);
            setPuntoEmployees(byStore)


        } else if (state === "ciudad") {
            // console.log("Ciudad", byStore);
            setCiudadEmployees(byStore)


        }
    }






    const [notAssistEmployeesState, setNotAssistEmployeesState] = useState([])
    // const [shiftInformationEspacio, setShiftInformationEspacio] = useState()
    // const [shiftInformationPunto, setShiftInformationPunto] = useState()
    // const [shiftInformationCiudad, setShiftInformationCiudad] = useState()


    const ask = () => {
        const notAssistEmployees = employees.filter(employee => employee.assist === false);
        setNotAssistEmployeesState(notAssistEmployees)
        //preguntar que horarios hace
        // console.log(notAssistEmployees);
    };




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



    //--------------------------------------------------------------------------------------

    function mayPrimera(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    const [employeesEspacioStored, setEmployeesEspacioStored] = useState([]);
    const [employeesPuntoStored, setEmployeesPuntoStored] = useState([]);
    const [employeesCiudadStored, setEmployeesCiudadStored] = useState([]);
    const [guardados, setGuardados] = useState([])



    const getLocalStoreInfoByDate = (date) => {
        const stored = localStorage.getItem(date);
        if (!stored) return false;

        const parsed = JSON.parse(stored);
        setGuardados(parsed)

        setEmployeesEspacioStored(parsed.employeeData.filter(emp => emp.store === 'espacio'));
        setEmployeesPuntoStored(parsed.employeeData.filter(emp => emp.store === 'punto'));
        setEmployeesCiudadStored(parsed.employeeData.filter(emp => emp.store === 'ciudad'));

        return true;
    };

    const [specialDates, setSpecialDates] = useState([
        // new Date(2025, 7, 8),
        // new Date(Date.UTC(2025, 8, 25)), // 25 de julio 2025
        // new Date(2025, (6 + 1), 12),
    ])

    const addSpecialDate = (newDate, store) => {

        // Convertir string a Date
        const [year, month, day] = newDate.split("-").map(Number);
        const fixedDate = new Date(year, month - 1, day); // mes 0-based

        // Crear objeto de la fecha
        const newSpecialDate = {
            specialDateData: fixedDate,
            specialDateStore: store
        };

        // Actualizar state
        setSpecialDates(prev => [...prev, newSpecialDate]);


        // Guardar en localStorage
        const stored = localStorage.getItem('allSpecialDates');
        let allDates = stored ? JSON.parse(stored) : [];

        // Si solo hay un objeto guardado, aseguramos que sea array
        if (!Array.isArray(allDates)) allDates = [allDates];

        allDates.push(newSpecialDate);
        localStorage.setItem('allSpecialDates', JSON.stringify(allDates));

        console.log('Fecha agregada:', newSpecialDate);
    }



    return (
        <apiEmployee.Provider value={{ mayPrimera, infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee, saveInfo, formatHour, employees, setEmployees, espacioEmployees, entryAllTime, exitAllTime, puntoEmployees, ciudadEmployees, notAssistEmployeesState, employeeData, employeesEspacioStored, setEmployeesEspacioStored, employeesPuntoStored, setEmployeesPuntoStored, employeesCiudadStored, setEmployeesCiudadStored, getLocalStoreInfoByDate, guardados, specialDates, addSpecialDate }}>
            {children}
        </apiEmployee.Provider>
    )
}

export default EmployeeApiContext
