/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';


const ShiftList = ({ employeeData }) => {

    const { espacioMorningEmployees, espacioAfternoonEmployees } = useContext(apiEmployee)
    const { storeId } = useParams()


    // console.log('afternoonEmployees.length', afternoonEmployees.length);
    // console.log('shiftFix.length', shiftFix.length);
    // console.log('doubleShift.length', doubleShift.length);

    useEffect(() => {
        separateShift()
    }, [employeeData])

    const [morningEmployees, setMorningEmployees] = useState([])
    const [afternoonEmployees, setAfternoonEmployees] = useState([])


    const separateShift = () => {

        const morning = employeeData.filter((employee) => employee.entry === 9 && employee.assist === true);
        setMorningEmployees(morning)
        const afternoon = employeeData.filter((employee) => employee.exit === 20 && employee.assist === true);
        setAfternoonEmployees(afternoon)

    }



    useEffect(() => {



        traspasoTurnos()


        // if (storeId === 'espacio') {
        //     traspasoTurnos(espacioMorningEmployees, espacioAfternoonEmployees)
        // } else if (storeId === 'punto') {

        //     traspasoTurnos(puntoMorningEmployees, puntoAfternoonEmployees)
        // } else if (storeId === 'ciudad') {

        //     traspasoTurnos(ciudadMorningEmployees, ciudadAfternoonEmployees)   // }

    }, [espacioMorningEmployees])







    const traspasoTurnos = () => {


        //los que trabajan a la manana que coinciden con los de la tarde-------------------------------------
        const usedEntries = new Set();

        const shiftFix = morningEmployees
            .map((morningEmployee) => {
                const match = espacioAfternoonEmployees.find(
                    (afternoonEmployee) =>
                        morningEmployee.exit === afternoonEmployee.entry &&
                        !usedEntries.has(afternoonEmployee.entry)
                );

                if (match) {
                    usedEntries.add(match.entry); // marcar como usado
                    return {
                        from: morningEmployee.name,
                        to: match.name,
                        time: morningEmployee.exit,
                    };
                }

                return null;
            })
            .filter(Boolean);

        // console.log('shiftFix', shiftFix);
        // console.log('espacioAfternoonEmployees.length', espacioAfternoonEmployees.length);




        //los que trabajan doble turno----------------------------------------
        //si hace de 9 a 20 me lo sume en shiftFix.lenght 
        const doubleShift = morningEmployees.filter((morningEmployee) => morningEmployee.entry === 9 && morningEmployee.exit === 20)

        if (doubleShift !== undefined && doubleShift.length !== 0) {

            // console.log('doubleShift', doubleShift);
            // console.log('doubleShift', `${doubleShift[0].name} en ${doubleShift[0].store}`);

            // doubleShift.forEach(double => {
            //     console.log('doubleShift', `${double.name} en ${double.store}`);

            // });
        }

        //cuantas personas faltan
        if (storeId === 'espacio') {
            // console.log('espacioAfternoonEmployees.length', espacioAfternoonEmployees.length);
            // console.log('shiftFix.length', shiftFix.length);
            // console.log('doubleShift.length', doubleShift.length);

            const missing = afternoonEmployees.length - shiftFix.length - doubleShift.length;
            // console.log('faltan fix de espacio', missing);

            if (missing > 0) {
                const txt = `${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio en ${storeId}`;

                toast(txt)
                // shiftInfo('espacio', txt)
            } else if (missing === 0) {
                // shiftInfo('espacio', '')
            }

        }



    }





    return (
        <div className='shiftListComponent'>
            <section>
                <ShiftListDetail shiftEmployeeList={morningEmployees} shift={"Mañana"} />
                <br />

                <ShiftListDetail shiftEmployeeList={afternoonEmployees} shift={"Tarde"} />
                <br />

            </section>

            {/* <section>
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
            </section> */}

        </div >
    )
}

export default ShiftList
