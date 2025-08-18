/* eslint-disable react-hooks/exhaustive-deps */
import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import { useContext, useEffect, useState } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';



const ShowByStore = ({ employeeByStore, isStored, date }) => {

    const { mayPrimera, employees, getLocalStoreInfoByDate, guardados } = useContext(apiEmployee)
    const { storeId } = useParams()
    const [pruebaEmployees, setPruebaEmployees] = useState([])

    const myNewDateId = new Date(date).toLocaleDateString("es-ES", { weekday: "long" })


    useEffect(() => {
        //    console.log(pruebaEmployees);


        if (!isStored) {
            const byStore = employees.filter((employee) => employee.store === storeId)

            setPruebaEmployees(byStore)
        } else {
            traigoGuardadoConDiaStore()//me trae el dato que tiene guardado
        }


    }, [])

    const traigoGuardadoConDiaStore = () => {
        const byStore = guardados.employeeData.filter((employee) => employee.store === storeId)
        setPruebaEmployees(byStore)
    }


    const saveDateInfo = () => {
        const txt =
            <div>
                Se guardo la modificación de<br /><strong>{storeId}</strong> de la fecha <strong>{date}</strong>
            </div>;

        toast(txt)


        const stored = localStorage.getItem(date);
        const parsed = stored ? JSON.parse(stored) : {};

        let updatedEmployeeData;

        if (stored) {

            const currentEmployees = parsed.employeeData || [];
            updatedEmployeeData = currentEmployees.map(e => {
                const updated = pruebaEmployees.find(p => p.id === e.id);
                return updated ? updated : e;
            });


        } else {
            updatedEmployeeData = employees.map(e => {
                const updated = pruebaEmployees.find(p => p.id === e.id);
                return updated ? updated : e;
            });
        }


        localStorage.setItem(date, JSON.stringify({
            ...parsed,
            employeeData: updatedEmployeeData
        }));

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


                <ScheduleGraphic isStored={isStored} date={date}
                    employeeByStore={employeeByStore}
                    employeeData={pruebaEmployees} from={''} state={'showByStore'} />


                <ChangeTime
                    pruebaEmployees={pruebaEmployees}
                    setPruebaEmployees={setPruebaEmployees} />

            </div>

        </>
    )
}

export default ShowByStore
