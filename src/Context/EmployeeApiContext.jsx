import React, { createContext, useState } from 'react'

export const apiEmployee = createContext();

const EmployeeApiContext = ({ children }) => {

    const [info, setInfo] = useState([])

    const saveInfo = (infoMessage, state) => {

        //setInfo((prevMessage) => [...prevMessage, infoMessage])
        setInfo([infoMessage])

        //si state es diferente que me guarde otro 
        //si se resuelve el problema que se borre el mensaje
        if (state === 'missingMorning' || state === 'missingAfternoon') {

            setInfo((prevMessage) => [...prevMessage, infoMessage])

        } else if (state === ' shiftFixMissing') {
            setInfo([infoMessage])

        } else if (state === 'missingEmployee') {
            setInfo([infoMessage])
        }

    }

    return (
        <apiEmployee.Provider value={{ info, saveInfo }}>
            {children}
        </apiEmployee.Provider>
    )
}

export default EmployeeApiContext
