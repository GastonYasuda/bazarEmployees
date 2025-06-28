/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';
// import InfoMessage from '../InfoMessage/InfoMessage';


const ShiftList = ({ morningEmployeeList, afternoonEmployeeList }) => {

    // const { infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee, saveInfo } = useContext(apiEmployee)
    const { infoShiftFixMissing, saveInfo } = useContext(apiEmployee)

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

        // console.log("doble turno", doubleShift.length);
        // console.log("turno tarde", afternoonEmployeeList.length)
        // console.log("los cambios", shiftFix.length);


        // console.log('soy de ', morningEmployeeList);

        // if(morningEmployeeList[0].store)
        const missing = afternoonEmployeeList.length - shiftFix.length - doubleShift.length;

        if (shiftFix.length < afternoonEmployeeList.length - doubleShift.length && doubleShift.length < 2) { //
            console.log("diferencia", afternoonEmployeeList.length - shiftFix.length - doubleShift.length);


            toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`)

            saveInfo(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`, 'shiftFixMissing')
        }

    }





    return (
        <div>



            <ShiftListDetail shiftEmployeeList={morningEmployeeList} shift={"Mañana"} />

            <br />

            <ShiftListDetail shiftEmployeeList={afternoonEmployeeList} shift={"Tarde"} />

            <br />


            {/* {infoMissingMorning.length !== 0 &&
                infoMissingAfternoon.length !== 0 &&
                infoShiftFixMissing.length !== 0 &&
                infoMissingEmployee.length !== 0 &&
                <>
                    <InfoMessage messages={infoMissingMorning} />
                    <InfoMessage messages={infoMissingAfternoon} />
                    <InfoMessage messages={infoShiftFixMissing} />
                    <InfoMessage messages={infoMissingEmployee} />
                </>
            } */}




        </div >
    )
}

export default ShiftList
