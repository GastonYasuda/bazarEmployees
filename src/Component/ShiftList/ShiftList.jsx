/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const ShiftList = ({ employeeList, shift }) => {


    useEffect(() => {
        if (employeeList.length) {
            console.log(employeeList);
            if (shift === 'Manana' && employeeList.length < 4) {
                toast(`Falta gente para turno ${shift}`)
            }
            if (shift === 'Tarde' && employeeList.length < 3) {
                toast(`Falta gente para turno ${shift}`)
            }
        }

    }, [employeeList])



    return (
        <div>
            <h3>Turno {shift}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {employeeList.map((employee) => {
                    return (
                        <span key={employee.id}>{employee.name}</span>
                    )
                })}
                <ToastContainer />
            </div>

        </div>
    )
}

export default ShiftList
