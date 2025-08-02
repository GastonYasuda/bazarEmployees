import { useContext, useEffect } from "react";
import { apiEmployee } from "../../Context/EmployeeApiContext";
import { Link, useParams } from "react-router-dom";



const BottomMenuBar = () => {

    const { storeId } = useParams()

    useEffect(() => {
        console.log(storeId);


    }, [storeId])




    return (
        <div className="bottonMenuContainer">
            <section className="bottomMenu">
                <div
                    style={{
                        transform: storeId === undefined ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación
                        opacity: storeId === undefined ? '1' : '.4',

                    }}>
                    <Link to={'/'}>
                        <img src="/calendarIcon.png" alt="Calendario Icon" />
                    </Link>
                </div>

                <div
                    style={{
                        transform: storeId === 'espacio' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación,
                        opacity: storeId === 'espacio' ? '1' : '.4',
                    }}>
                    <Link to='/espacio'>
                        <img src="/espacioIcon.png" alt="Espacio Icon" />
                    </Link>


                </div>



                <div
                    style={{
                        transform: storeId === 'ciudad' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación,
                        opacity: storeId === 'ciudad' ? '1' : '.4',
                    }}>
                    <Link to='/ciudad'>
                        <img src="/ciudadIcon.png" alt="Ciudad Icon" />
                    </Link>
                </div>


                <div
                    style={{
                        transform: storeId === 'punto' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación
                        opacity: storeId === 'punto' ? '1' : '.4',

                    }}>
                    <Link to={'/punto'}>
                        <img src="/puntoIcon.png" alt="Punto Icon" />
                    </Link>
                </div>


            </section>
        </div>
    )
}

export default BottomMenuBar
