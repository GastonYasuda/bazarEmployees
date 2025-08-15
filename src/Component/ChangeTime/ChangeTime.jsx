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


    // const doubleShiftToday = (who) => {

    //     employees.forEach(employee => {
    //         if (employee.name === who) {
    //             // console.log(`Hola! soy ${employee.name}`);

    //             setPruebaEmployees(prev =>
    //                 prev.map(emp =>
    //                     emp.name === who ? { ...emp, entry: 9, exit: 20, doubleShift: true } : emp
    //                 )
    //             );
    //         }
    //     });

    // }


    // useEffect(() => {

    //     //Mely hace doble siempre
    //     // doubleShiftToday('Mely')

    //     // console.log('pruebaEmployees', pruebaEmployees);//me tiene que traer la nueva info, la misma que tiene schedule



    // }, [])


    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]
        // console.log('dentro de habldeEntryChange');


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
        // console.log('pruebaEmployees changeTime', pruebaEmployees);
        // console.log('employeeByStore changeTime', employeeByStore);

    };


    const handleExitChange = (id, newExitTime) => {
        const { exitTime } = exitAllTime[newExitTime]
        // console.log('dentro de handleExitChange');


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



                    // const stored = localStorage.getItem(byDateId);
                    // const parsed = stored ? JSON.parse(stored) : {};

                    // const updatedEmployeeData = employees.map(e =>
                    //     e.id === employees.id ? employee : e
                    // );



                    // localStorage.setItem(byDateId, JSON.stringify({
                    //     ...parsed,
                    //     employeeData: updatedEmployeeData
                    // }));


                }


            }


        });

    };

    const handleChange = (id) => {
        //  console.log('id', id);
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

    // pruebaEmployeesModificado
    // searchStore

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
