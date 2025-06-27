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
        setActiveStore(null)
    }


    return (
        <div className="bottomMenu">
            <button onClick={() => handleShowStore('espacio')}
                style={{ backgroundColor: activeStore === 'espacio' ? '#007bff' : 'white', color: activeStore === 'espacio' ? 'white' : 'black' }}>

                <img src="/logoEspacio.png" alt="Logo Espacio" />

            </button>



            <button onClick={() => handleShowStore('ciudad')}
                style={{ backgroundColor: activeStore === 'ciudad' ? '#007bff' : 'white', color: activeStore === 'ciudad' ? 'white' : 'black' }}>
                <img src="/logoCiudad.png" alt="Logo Ciudad" />
            </button>


            <button onClick={() => handleShowStore('punto')}
                style={{ backgroundColor: activeStore === 'punto' ? '#007bff' : 'white', color: activeStore === 'punto' ? 'white' : 'black' }}>
                <img src="/logoPunto.png" alt="Logo Punto" />
            </button>

            <button onClick={() => { handleBack() }}>Home</button>
        </div>
    )
}

export default BottomMenuBar
