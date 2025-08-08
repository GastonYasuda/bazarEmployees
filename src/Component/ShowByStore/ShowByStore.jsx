import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";

import ShiftList from '../ShiftList/ShiftList';
import { useContext, useEffect } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';



const ShowByStore = ({ employee }) => {


    const { mayPrimera, employees, employeeData } = useContext(apiEmployee)
    const { storeId, byDateId } = useParams()

    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })

    // useEffect(() => {
    //     console.log(employee);

    // }, [employee])



    const saveDateInfo = () => {
        const txt =
            <div>
                TODAVÍA NO ANDA ESTA FUNCIÓN!<br />
                Pero se va a guardar la info de<br /><strong>{storeId}</strong> de la fecha <strong>{byDateId}</strong>
            </div>;

        toast(txt)

        const updatedEmployeeData = employees.map(e =>
            e.id === employees.id ? employee : e
        );
        console.log('employeesssID', employees);

        localStorage.setItem(byDateId, JSON.stringify({ employeeData: updatedEmployeeData }));




    }

    return (
        <>
            <div className='showByStoreComponent'>


                <h3>{mayPrimera(storeId)}</h3>
                <h6>{mayPrimera(myNewDateId)} {byDateId}</h6>


                <button style={{ all: 'unset' }} onClick={() => { saveDateInfo() }}>
                    <div style={{ textAlign: 'right', fontSize: '1.8rem' }}>
                        <FaSave color="white" />
                    </div>
                </button>


                <ScheduleGraphic employeeData={employee} />

                <ChangeTime changeTimeEmployee={employee} />
                {/* select con los diferentes horarios*/}

                <ShiftList />
                {/* texto con los que trabajan turno dia y tarde */}

            </div>

        </>
    )
}

export default ShowByStore
