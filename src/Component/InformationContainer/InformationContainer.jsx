import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const InformationContainer = ({ store, notAssist, shiftInformation }) => {

    useEffect(() => {
        if (shiftInformation) {

            console.log(shiftInformation);
        }

    }, [shiftInformation])


    return (
        <div>
            {(notAssist.length === 0 && shiftInformation === undefined) || (shiftInformation === '')
                ?
                < p > No hay notificacion para mostrar</p>
                :
                <>
                    {notAssist.map((dontAssist, i) => {
                        if (dontAssist.store === store) {
                            return (
                                <div key={i}>
                                    <p >No viene {dontAssist.name} de {dontAssist.entry} a {dontAssist.exit}</p>

                                </div>
                            )
                        }
                        return null;
                    })}
                    <p>{shiftInformation}</p>
                    <Link to={`/${store}`}>
                        Ir a la planilla de {store}
                    </Link>

                </>
            }

        </div >
    )
}

export default InformationContainer
