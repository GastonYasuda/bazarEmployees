import React, { useContext, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { Bounce, toast } from 'react-toastify';
import { apiEmployee } from "../../Context/EmployeeApiContext";



const ChangeTime = ({ changeTimeEmployee }) => {

    const { saveInfo, formatHour, setEmployees, entryAllTime, exitAllTime } = useContext(apiEmployee)

    useEffect(() => {
        console.log(changeTimeEmployee);



    }, [changeTimeEmployee])




    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]

        if (entryTime === changeTimeEmployee[id].exit) {
            toast.error(`No puede tener la misma hora de entrada y salida de ${changeTimeEmployee[id].name}!`, {
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
    };


    const handleExitChange = (id, newExitTime) => {
        const { exitTime } = exitAllTime[newExitTime]


        if (exitTime === changeTimeEmployee[id].entry) {
            toast.error(`No puede tener la misma hora de entrada y salida de ${changeTimeEmployee[id].name}!`, {
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

    };

    const handleChange = (id) => {
        console.log('PRUEBA', changeTimeEmployee[id]);
        console.log('asiste', changeTimeEmployee[id].assist);


        console.log('el id check', id);

        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === id ? { ...emp, assist: !emp.assist } : emp
            )
        );

        if (changeTimeEmployee[id].assist) {
            toast(`Falta ${changeTimeEmployee[id].name} en ${changeTimeEmployee[id].store}`)
            saveInfo(`Falta ${changeTimeEmployee[id].name} en ${changeTimeEmployee[id].store}`, 'missingEmployee')

        }
    };

    return (
        <>
            <h1>soy change time</h1>

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



                        </section >


                        <div className="checkBox">
                            <Form.Check
                                type="checkbox"
                                checked={employee.assist}
                                onChange={() => handleChange(employee.id)}
                            />
                        </div>
                    </div>
                )
            }))
            }

        </>

    )
}

export default ChangeTime
