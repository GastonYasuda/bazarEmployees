import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";

import ShiftList from '../ShiftList/ShiftList';
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';



const ShowByStore = ({ employee }) => {


    const { mayPrimera, employees } = useContext(apiEmployee)
    const { storeId, byDateId } = useParams()

    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })




    const saveDateInfo = () => {
        const txt =
            <div>
                TODAVÍA NO ANDA ESTA FUNCIÓN!<br />
                Pero se va a guardar la info de<br /><strong>{storeId}</strong> de la fecha <strong>{byDateId}</strong>
            </div>;

        toast(txt)

        const stored = localStorage.getItem(byDateId);
        const parsed = stored ? JSON.parse(stored) : {};

        const updatedEmployeeData = employees.map(e =>
            e.id === employees.id ? employee : e
        );



        localStorage.setItem(byDateId, JSON.stringify({
            ...parsed,
            employeeData: updatedEmployeeData
        }));

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

                <ChangeTime changeTimeEmployee={employee} date={byDateId} />
                {/* select con los diferentes horarios*/}

                <ShiftList />
                {/* texto con los que trabajan turno dia y tarde */}

            </div>

        </>
    )
}

export default ShowByStore
