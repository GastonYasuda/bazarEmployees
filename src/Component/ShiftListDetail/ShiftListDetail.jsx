import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';


const ShiftListDetail = ({ shiftEmployeeList, shift }) => {
    const { saveInfo } = useContext(apiEmployee)


    useEffect(() => {
        if (shiftEmployeeList.length) {

            if (shift === "Manana" && shiftEmployeeList.length < 4) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`)
                saveInfo(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`, 'missingMorning')

            }
            if (shift === "Tarde" && shiftEmployeeList.length < 3) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`)
                saveInfo(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`, 'missingAfternoon')

            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shiftEmployeeList, shift])


    return (
        <div>
            <h3>Turno {shift}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {shiftEmployeeList.map((employee) => {
                    return (
                        <div key={employee.id}>
                            <span>{employee.name} de {employee.entry} a {employee.exit}</span>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default ShiftListDetail
