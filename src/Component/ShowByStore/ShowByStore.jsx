import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";

import ShiftList from '../ShiftList/ShiftList';
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';



const ShowByStore = ({ store, employee, morningEmployee, afternoonEmployee }) => {


    const { mayPrimera } = useContext(apiEmployee)

    return (
        <>
            <div className='showByStoreComponent'>


                <h3>{mayPrimera(store)}</h3>


                <ScheduleGraphic employeeData={employee} />

                <ChangeTime changeTimeEmployee={employee} />

                <ShiftList />

            </div>

        </>
    )
}

export default ShowByStore
