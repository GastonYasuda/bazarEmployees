import React, { createContext, useState } from 'react'

export const apiEmployee = createContext();

const EmployeeApiContext = ({ children }) => {

    const [infoMissingMorning, setInfoMissingMorning] = useState([])
    const [infoMissingAfternoon, setInfoMissingAfternoon] = useState([])
    const [infoShiftFixMissing, setInfoShiftFixMissing] = useState([])
    const [infoMissingEmployee, setInfoMissingEmployee] = useState([])




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
            setInfoMissingEmployee([infoMessage])
        }

    }

    function formatHour(decimalHour) {
        const hour = Math.floor(decimalHour);
        const minutes = Math.round((decimalHour - hour) * 60);
        const paddedMinutes = minutes.toString().padStart(2, '0');
        return `${hour}:${paddedMinutes}`;
    }


    return (
        <apiEmployee.Provider value={{ infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee, saveInfo, formatHour }}>
            {children}
        </apiEmployee.Provider>
    )
}

export default EmployeeApiContext
