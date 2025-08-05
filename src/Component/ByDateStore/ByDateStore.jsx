import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiEmployee } from '../../Context/EmployeeApiContext'
import ShowByStore from '../ShowByStore/ShowByStore'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import BottomMenuBar from '../BottomMenuBar/BottomMenuBar';


const ByDateStore = () => {

    const { byDateId } = useParams()
    const { mayPrimera, espacioEmployees, puntoEmployees, ciudadEmployees, espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees } = useContext(apiEmployee)


    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })

    useEffect(() => {


    }, [])

    return (
        <div className="App">
            <div className="mainContainer">

                <h1>{mayPrimera(myNewDateId)} {byDateId}</h1>

                {espacioEmployees.length !== 0 && puntoEmployees.length !== 0 && ciudadEmployees.length !== 0 &&

                    <section className='mainGraphicContainer'>
                        <Link to={`/${byDateId}/espacio`}>
                            <div className='showByStoreComponent'>
                                <h3>Espacio</h3>
                                <ScheduleGraphic employeeData={espacioEmployees} />
                            </div>
                        </Link>


                        <Link to={`/${byDateId}/punto`}>
                            <div className='showByStoreComponent'>
                                <h3>Punto</h3>
                                <ScheduleGraphic employeeData={puntoEmployees} />
                            </div>
                        </Link>


                        <Link to={`/${byDateId}/ciudad`}>
                            <div className='showByStoreComponent'>
                                <h3>Ciudad</h3>
                                <ScheduleGraphic employeeData={ciudadEmployees} />
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
