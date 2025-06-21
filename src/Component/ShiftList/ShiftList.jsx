/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';


const ShiftList = ({ morningEmployeeList, afternoonEmployeeList, espacioEmployees }) => {

    useEffect(() => {
        traspasoTurnos()
    }, [morningEmployeeList, afternoonEmployeeList, espacioEmployees])



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
            toast(`Falta gente para el cambio`)
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
