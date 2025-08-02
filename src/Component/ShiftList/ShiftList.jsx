/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';


const ShiftList = () => {

    const { saveInfo, espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees } = useContext(apiEmployee)
    const { storeId } = useParams()

    useEffect(() => {
        traspasoTurnos(espacioMorningEmployees, espacioAfternoonEmployees)
    }, [espacioMorningEmployees])


    const traspasoTurnos = (morningEmployees, afternoonEmployees) => {



        const shiftFix = morningEmployees
            .map((morningEmployee) => {
                const match = afternoonEmployees.find(
                    (afternoonEmployee) => morningEmployee.exit === afternoonEmployee.entry
                );


                if (match) {
                    return {
                        from: morningEmployee.name,
                        to: match.name,
                        time: morningEmployee.exit,
                    };
                }

                return null;
            })
            .filter(Boolean); // elimina los nulls


        //si hace de 9 a 20 me lo sume en shiftFix.lenght 
        const doubleShift = morningEmployees.filter((morningEmployee) => morningEmployee.entry === 9 && morningEmployee.exit === 20)


        const missing = afternoonEmployees.length - shiftFix.length - doubleShift.length;

        if (shiftFix.length < afternoonEmployees.length - doubleShift.length && doubleShift.length < 2) { //
            console.log("diferencia", afternoonEmployees.length - shiftFix.length - doubleShift.length);


            //el texto lo mande desde el context, asi si faltan 2 personas en ciudad me dice dos personas, y no dos veces la misma notificacion
            //tambien si se resuelve me tiene que desaparecer la notificacion
            toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`)
            saveInfo(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`, 'shiftFixMissing')
        }

    }





    return (
        <div className='shiftListComponent'>

            <section>
                {storeId === 'espacio' &&
                    <>
                        <ShiftListDetail shiftEmployeeList={espacioMorningEmployees} shift={"Mañana"} />
                        <br />

                        <ShiftListDetail shiftEmployeeList={espacioAfternoonEmployees} shift={"Tarde"} />
                        <br />
                    </>
                }
            </section>
            <section>
                {storeId === 'ciudad' &&
                    <>
                        <ShiftListDetail shiftEmployeeList={ciudadMorningEmployees} shift={"Mañana"} />
                        <br />

                        <ShiftListDetail shiftEmployeeList={ciudadAfternoonEmployees} shift={"Tarde"} />
                        <br />
                    </>
                }
            </section>
            <section>
                {storeId === 'punto' &&
                    <>
                        <ShiftListDetail shiftEmployeeList={puntoMorningEmployees} shift={"Mañana"} />
                        <br />

                        <ShiftListDetail shiftEmployeeList={puntoAfternoonEmployees} shift={"Tarde"} />
                        <br />
                    </>
                }
            </section>

        </div >
    )
}

export default ShiftList
