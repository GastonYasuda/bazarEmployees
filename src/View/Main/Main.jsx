// eslint-disable-next-line no-unused-vars
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import CalendarNotification from '../../Component/CalendarNotification/CalendarNotification';
import NotificationButton from '../../Component/NotificationButton/NotificationButton';


const Main = () => {


    const { showMainCalendarNotification } = useContext(apiEmployee)


    return (
        <div className="App">


            <div className="mainContainer">

                <NotificationButton />



                {!showMainCalendarNotification &&

                    <CalendarNotification />
                }

            </div>


        </div >
    )
};

export default Main;
