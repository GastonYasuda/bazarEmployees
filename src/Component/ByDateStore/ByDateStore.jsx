/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiEmployee } from '../../Context/EmployeeApiContext'
// import ShowByStore from '../ShowByStore/ShowByStore'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import BottomMenuBar from '../BottomMenuBar/BottomMenuBar';


const ByDateStore = () => {

    const { byDateId } = useParams()
    const { employees, mayPrimera, espacioEmployees, employeesEspacioStored, puntoEmployees, employeesPuntoStored, ciudadEmployees, employeesCiudadStored, getLocalStoreInfoByDate } = useContext(apiEmployee)

    const [isStored, setIsStored] = useState(false)


    useEffect(() => {
        // console.log('1 arranco');
        // console.log('ciudadEmployees', ciudadEmployees);

        const exists = getLocalStoreInfoByDate(byDateId);

        if (exists) {
            setIsStored(true);
            // console.log(`estoy guardado con fecha ${byDateId}`);
        } else {
            setIsStored(false);
            console.log('ciudadEmployees', ciudadEmployees);
            // console.log(`seleccionaste ${byDateId} NO HAY NADA`);
        }
    }, []);





    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })


    return (
        <div className="App">
            <div className="mainContainer">

                <h1>{mayPrimera(myNewDateId)} {byDateId}</h1>


                {isStored ? <h1>HAY GUARDADO</h1> : <h5>no hay nada</h5>}
                {isStored &&
                    <section className='mainGraphicContainer'>
                        <Link to={`/${byDateId}/espacio`}>
                            <div className='showByStoreComponent'>
                                <h3>Espacio</h3>
                                <ScheduleGraphic employeeData={employeesEspacioStored} state={'byDateStore'} />


                                {/* 
                                <ScheduleGraphic isStored={isStored} date={byDateId} employeeData={isStored ? employeesEspacioStored : espacioEmployees} from={'espacio'} /> */}

                            </div>
                        </Link>
                    </section>}


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
