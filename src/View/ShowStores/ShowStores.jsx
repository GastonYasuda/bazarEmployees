/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom";
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext, useEffect, useState } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import BottomMenuBar from "../../Component/BottomMenuBar/BottomMenuBar";
import { Bounce, ToastContainer } from 'react-toastify';


const ShowStores = () => {

    const { getLocalStoreInfoByDate, employeesEspacioStored, employeesPuntoStored, employeesCiudadStored } = useContext(apiEmployee)

    const { byDateId, storeId } = useParams()
    const [isStored, setIsStored] = useState(false)

    useEffect(() => {

        getLocalStoreInfoByDate(byDateId)

        const exists = getLocalStoreInfoByDate(byDateId);

        if (exists) {
            setIsStored(true);
        } else {
            setIsStored(false);
        }

    }, [byDateId]);


    return (
        <div className="App">
            <div className="mainContainer">
                {isStored && storeId === 'espacio' &&
                    <ShowByStore
                        date={byDateId}
                        isStored={isStored}
                        employeeByStore={employeesEspacioStored}
                    />
                }
                {isStored && storeId === 'punto' &&
                    <ShowByStore
                        date={byDateId}
                        isStored={isStored}
                        employeeByStore={employeesPuntoStored}
                    />
                }
                {isStored && storeId === 'ciudad' &&
                    <ShowByStore
                        date={byDateId}
                        isStored={isStored}
                        employeeByStore={employeesCiudadStored}
                    />
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

