import ChangeTime from '../ChangeTime/ChangeTime'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";
import { useContext, useEffect } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import ShiftList from '../ShiftList/ShiftList';



const ShowByStore = ({ store }) => {

    const { espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees } = useContext(apiEmployee)


    useEffect(() => {
        // console.log(store[0].store);
        // console.log('soy ShowByStore, y soy', puntoMorningEmployees);
        // console.log('manana espacio', espacioMorningEmployees);
        // console.log('manana punto', puntoMorningEmployees);
        // console.log('manana ciudad', ciudadMorningEmployees);





    }, [store, espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees])


    return (
        <div className='showByStoreComponent'>


            <h3>{store[0].store}</h3>





            <ScheduleGraphic employeeData={store} />

            <ChangeTime changeTimeEmployee={store} />

            <div>
                {
                    store[0].store === 'Espacio' &&
                    <ShiftList
                        morningEmployeeList={espacioMorningEmployees}
                        afternoonEmployeeList={espacioAfternoonEmployees}
                    />
                }
                {
                    store[0].store === 'Punto' &&
                    <ShiftList
                        morningEmployeeList={puntoMorningEmployees}
                        afternoonEmployeeList={puntoAfternoonEmployees}
                    />
                }
                {
                    store[0].store === 'Ciudad' &&
                    <ShiftList
                        morningEmployeeList={ciudadMorningEmployees}
                        afternoonEmployeeList={ciudadAfternoonEmployees}
                    />
                }

            </div>









        </div>
    )
}

export default ShowByStore
