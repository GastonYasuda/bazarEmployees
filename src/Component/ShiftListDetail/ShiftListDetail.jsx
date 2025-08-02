import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';


const ShiftListDetail = ({ shiftEmployeeList, shift }) => {
    const { saveInfo, formatHour } = useContext(apiEmployee)

    const countByStore = (storeName, howManyMorning, howManyAfternoon) => {

        if (shiftEmployeeList[0].store === storeName) {
            if (shift === "Mañana" && shiftEmployeeList.length < howManyMorning) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store} shiftListDetail`)
                saveInfo(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`, 'missingMorning')
            }
            if (shift === "Tarde" && shiftEmployeeList.length < howManyAfternoon) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store} shiftListDetail`)
                saveInfo(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`, 'missingAfternoon')
            }
        }
    }



    useEffect(() => {

        if (shiftEmployeeList.length !== 0) {
            countByStore('espacio', 4, 3)
            countByStore('ciudad', 2, 2)
            countByStore('punto', 2, 2)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shiftEmployeeList, shift])


    return (
        <div >
            <h4>Turno {shift}</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {shiftEmployeeList.map((employee) => {
                    return (
                        <div key={employee.id}>
                            <span>{employee.name} de {formatHour(employee.entry)} a {formatHour(employee.exit)}</span>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default ShiftListDetail
