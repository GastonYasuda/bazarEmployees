import { Link } from 'react-router-dom';

const InformationContainer = ({ store, notAssist }) => {


    return (
        <div>
            {notAssist.length === 0 ?
                <p>No hay notificacion para mostrar</p>
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
                    <Link to={`/${store}`}>
                        Ir a la planilla de {store}
                    </Link>

                </>
            }

        </div>
    )
}

export default InformationContainer
