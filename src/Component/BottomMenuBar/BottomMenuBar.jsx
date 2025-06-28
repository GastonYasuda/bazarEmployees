import { useState } from "react";



const BottomMenuBar = ({ setShowEspacioStore, setShowCiudadStore, setShowPuntoStore, setShowMainCalendarNotification }) => {

    const [activeStore, setActiveStore] = useState(null);




    const handleShowStore = (storeId) => {
        setShowMainCalendarNotification(true)
        setActiveStore(storeId); // cambia el botón activo

        if (storeId === 'espacio') {
            setShowEspacioStore(true);
            setShowCiudadStore(false);
            setShowPuntoStore(false);

        } else if (storeId === 'ciudad') {
            setShowCiudadStore(true);
            setShowEspacioStore(false);
            setShowPuntoStore(false);
        } else if (storeId === 'punto') {
            setShowPuntoStore(true);
            setShowCiudadStore(false);
            setShowEspacioStore(false);
        }
    };

    const handleBack = () => {
        setShowMainCalendarNotification(false);
        setShowEspacioStore(false);
        setShowCiudadStore(false);
        setShowPuntoStore(false);
        setActiveStore('home')
    }


    return (
        <div className="bottonMenuContainer">
            <section className="bottomMenu">

                <div onClick={() => handleShowStore('espacio')}
                    style={{
                        transform: activeStore === 'espacio' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación,
                        opacity: activeStore === 'espacio' ? '1' : '.4',
                    }}>

                    <img src="/espacioIcon.png" alt="Espacio Icon" />

                </div>



                <div onClick={() => handleShowStore('ciudad')}
                    style={{
                        transform: activeStore === 'ciudad' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación,
                        opacity: activeStore === 'ciudad' ? '1' : '.4',
                    }}>
                    <img src="/ciudadIcon.png" alt="Ciudad Icon" />
                </div>


                <div onClick={() => handleShowStore('punto')}
                    style={{
                        transform: activeStore === 'punto' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación
                        opacity: activeStore === 'punto' ? '1' : '.4',

                    }}>
                    <img src="/puntoIcon.png" alt="Punto Icon" />
                </div>

                <div onClick={() => { handleBack() }}
                    style={{
                        transform: activeStore === 'home' ? 'scale(2.3)' : 'scale(1.8)',
                        transition: 'transform 0.6s ease', // suave animación
                        opacity: activeStore === 'home' ? '1' : '.4',

                    }}>
                    <img src="/calendarIcon.png" alt="Calendario Icon" />

                </div>
            </section>
        </div>
    )
}

export default BottomMenuBar
