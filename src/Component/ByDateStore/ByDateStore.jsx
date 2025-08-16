/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiEmployee } from '../../Context/EmployeeApiContext'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import BottomMenuBar from '../BottomMenuBar/BottomMenuBar';
import ShowByDateStoreGraphic from '../ShowByDateStoreGraphic/ShowByDateStoreGraphic';


const ByDateStore = () => {

    const { byDateId } = useParams()
    const { mayPrimera, employeesEspacioStored, employeesPuntoStored, espacioEmployees, ciudadEmployees, puntoEmployees, employeesCiudadStored, getLocalStoreInfoByDate } = useContext(apiEmployee)

    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })

    const [isStored, setIsStored] = useState(false)


    useEffect(() => {
        const exists = getLocalStoreInfoByDate(byDateId);

        if (exists) {
            setIsStored(true);

        } else {
            setIsStored(false);
            console.log('ciudadEmployees', ciudadEmployees);

        }
    }, []);

    return (
        <div className="App">
            <div className="mainContainer">

                <h1>{mayPrimera(myNewDateId)} {byDateId}</h1>
                {!isStored && espacioEmployees && puntoEmployees && ciudadEmployees &&
                    <>
                        <ShowByDateStoreGraphic byDateId={byDateId} storedEmployee={espacioEmployees} state={'byDateStore'} />

                        <ShowByDateStoreGraphic byDateId={byDateId} storedEmployee={puntoEmployees} state={'byDateStore'} />

                        <ShowByDateStoreGraphic byDateId={byDateId} storedEmployee={ciudadEmployees} state={'byDateStore'} />

                    </>}

                {isStored &&
                    <>
                        <section className='mainGraphicContainer'>
                            <Link to={`/${byDateId}/espacio`}>
                                <div className='showByStoreComponent'>
                                    <h3>Espacio</h3>
                                    <ScheduleGraphic employeeData={employeesEspacioStored} state={'byDateStore'} />
                                </div>
                            </Link>
                        </section>
                        <section className='mainGraphicContainer'>
                            <Link to={`/${byDateId}/punto`}>
                                <div className='showByStoreComponent'>
                                    <h3>Punto</h3>
                                    <ScheduleGraphic employeeData={employeesPuntoStored} state={'byDateStore'} />
                                </div>
                            </Link>
                        </section>
                        <section className='mainGraphicContainer'>
                            <Link to={`/${byDateId}/ciudad`}>
                                <div className='showByStoreComponent'>
                                    <h3>Ciudad</h3>
                                    <ScheduleGraphic employeeData={employeesCiudadStored} state={'byDateStore'} />
                                </div>
                            </Link>
                        </section>
                    </>
                }

            </div>
            <BottomMenuBar />

        </div>
    )
}

export default ByDateStore



// <section className='mainGraphicContainer'>
//     <Link to={`/${byDateId}/espacio`}>
//         <div className='showByStoreComponent'>
//             <h3>Espacio</h3>
//             {/* <ScheduleGraphic
//                 employeeData={isStored ? employeesEspacioStored : espacioEmployees}
//             /> */}
//             <ScheduleGraphic isStored={isStored} date={byDateId} employeeData={isStored ? employeesEspacioStored : espacioEmployees} from={'espacio'} />

//         </div>
//     </Link>


//     <Link to={`/${byDateId}/punto`}>
//         <div className='showByStoreComponent'>
//             <h3>Punto</h3>

//             <ScheduleGraphic isStored={isStored} date={byDateId} employeeData={isStored ? employeesPuntoStored : puntoEmployees} from={'punto'} />

//         </div>
//     </Link>


//     <Link to={`/${byDateId}/ciudad`}>
//         <div className='showByStoreComponent'>
//             <h3>Ciudad</h3>

//             <ScheduleGraphic isStored={isStored} date={byDateId} employeeData={isStored ? employeesCiudadStored : ciudadEmployees} from={'ciudad'} />


//         </div>

//     </Link>

// </section>
