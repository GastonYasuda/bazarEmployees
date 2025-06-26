import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import { useContext, useEffect } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';



const ShowByStore = ({ store }) => {


    useEffect(() => {
        console.log(store);

    }, [store])


    return (
        <div>
            {/* <ShiftList
                    morningEmployeeList={espacioMorningEmployees}
                    afternoonEmployeeList={espacioAfternoonEmployees}
                /> */}




            <ScheduleGraphic employeeData={store} />

            <ChangeTime changeTimeEmployee={store} />









        </div>
    )
}

export default ShowByStore
