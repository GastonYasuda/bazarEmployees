/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { Bounce, toast } from 'react-toastify';
import { apiEmployee } from "../../Context/EmployeeApiContext";



const ChangeTime = ({ pruebaEmployees, setPruebaEmployees }) => {

    const { saveInfo, formatHour, entryAllTime, exitAllTime, employeeData } = useContext(apiEmployee)


    useEffect(() => {


        if (pruebaEmployees.length !== 0) {

            console.log('pruebaEmployees', pruebaEmployees);
        }


    }, [])


    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]

        setPruebaEmployees((prevEmployees) =>
            prevEmployees.map((emp) => {
                if (emp.id !== id) return emp;

                // 🚫 validar que no sean iguales entrada y salida
                if (entryTime === emp.entry) {
                    toast.error(
                        `No puede tener la misma hora de entrada y salida de ${emp.name}!`,
                        {
                            position: "top-center",
                            autoClose: 6000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        }
                    );
                    return emp; // no lo modifico
                }

                // ✅ actualizo salida y calculo doubleShift en el mismo paso
                return {
                    ...emp,
                    entry: entryTime,
                    doubleShift: entryTime === 9 && emp.exit === 20,
                };
            })
        );




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
        const { exitTime } = exitAllTime[newExitTime];

        setPruebaEmployees((prevEmployees) =>
            prevEmployees.map((emp) => {
                if (emp.id !== id) return emp;

                // 🚫 validar que no sean iguales entrada y salida
                if (exitTime === emp.entry) {
                    toast.error(
                        `No puede tener la misma hora de entrada y salida de ${emp.name}!`,
                        {
                            position: "top-center",
                            autoClose: 6000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        }
                    );
                    return emp; // no lo modifico
                }

                // ✅ actualizo salida y calculo doubleShift en el mismo paso
                return {
                    ...emp,
                    exit: exitTime,
                    doubleShift: emp.entry === 9 && exitTime === 20,
                };
            })
        );
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

        //si entrada es 9 y salida es 20 doubleShift que sea true

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

                } else {

                }
            }
        });

    }





    const handleSubmit = (e, id) => {
        e.preventDefault();
        console.log('jola');


        const emp = pruebaEmployees.find((emp) => emp.id === id);
        console.log("Guardado:", emp.name, emp.cutStart, emp.cutEnd);
    };


    return (
        <section className='changeTimeContainer'>


            {
                pruebaEmployees.map(((employee) => {
                    return (

                        <div className="employeeContainer" key={employee.id}>
                            <section className='employeeContainer_info'>
                                <Form.Label className="employeeContainer_label">{employee.name}</Form.Label>

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

                            </section>

                            {employee.doubleShift &&
                                <section className='doubleShiftCutTime'>
                                    <Form key={employee.id} onSubmit={(e) => handleSubmit(e)}>

                                        <Form.Control
                                            placeholder="Cut Start"
                                            value={employee.cutStart || ""}
                                            onChange={(e) =>
                                                setPruebaEmployees((prev) =>
                                                    prev.map((emp) =>
                                                        emp.id === employee.id
                                                            ? { ...emp, cutStart: e.target.value }
                                                            : emp
                                                    )
                                                )
                                            }
                                        />

                                        <Form.Control
                                            placeholder="Cut End"
                                            value={employee.cutEnd || ""}
                                            onChange={(e) =>
                                                setPruebaEmployees((prev) =>
                                                    prev.map((emp) =>
                                                        emp.id === employee.id
                                                            ? { ...emp, cutEnd: e.target.value }
                                                            : emp
                                                    )
                                                )
                                            }
                                        />


                                    </Form>
                                </section>
                            }






                            {/* 
                            <>

                                <Modal show={showCutModal} >
                                    <Modal.Header>
                                        <Modal.Title>TODAVIA NO GUARDA DESDE ACA!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form key={employee.id} >
                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Cut Start"
                                                        value={employee.cutStart || ""}
                                                        onChange={(e) =>
                                                            setPruebaEmployees((prev) =>
                                                                prev.map((emp) =>
                                                                    emp.id === employee.id
                                                                        ? { ...emp, cutStart: e.target.value }
                                                                        : emp
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Cut End"
                                                        value={employee.cutEnd || ""}
                                                        onChange={(e) =>
                                                            setPruebaEmployees((prev) =>
                                                                prev.map((emp) =>
                                                                    emp.id === employee.id
                                                                        ? { ...emp, cutEnd: e.target.value }
                                                                        : emp
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleTest} >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </> */}


                        </div>
                    )
                }))
            }


        </section >
    )
}

export default ChangeTime
