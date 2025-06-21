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
        { id: 1, name: "Mely", entry: entryAllTime[0].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Espacio" }, //medio turno
        { id: 2, name: "Luca", entry: entryAllTime[0].entryTime, exit: exitAllTime[2].exitTime, assist: true, store: "Espacio" }, //cubre almuerzo
        { id: 3, name: "Ori", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "Espacio" }, //Luca
        { id: 4, name: "Anto", entry: entryAllTime[0].entryTime, exit: exitAllTime[0].exitTime, assist: true, store: "Espacio" }, // Mely cubre almuerzo Luca
        { id: 5, name: "Dari", entry: entryAllTime[2].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Espacio" }, //doble turno
        { id: 6, name: "Jorge", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Espacio" }, //Dari cuando Anto hace doble turno
        { id: 7, name: "Belen", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Punto" }, //Dari cuando Anto hace doble turno
        { id: 8, name: "Jenn", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Punto" }, //Dari cuando Anto hace doble turno
        { id: 9, name: "Orne", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Punto" }, //Dari cuando Anto hace doble turno
        { id: 10, name: "Thian", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Ciudad" }, //Dari cuando Anto hace doble turno
        { id: 11, name: "Ari", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Ciudad" }, //Dari cuando Anto hace doble turno
        { id: 12, name: "Luz", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Ciudad" }, //Dari cuando Anto hace doble turno
        { id: 13, name: "Mili", entry: entryAllTime[3].entryTime, exit: exitAllTime[3].exitTime, assist: true, store: "Ciudad" }, //Dari cuando Anto hace doble turno

    ]

    const [employees, setEmployees] = useState(employeeData);

    const [espacioMorningEmployees, setEspacioMorningEmployees] = useState([])
    const [espacioAfternoonEmployees, setEspacioAfternoonEmployees] = useState([])

    const [espacioEmployees, setEspacioEmployees] = useState([])
    const [puntoEmployees, setPuntoEmployees] = useState([])
    const [ciudadEmployees, setCiudadEmployees] = useState([])

    useEffect(() => {
        searchStoreEmployee("Espacio")
        searchStoreEmployee("Punto")
        searchStoreEmployee("Ciudad")

        console.log(puntoEmployees);
        console.log(ciudadEmployees);

        // console.log(espacioEmployees);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees])

    const searchStoreEmployee = (state) => {
        const byStore = employees.filter((employee) => employee.store === state)
        if (state === "Espacio") {
            // console.log("Espacio", byStore);
            setEspacioEmployees(byStore)
            morningShift(byStore)
            afternoonShift(byStore)
        } else if (state === "Punto") {
            // console.log("Punto", byStore);
            setPuntoEmployees(byStore)
        } else if (state === "Ciudad") {
            // console.log("Ciudad", byStore);
            setCiudadEmployees(byStore)

        }
    }


    const morningShift = (data) => {
        const morning = data.filter((employee) => employee.entry === 9 && employee.assist === true);
        setEspacioMorningEmployees(morning);
    }


    const afternoonShift = (data) => {
        const afternoon = data.filter((employee) => employee.exit === 20 && employee.assist === true);
        setEspacioAfternoonEmployees(afternoon)


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
        console.log('PRUEBA', espacioEmployees[id]);

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

                {/* aca hacer un componente con todo lo que hay abajo, para poder ponerlos por store */}
                {espacioEmployees.map(((employee) => {
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


                <ShiftList employeeList={espacioMorningEmployees} shift={'Manana'} />

                <ShiftList employeeList={espacioAfternoonEmployees} shift={'Tarde'} />

                {/* <ShiftList employeeList={espacioEmployees} shift={'Tarde'} /> */}









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
