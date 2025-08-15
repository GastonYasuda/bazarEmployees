/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { Bounce, toast } from 'react-toastify';
import { apiEmployee } from "../../Context/EmployeeApiContext";



const ChangeTime = ({ employeeByStore, pruebaEmployees, setPruebaEmployees }) => {

    const { saveInfo, formatHour, entryAllTime, exitAllTime, employeeData, employeesEspacioStored } = useContext(apiEmployee)

    useEffect(() => {

        if (pruebaEmployees.length !== 0) {

            console.log('pruebaEmployees changeTime', pruebaEmployees);
            console.log('employeeByStore changeTime', employeeByStore);//me trae la posta
            console.log('employeesEspacioStored changeTime', employeesEspacioStored);
        }

    }, [pruebaEmployees])


    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]

        pruebaEmployees.forEach(changeTime => {

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

                    setPruebaEmployees(prev =>
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

        pruebaEmployees.forEach(changeTime => {

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
                    setPruebaEmployees(prev =>
                        prev.map(emp =>
                            emp.id === id ? { ...emp, exit: exitTime } : emp
                        )
                    );
                    console.log('exit time es ', exitTime);
                }
            }
        });

    };

    const handleChange = (id) => {
        pruebaEmployees.forEach(changeTime => {

            if (changeTime.id === id) {
                setPruebaEmployees((prevEmployees) =>
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

        pruebaEmployees.forEach(changeDoubleShift => {

            if (changeDoubleShift.id === id) {
                setPruebaEmployees((prevEmployees) =>
                    prevEmployees.map((emp) =>
                        emp.id === id ? { ...emp, doubleShift: !emp.doubleShift, entry: 9, exit: 20 } : emp
                    )
                );


                if (changeDoubleShift.doubleShift) {

                    setPruebaEmployees((prevEmployees) =>
                        prevEmployees.map((emp) =>

                            emp.id === id ? { ...emp, doubleShift: emp.doubleShift, entry: employeeData[id].entry, exit: employeeData[id].exit } : emp
                        ))

                }
            }
        });
    }


    return (
        <section className='changeTimeContainer'>

            {
                pruebaEmployees.map(((employee) => {
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
