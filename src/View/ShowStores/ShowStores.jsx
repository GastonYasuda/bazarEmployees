
import { useParams } from "react-router-dom";
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import BottomMenuBar from "../../Component/BottomMenuBar/BottomMenuBar";

const ShowStores = () => {

    const { espacioEmployees, puntoEmployees, ciudadEmployees, espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees } = useContext(apiEmployee)


    const { storeId } = useParams()


    return (
        <div className="App">
            <div className="mainContainer">

                {espacioEmployees.length !== 0 && puntoEmployees.length !== 0 && ciudadEmployees.length !== 0 &&

                    <>
                        {storeId === 'espacio' &&
                            <ShowByStore
                                store={storeId}
                                employee={espacioEmployees}
                                morningEmployee={espacioMorningEmployees}
                                afternoonEmployee={espacioAfternoonEmployees} />
                        }

                        {storeId === 'punto' &&
                            <ShowByStore
                                store={storeId}
                                employee={puntoEmployees}
                                morningEmployee={puntoMorningEmployees}
                                afternoonEmployee={puntoAfternoonEmployees} />
                        }

                        {storeId === 'ciudad' &&
                            <ShowByStore
                                store={storeId}
                                employee={ciudadEmployees}
                                morningEmployee={ciudadMorningEmployees}
                                afternoonEmployee={ciudadAfternoonEmployees} />
                        }
                    </>
                }
                <BottomMenuBar />
            </div>
        </div>
    );
};

export default ShowStores;
