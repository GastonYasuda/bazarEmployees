import React from 'react'
import { Link } from 'react-router-dom'
import ScheduleGraphic from "../../Component/ScheduleGraphic/ScheduleGraphic";



const ShowByDateStoreGraphic = ({ byDateId, storedEmployee, state }) => {
    // useEffect(() => {
    //     console.log(storedEmployee);

    // }, [storedEmployee])


    return (
        <>
            {storedEmployee[0] !== undefined && (
                <>
                    {["espacio", "punto", "ciudad"].map((store) => (
                        storedEmployee[0].store === store && (
                            <section className="mainGraphicContainer" key={store}>
                                <Link to={`/${byDateId}/${store}`}>
                                    <div className="showByStoreComponent">
                                        <h3>{store.charAt(0).toUpperCase() + store.slice(1)}</h3>
                                        <ScheduleGraphic employeeData={storedEmployee} state={state} />
                                    </div>
                                </Link>
                            </section>
                        )
                    ))}
                </>
            )}
        </>
    )

}

export default ShowByDateStoreGraphic
