/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom";
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import BottomMenuBar from "../../Component/BottomMenuBar/BottomMenuBar";
import { Bounce, ToastContainer } from 'react-toastify';


const ShowStores = () => {

    const { espacioEmployees, puntoEmployees, ciudadEmployees } = useContext(apiEmployee)


    const { storeId } = useParams()


    return (
        <div className="App">
            <div className="mainContainer">

                {espacioEmployees.length !== 0 && puntoEmployees.length !== 0 && ciudadEmployees.length !== 0 &&

                    <>
                        {storeId === 'espacio' &&
                            <ShowByStore
                                employee={espacioEmployees}
                            />
                        }

                        {storeId === 'punto' &&
                            <ShowByStore
                                employee={puntoEmployees}
                            />
                        }

                        {storeId === 'ciudad' &&
                            <ShowByStore
                                employee={ciudadEmployees}
                            />
                        }
                    </>
                }
                <BottomMenuBar />

                <ToastContainer
                    className='toastMyStyle'
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
        </div>
    );
};

export default ShowStores;
