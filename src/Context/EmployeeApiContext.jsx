import React, { createContext, useState } from 'react'

export const apiEmployee = createContext();

const EmployeeApiContext = ({ children }) => {

    const [errors, setErrors] = useState([])

    const saveError = () => {

    }
    return (
        <apiEmployee.Provider value={{ errors, setErrors }}>
            {children}
        </apiEmployee.Provider>
    )
}

export default EmployeeApiContext
