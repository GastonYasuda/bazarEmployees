/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { Bounce, toast } from 'react-toastify';
import { apiEmployee } from "../../Context/EmployeeApiContext";



const ChangeTime = ({ changeTimeEmployee }) => {

    const { saveInfo, formatHour, setEmployees, entryAllTime, exitAllTime, employees, employeeData } = useContext(apiEmployee)

    const doubleShiftToday = (who) => {

        employees.forEach(employee => {
            if (employee.name === who) {
                console.log(`Hola! soy ${employee.name}`);

                setEmployees(prev =>
                    prev.map(emp =>
                        emp.name === who ? { ...emp, entry: 9, exit: 20, doubleShift: true } : emp
                    )
                );
            }
        });

    }


    useEffect(() => {
        console.log(employees);

        //Mely hace doble siempre
        doubleShiftToday('Mely')

    }, [])


    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]

        changeTimeEmployee.forEach(changeTime => {

            if (changeTime.id === id) {

                if (entryTime === changeTime.exit) {
                    toast.error(`No puede tener la misma hora de entrada y salida de ${changeTime.name}!`, {
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });

                } else {

                    setEmployees(prev =>
                        prev.map(emp =>
                            emp.id === id ? { ...emp, entry: entryTime } : emp
                        )
                    );
                }
            }
        })

    };


    const handleExitChange = (id, newExitTime) => {
        const { exitTime } = exitAllTime[newExitTime]

        changeTimeEmployee.forEach(changeTime => {

            if (changeTime.id === id) {

                if (exitTime === changeTime.entry) {
                    toast.error(`No puede tener la misma hora de entrada y salida de ${changeTime.name}!`, {
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });

                } else {
                    setEmployees(prev =>
                        prev.map(emp =>
                            emp.id === id ? { ...emp, exit: exitTime } : emp
                        )
                    );
                }

            }


        });

    };

    const handleChange = (id) => {
        //  console.log('id', id);
        changeTimeEmployee.forEach(changeTime => {

            if (changeTime.id === id) {
                setEmployees((prevEmployees) =>
                    prevEmployees.map((emp) =>
                        emp.id === id ? { ...emp, assist: !emp.assist } : emp
                    )
                );

                if (changeTime.assist) {
                    toast(`Falta ${changeTime.name} en ${changeTime.store}`)
                    saveInfo(`Falta ${changeTime.name} en ${changeTime.store}`, 'missingEmployee')
                }
            }
        });
    };


    const handleChangeDT = (id) => {

        changeTimeEmployee.forEach(changeDoubleShift => {

            if (changeDoubleShift.id === id) {
                setEmployees((prevEmployees) =>
                    prevEmployees.map((emp) =>
                        emp.id === id ? { ...emp, doubleShift: !emp.doubleShift, entry: 9, exit: 20 } : emp
                    )
                );

                console.log(changeDoubleShift.doubleShift);

                console.log(changeDoubleShift);

                if (changeDoubleShift.doubleShift) {

                    setEmployees((prevEmployees) =>
                        prevEmployees.map((emp) =>


                            emp.id === id ? { ...emp, doubleShift: emp.doubleShift, entry: employeeData[id].entry, exit: employeeData[id].exit } : emp
                        ))
                }
            }
        });
    }

    return (
        <section className='changeTimeContainer'>
            {changeTimeEmployee.map(((employee) => {
                return (
                    <div className="employeeContainer" key={employee.id}>
                        <Form.Label htmlFor="inputPassword5" className="employeeContainer_label">{employee.name}</Form.Label>

                        <section className="selectContainer">

                            <Form.Select
                                aria-label="Default select example"
                                disabled={!employee.assist}
                                value={employee.entry}
                                onChange={(e) => handleEntryChange(employee.id, parseFloat(e.target.value))}
                            >
                                <option>{formatHour(employee.entry)}</option>

                                {entryAllTime.map((time, i) => {
                                    return (
                                        <option key={i} value={i}>  {formatHour(time.entryTime)}
                                        </option>

                                    )
                                })}
                            </Form.Select>


                            <Form.Select
                                aria-label="Default select example"
                                disabled={!employee.assist}
                                value={employee.exit}
                                onChange={(e) => handleExitChange(employee.id, parseFloat(e.target.value))}
                            >
                                <option>{formatHour(employee.exit)}</option>

                                {exitAllTime.map((time, i) => {
                                    return (
                                        <option key={i} value={i}>{formatHour(time.exitTime)}</option>

                                    )
                                })}
                            </Form.Select>




                            <div className="checkBox">
                                <Form.Check
                                    type="checkbox"
                                    checked={employee.assist}
                                    onChange={() => handleChange(employee.id)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    checked={employee.doubleShift}
                                    onChange={() => handleChangeDT(employee.id)}
                                />
                            </div>
                        </section >
                    </div>
                )
            }))
            }

        </section>

    )
}

export default ChangeTime
