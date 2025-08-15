/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom";
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext, useEffect, useState } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import BottomMenuBar from "../../Component/BottomMenuBar/BottomMenuBar";
import { Bounce, ToastContainer } from 'react-toastify';


const ShowStores = () => {

    const { espacioEmployees, puntoEmployees, ciudadEmployees, getLocalStoreInfoByDate, employeesEspacioStored, employeesPuntoStored, employeesCiudadStored, employees } = useContext(apiEmployee)


    const { storeId, byDateId } = useParams()


    const [isStored, setIsStored] = useState(false)



    useEffect(() => {

        getLocalStoreInfoByDate(byDateId)

        const exists = getLocalStoreInfoByDate(byDateId);

        if (exists) {
            setIsStored(true);
            // console.log('employeesCiudadStored', employeesCiudadStored);

            // console.log(`estoy guardado con fecha ${byDateId}`);
        } else {
            setIsStored(false);
            // console.log(`seleccionaste ${byDateId} NO HAY NADA`);
        }



    }, [byDateId]);


    return (
        <div className="App">
            <div className="mainContainer">

                {isStored ? <h1>HAY GUARDADO</h1> : <h5>no tengo nada</h5>}
                {isStored &&
                    <ShowByStore
                        date={byDateId}
                        isStored={isStored}
                        employeeByStore={employeesEspacioStored}

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


//   <>
//                     {storeId === 'espacio' &&
//                         <>
//                             <ShowByStore
//                                 date={byDateId}
//                                 isStored={isStored}
//                                 employeeByStore={isStored ? employeesEspacioStored : espacioEmployees}
//                                 pruebaEmployees={pruebaEmployees} setPruebaEmployees={setPruebaEmployees}
//                             />

//                         </>

//                     }

//                     {storeId === 'punto' &&
//                         <ShowByStore date={byDateId} isStored={isStored}
//                             employeeByStore={isStored ? employeesPuntoStored : puntoEmployees}
//                             pruebaEmployees={pruebaEmployees} setPruebaEmployees={setPruebaEmployees}

//                         />
//                     }

//                     {storeId === 'ciudad' &&
//                         <ShowByStore date={byDateId} isStored={isStored}
//                             employeeByStore={isStored ? employeesCiudadStored : ciudadEmployees}
//                             pruebaEmployees={pruebaEmployees} setPruebaEmployees={setPruebaEmployees}

//                         />
//                     }
//                 </>

