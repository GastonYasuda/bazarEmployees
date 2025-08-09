/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiEmployee } from '../../Context/EmployeeApiContext'
// import ShowByStore from '../ShowByStore/ShowByStore'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import BottomMenuBar from '../BottomMenuBar/BottomMenuBar';


const ByDateStore = () => {

    const { byDateId } = useParams()
    const { mayPrimera, espacioEmployees, employeesEspacioStored, puntoEmployees, employeesPuntoStored, ciudadEmployees, employeesCiudadStored, getLocalStoreInfoByDate } = useContext(apiEmployee)



    const [isStored, setIsStored] = useState(false)


    useEffect(() => {


        if (localStorage.length !== 0) {

            for (let i = 0; i < localStorage.length; i++) {

                if (localStorage.key(i) === byDateId) {
                    console.log('hay info de esa fecha');
                    getLocalStoreInfoByDate(byDateId)
                    setIsStored(true)
                }
            }

        } else {
            setIsStored(false)
        }

    }, []);





    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })


    return (
        <div className="App">
            <div className="mainContainer">

                <h1>{mayPrimera(myNewDateId)} {byDateId}</h1>

                {(
                    (espacioEmployees.length !== 0 && puntoEmployees.length !== 0 && ciudadEmployees.length !== 0) ||
                    (employeesEspacioStored.length !== 0 && employeesPuntoStored.length !== 0 && employeesCiudadStored.length !== 0)
                ) &&

                    <section className='mainGraphicContainer'>
                        <Link to={`/${byDateId}/espacio`}>
                            <div className='showByStoreComponent'>
                                <h3>Espacio</h3>
                                <ScheduleGraphic
                                    employeeData={isStored ? employeesEspacioStored : espacioEmployees}
                                />
                            </div>
                        </Link>


                        <Link to={`/${byDateId}/punto`}>
                            <div className='showByStoreComponent'>
                                <h3>Punto</h3>
                                <ScheduleGraphic
                                    employeeData={isStored ? employeesPuntoStored : puntoEmployees}
                                />
                            </div>
                        </Link>


                        <Link to={`/${byDateId}/ciudad`}>
                            <div className='showByStoreComponent'>
                                <h3>Ciudad</h3>
                                <ScheduleGraphic
                                    employeeData={isStored ? employeesCiudadStored : ciudadEmployees}
                                />
                            </div>

                        </Link>

                    </section>
                }

            </div>
            <BottomMenuBar />

        </div>
    )
}

export default ByDateStore
