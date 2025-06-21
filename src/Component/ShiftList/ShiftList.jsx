import React, { useEffect } from 'react'

const ShiftList = ({ employeeList }) => {

    useEffect(() => {
        if (employeeList.length) {

            console.log(employeeList);
        }

    }, [employeeList])



    return (
        <div>
            <h3>TURNO MANANA o TARDE</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {employeeList.map((employee) => {
                    return (
                        <span key={employee.id}>{employee.name}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default ShiftList
