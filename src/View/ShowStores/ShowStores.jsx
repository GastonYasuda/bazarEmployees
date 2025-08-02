
import { useParams } from "react-router-dom";
import ShowByStore from "../../Component/ShowByStore/ShowByStore";
import { useContext, useEffect } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import BottomMenuBar from "../../Component/BottomMenuBar/BottomMenuBar";

const ShowStores = () => {

    const { espacioEmployees, puntoEmployees, ciudadEmployees } = useContext(apiEmployee)

    const { storeId } = useParams()

    // useEffect(() => {
    //     console.log(storeId);


    // }, [storeId])

    return (
        <div className="App">
            <div className="mainContainer">
                {espacioEmployees && storeId === 'espacio' && <ShowByStore store={espacioEmployees} />}

                {puntoEmployees && storeId === 'punto' && <ShowByStore store={puntoEmployees} />}
                {ciudadEmployees && storeId === 'ciudad' && <ShowByStore store={ciudadEmployees} />}
                <BottomMenuBar />
            </div>
        </div>
    );
};

export default ShowStores;
