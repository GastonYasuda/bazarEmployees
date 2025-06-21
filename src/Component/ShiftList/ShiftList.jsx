/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';


const ShiftList = ({ morningEmployeeList, afternoonEmployeeList }) => {

    useEffect(() => {
        if (morningEmployeeList.length !== 0 && afternoonEmployeeList.length !== 0) {

            traspasoTurnos()
        }
    }, [morningEmployeeList, afternoonEmployeeList])



    const traspasoTurnos = () => {
        console.log(afternoonEmployeeList);

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

        console.log(shiftFix);

        if (shiftFix.length === 0 || shiftFix.length < afternoonEmployeeList.length - 1) {
            console.log("diferencia", afternoonEmployeeList.length - shiftFix.length - 1);
            const missing = afternoonEmployeeList.length - shiftFix.length - 1;

            toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambioooo`)
        }




    }





    return (
        <div>
            INFORME: ACA TIENE QUE DECIR CUANTOS FALTAN EN QUE TURNO O SI HAY ALGUN CAMBIO

            <br />
            <br />

            <ShiftListDetail shiftEmployeeList={morningEmployeeList} shift={"Manana"} />

            <br />

            <ShiftListDetail shiftEmployeeList={afternoonEmployeeList} shift={"Tarde"} />



        </div >
    )
}

export default ShiftList
