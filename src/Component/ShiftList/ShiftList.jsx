/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import InfoMessage from '../InfoMessage/InfoMessage';


const ShiftList = ({ morningEmployeeList, afternoonEmployeeList }) => {

    const { info, saveInfo } = useContext(apiEmployee)

    useEffect(() => {




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

        console.log("doble turno", doubleShift.length);
        console.log("turno tarde", afternoonEmployeeList.length)
        console.log("los cambios", shiftFix.length);




        const missing = afternoonEmployeeList.length - shiftFix.length - doubleShift.length;

        if (shiftFix.length < afternoonEmployeeList.length - doubleShift.length && doubleShift.length < 2) { //
            console.log("diferencia", afternoonEmployeeList.length - shiftFix.length - doubleShift.length);


            toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`)

            saveInfo(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`, 'shiftFixMissing')
        }

    }





    return (
        <div>



            <ShiftListDetail shiftEmployeeList={morningEmployeeList} shift={"Manana"} />

            <br />

            <ShiftListDetail shiftEmployeeList={afternoonEmployeeList} shift={"Tarde"} />

            <br />


            {info.length !== 0 && <InfoMessage messages={info} />}




        </div >
    )
}

export default ShiftList
