import React from 'react'
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import CalendarNotification from '../../Component/CalendarNotification/CalendarNotification';



const CalendarContainer = () => {


    const { showMainCalendarNotification } = useContext(apiEmployee)
    return (
        <div className="App">


            <div className="mainContainer">

                {!showMainCalendarNotification &&

                    <CalendarNotification />
                }

            </div>


        </div >
    )
}

export default CalendarContainer
