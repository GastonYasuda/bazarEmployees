import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";

import ShiftList from '../ShiftList/ShiftList';
import { useContext, useEffect, useState } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';



const ShowByStore = ({ employeeByStore, isStored, date, setIsStored }) => {

    //el problema es cuando employee viene del store


    const { mayPrimera, employees, getLocalStoreInfoByDate, guardados } = useContext(apiEmployee)
    const { storeId } = useParams()

    const [guardoDatoDelStoreParaMostrar, setGuardoDatoDelStoreParaMostrar] = useState([])
    const [pruebaEmployees, setPruebaEmployees] = useState([])



    const traigoGuardadoConDiaStore = () => {


        const byStore = guardados.employeeData.filter((employee) => employee.store === storeId)
        setPruebaEmployees(byStore)

    }



    useEffect(() => {
        if (pruebaEmployees.length !== 0) {

            console.log("pruebaEmployees showByStore", pruebaEmployees);
        }
        const byStore = employees.filter((employee) => employee.store === storeId)

        setPruebaEmployees(byStore)

        traigoGuardadoConDiaStore()

    }, [])

    const myNewDateId = new Date(date).toLocaleDateString("es-ES", { weekday: "long" })


    //TENGO QUE TRAER INFO DE ARRIBA

    const saveDateInfo = () => {
        const txt =
            <div>
                TODAVÍA NO ANDA ESTA FUNCIÓN!<br />
                Pero se va a guardar la info de<br /><strong>{storeId}</strong> de la fecha <strong>{date}</strong>
            </div>;

        toast(txt)


        const stored = localStorage.getItem(date);
        const parsed = stored ? JSON.parse(stored) : {};

        let updatedEmployeeData;

        if (stored) {
            console.log('1 estoy guardado');
            //tengo que guardar todo aca!!!
            console.log(parsed);

            const currentEmployees = parsed.employeeData || [];
            updatedEmployeeData = currentEmployees.map(e => {
                const updated = pruebaEmployees.find(p => p.id === e.id);
                return updated ? updated : e;
            });


        } else {
            // updatedEmployeeData = pruebaEmployees;
            updatedEmployeeData = employees.map(e => {
                const updated = pruebaEmployees.find(p => p.id === e.id);
                return updated ? updated : e;
            });

            // const updated = pruebaEmployees.find(p => p.id === e.id);
            // console.log(updated);

            console.log('1 NO ESTOY GUARDADO');

        }


        // const stored = localStorage.getItem(date);
        // const parsed = stored ? JSON.parse(stored) : {};

        // // const updatedEmployeeData = employees.map(e =>
        // //     e.id === employees.id ? employee : e
        // // );       


        // if (!stored) {
        //     // Si no existe, creo un array nuevo con pruebaEmployees
        //     //tengo que guardar todo aca!!!
        //     updatedEmployeeData = pruebaEmployees;

        // } else {
        //     // Si existe, reemplazo coincidencias
        //     const currentEmployees = parsed.employeeData || [];
        //     updatedEmployeeData = currentEmployees.map(e => {
        //         const updated = pruebaEmployees.find(p => p.id === e.id);
        //         return updated ? updated : e;
        //     });
        // }




        localStorage.setItem(date, JSON.stringify({
            ...parsed,
            employeeData: updatedEmployeeData
        }));


        // let updatedEmployeeData;

        // if (!stored) {
        //     // Si no existe, creo un array nuevo con pruebaEmployees
        //     updatedEmployeeData = pruebaEmployees;
        // } else {
        //     // Si existe, reemplazo coincidencias
        //     const currentEmployees = parsed.employeeData || [];
        //     updatedEmployeeData = currentEmployees.map(e => {
        //         const updated = pruebaEmployees.find(p => p.id === e.id);
        //         return updated ? updated : e;
        //     });
        // }

        // localStorage.setItem(
        //     date,
        //     JSON.stringify({
        //         ...parsed,
        //         employeeData: updatedEmployeeData
        //     })
        // );

        getLocalStoreInfoByDate(date)
    }




    return (
        <>
            <div className='showByStoreComponent'>


                <h3>{mayPrimera(storeId)}</h3>
                <h6>{mayPrimera(myNewDateId)} {date}</h6>


                <button style={{ all: 'unset' }} onClick={() => { saveDateInfo() }}>
                    <div style={{ textAlign: 'right', fontSize: '1.8rem' }}>
                        <FaSave color="white" />
                    </div>
                </button>

                {/* <ScheduleGraphic employeeData={isStored ? employeeByStore : pruebaEmployees} /> */}
                {/* me muestra lo que tengo guardado */}
                <ScheduleGraphic isStored={isStored} date={date}
                    employeeByStore={employeeByStore}
                    employeeData={pruebaEmployees} guardoDatoDelStoreParaMostrar={guardoDatoDelStoreParaMostrar} from={''} state={'showByStore'} />


                {/* <ScheduleGraphic isStored={isStored} date={date} employeeData={pruebaEmployees} from={''} /> */}
                {/* me muestra lo que se va modificando ahora */}


                {/* el problema es que cuando esta guardado solamente me muestra lo del storage, pero no me muestra lo del momento */}

                <ChangeTime
                    employeeByStore={employeeByStore}
                    pruebaEmployees={pruebaEmployees}
                    setPruebaEmployees={setPruebaEmployees}
                />

                {/* <ChangeTime
                    pruebaEmployees={pruebaEmployees}
                    guardadosEmployeeData={guardados.employeeData}
                    employeeByStore={employeeByStore}
                    setPruebaEmployees={setPruebaEmployees} /> */}


                {/* select con los diferentes horarios*/}

                {/* <ShiftList employeeData={isStored ? employeeByStore : pruebaEmployees} /> */}
                {/* texto con los que trabajan turno dia y tarde */}

            </div>

        </>
    )
}

export default ShowByStore
