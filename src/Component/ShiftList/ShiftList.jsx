/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';


const ShiftList = ({ morningEmployeeList, afternoonEmployeeList }) => {

    // const { infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee, saveInfo } = useContext(apiEmployee)
    const { saveInfo } = useContext(apiEmployee)

    useEffect(() => {

        //   console.log(infoShiftFixMissing);



        if (morningEmployeeList.length !== 0 && afternoonEmployeeList.length !== 0) {

            traspasoTurnos()
        }
    }, [morningEmployeeList, afternoonEmployeeList])



    const traspasoTurnos = () => {

        const shiftFix = morningEmployeeList
            .map((morningEmployee) => {
                const match = afternoonEmployeeList.find(
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
        const doubleShift = morningEmployeeList.filter((morningEmployee) => morningEmployee.entry === 9 && morningEmployee.exit === 20)


        const missing = afternoonEmployeeList.length - shiftFix.length - doubleShift.length;

        if (shiftFix.length < afternoonEmployeeList.length - doubleShift.length && doubleShift.length < 2) { //
            console.log("diferencia", afternoonEmployeeList.length - shiftFix.length - doubleShift.length);


            //el texto lo mande desde el context, asi si faltan 2 personas en ciudad me dice dos personas, y no dos veces la misma notificacion
            //tambien si se resuelve me tiene que desaparecer la notificacion
            toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`)
            saveInfo(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`, 'shiftFixMissing')
        }

    }





    return (
        <div className='shiftListComponent'>



            <ShiftListDetail shiftEmployeeList={morningEmployeeList} shift={"Mañana"} />

            <br />

            <ShiftListDetail shiftEmployeeList={afternoonEmployeeList} shift={"Tarde"} />

            <br />


        </div >
    )
}

export default ShiftList
