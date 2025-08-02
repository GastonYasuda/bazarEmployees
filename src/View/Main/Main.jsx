// eslint-disable-next-line no-unused-vars
// import Swal from 'sweetalert2'
import { Bounce, ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import CalendarNotification from '../../Component/CalendarNotification/CalendarNotification';
// import NotificationButton from '../../Component/NotificationButton/NotificationButton';

const Main = () => {


    const { showMainCalendarNotification } = useContext(apiEmployee)


    return (
        <div className="App">


            <div className="mainContainer">

                {/* <NotificationButton /> */}



                {!showMainCalendarNotification &&

                    <CalendarNotification />
                }

            </div>






            <ToastContainer
                className='toastMyStyle'
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />


        </div >
    )
};

export default Main;
