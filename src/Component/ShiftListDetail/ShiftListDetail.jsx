import React, { useEffect } from 'react'
import { toast } from 'react-toastify';


const ShiftListDetail = ({ shiftEmployeeList, shift }) => {

    useEffect(() => {
        if (shiftEmployeeList.length) {

            if (shift === "Manana" && shiftEmployeeList.length < 4) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`)
            }
            if (shift === "Tarde" && shiftEmployeeList.length < 3) {
                toast(`Falta gente para turno ${shift} en ${shiftEmployeeList[0].store}`)
            }
        }




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
