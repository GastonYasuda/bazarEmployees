import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";

import ShiftList from '../ShiftList/ShiftList';
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';



const ShowByStore = ({ employee, morningEmployee, afternoonEmployee }) => {


    const { mayPrimera } = useContext(apiEmployee)
    const { storeId, byDateId } = useParams()

    const myNewDateId = new Date(byDateId).toLocaleDateString("es-ES", { weekday: "long" })


    return (
        <>
            <div className='showByStoreComponent'>


                <h3>{mayPrimera(storeId)}</h3>
                <h6>{mayPrimera(myNewDateId)} {byDateId}</h6>


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
