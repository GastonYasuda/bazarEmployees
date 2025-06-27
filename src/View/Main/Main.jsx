// eslint-disable-next-line no-unused-vars
// import Swal from 'sweetalert2'
import { Bounce, ToastContainer } from 'react-toastify';
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext, useState } from 'react';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import BottomMenuBar from '../../Component/BottomMenuBar/BottomMenuBar';

const Main = () => {

    const { espacioEmployees, puntoEmployees, ciudadEmployees } = useContext(apiEmployee)

    const [showEspacioStore, setShowEspacioStore] = useState(false)
    const [showPuntoStore, setShowPuntoStore] = useState(false)
    const [showCiudadStore, setShowCiudadStore] = useState(false)
    const [showMainCalendarNotification, setShowMainCalendarNotification] = useState(false)



    return (
        <div className="App">
            <header className="App-header">

            </header>

            <div className="mainContainer">





                {espacioEmployees && puntoEmployees && ciudadEmployees &&
                    <>
                        {showEspacioStore && <ShowByStore store={espacioEmployees} />}
                        {showPuntoStore && <ShowByStore store={puntoEmployees} />}
                        {showCiudadStore && <ShowByStore store={ciudadEmployees} />}


                    </>
                }



                {!showMainCalendarNotification &&

                    <div>
                        aca van las notificaciones y calendario
                    </div>
                }










            </div>
            <BottomMenuBar
                setShowEspacioStore={setShowEspacioStore}
                setShowPuntoStore={setShowPuntoStore}
                setShowCiudadStore={setShowCiudadStore}
                setShowMainCalendarNotification={setShowMainCalendarNotification}
            />

            <ToastContainer
                position="top-center"
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


        </div>
    )
};

export default Main;
