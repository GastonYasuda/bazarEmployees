import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Button, Form } from "react-bootstrap";
// import Swal from 'sweetalert2'
import ShiftList from "../../Component/ShiftList/ShiftList";




const Main = () => {




    const entryAllTime = [
        { id: 1, entryTime: 9 },
        { id: 2, entryTime: 13.30 },
        { id: 3, entryTime: 14.30 },
        { id: 4, entryTime: 16 }
    ]

    const exitAllTime = [
        { id: 1, exitTime: 14.30 },
        { id: 2, exitTime: 15.30 },
        { id: 3, exitTime: 16 },
        { id: 4, exitTime: 20 }
    ]

    const employeeData = [
        { id: 1, name: "Mely", entry: entryAllTime[0].entryTime, exit: exitAllTime[3].exitTime, assist: true }, //medio turno
        { id: 2, name: "Luca", entry: entryAllTime[0].entryTime, exit: exitAllTime[2].exitTime, assist: true }, //cubre almuerzo
        { id: 3, name: "Ori", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true }, //Luca
        { id: 4, name: "Anto", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true }, // Mely cubre almuerzo Luca
        { id: 5, name: "Dari", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true }, //doble turno
        { id: 6, name: "Jorge", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true }, //Dari cuando Anto hace doble turno
    ]

    const [employees, setEmployees] = useState(employeeData);
    const [morningEmployees, setMorningEmployees] = useState([])
    const [afternoonEmployees, setAfternoonEmployees] = useState([])






    useEffect(() => {
        morningShift()
        afternoonShift()
        //console.log(employees);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees])


    const morningShift = () => {
        const morning = employees.filter((employee) => employee.entry === 9 && employee.assist === true);
        //console.log('manana', morning);
        setMorningEmployees(morning)

        employees.forEach(employee => {

            if (morning.length !== 4) {

                // Swal.fire({
                //     title: 'Falta uno a la manana!',
                //     text: 'Que hacemo?',
                //     icon: 'error',
                //     confirmButtonText: 'Ok'
                // })
            } else {
                return true
            }
        });

    }


    const afternoonShift = () => {
        const afternoon = employees.filter((employee) => employee.exit === 20 && employee.assist === true);
        // console.log('tarde', afternoon);
        setAfternoonEmployees(afternoon)

        employees.forEach(employee => {
            if (afternoon.length !== 3 || employee.assist === false) {
                // Swal.fire({
                //     title: 'Falta uno a la tarde!',
                //     text: 'Que hacemo?',
                //     icon: 'error',
                //     confirmButtonText: 'Ok!'
                // })
            } else {
                return true
            }
        })
    }

    const handleEntryChange = (id, newEntryTime) => {
        const { entryTime } = entryAllTime[newEntryTime]

        setEmployees(prev =>
            prev.map(emp =>
                emp.id === id ? { ...emp, entry: entryTime } : emp
            )
        );
    };


    const handleExitChange = (id, newExitTime) => {
        const { exitTime } = exitAllTime[newExitTime]

        setEmployees(prev =>
            prev.map(emp =>
                emp.id === id ? { ...emp, exit: exitTime } : emp
            )
        );
    };

    const handleChange = (id) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === id ? { ...emp, assist: !emp.assist } : emp
            )
        );
    };






    return (
        <div className="App">
            <header className="App-header">


            </header>
            <div className="mainContainer">
                {employees.map(((employee) => {
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
                                    <option>{employee.entry}</option>

                                    {entryAllTime.map((time, i) => {
                                        return (
                                            <option key={i} value={i}>{time.entryTime}</option>

                                        )
                                    })}
                                </Form.Select>


                                <Form.Select
                                    aria-label="Default select example"
                                    disabled={!employee.assist}
                                    value={employee.exit}
                                    onChange={(e) => handleExitChange(employee.id, parseFloat(e.target.value))}
                                >
                                    <option>{employee.exit}</option>

                                    {exitAllTime.map((time, i) => {
                                        return (
                                            <option key={i} value={i}>{time.exitTime}</option>

                                        )
                                    })}
                                </Form.Select>



                            </section>


                            <div className="checkBox">
                                <Form.Check
                                    type="checkbox"
                                    checked={employee.assist}
                                    onChange={() => handleChange(employee.id)}
                                    aria-label="option 2"
                                />
                            </div>






                        </div>
                    )
                }))}

                <br />
                <br />
                {/* <Button variant="primary">Cargar</Button> */}
                <br />
                <br />


                <ShiftList employeeList={morningEmployees} shift={'Manana'} />

                <ShiftList employeeList={afternoonEmployees} shift={'Tarde'} />








                <br />
                <br />

                <div style={{ width: '80%' }}>
                    **El que no esta tildado, que quede deshabilitado, y abajo este la persona seleccionada con su horario
                    <br /><br />
                    **Cuando se destilda uno que salga un popup con las opciones disponibles.
                    <br /><br />
                    **Tiene que haber un boton que guarde y actualice los cambios

                </div>
            </div>


        </div>
    )
};

export default Main;
