/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import ShiftListDetail from '../ShiftListDetail/ShiftListDetail';
import { toast } from 'react-toastify';
import { apiEmployee } from '../../Context/EmployeeApiContext';
import { useParams } from 'react-router-dom';


const ShiftList = () => {

    const { employee, saveInfo, espacioMorningEmployees, espacioAfternoonEmployees, puntoMorningEmployees, puntoAfternoonEmployees, ciudadMorningEmployees, ciudadAfternoonEmployees, shiftInfo, shiftInformationEspacio } = useContext(apiEmployee)
    const { storeId } = useParams()


    // console.log('afternoonEmployees.length', afternoonEmployees.length);
    // console.log('shiftFix.length', shiftFix.length);
    // console.log('doubleShift.length', doubleShift.length);

    const [espacioFixMissing, setEspacioFixMissing] = useState()


    useEffect(() => {



        //setEspacioFixMissing = los que trabajan a la tarde - los que hacen doble turno - los que coinciden turno manana y tarde


        traspasoTurnos()


        // if (storeId === 'espacio') {
        //     traspasoTurnos(espacioMorningEmployees, espacioAfternoonEmployees)
        // } else if (storeId === 'punto') {

        //     traspasoTurnos(puntoMorningEmployees, puntoAfternoonEmployees)
        // } else if (storeId === 'ciudad') {

        //     traspasoTurnos(ciudadMorningEmployees, ciudadAfternoonEmployees)
        // }





    }, [espacioMorningEmployees])


    const traspasoTurnos = () => {


        //los que trabajan a la manana que coinciden con los de la tarde-------------------------------------
        const usedEntries = new Set();

        const shiftFix = espacioMorningEmployees
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
        const doubleShift = espacioMorningEmployees.filter((morningEmployee) => morningEmployee.entry === 9 && morningEmployee.exit === 20)

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

            const missing = espacioAfternoonEmployees.length - shiftFix.length - doubleShift.length;
            // console.log('faltan fix de espacio', missing);

            if (missing > 0) {
                const txt = `${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio en ${storeId}`;

                toast(txt)
                // shiftInfo('espacio', txt)
            } else if (missing === 0) {
                // shiftInfo('espacio', '')
            }

        } else {
            // missing = afternoonEmployees.length - shiftFix.length - doubleShift.length;
        }




        // console.log('missing', missing);


        // if (storeId === afternoonEmployees[0].store && missing > 0) {
        // console.log('aca');
        // console.log(missing);




        // const txt = `${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio en ${storeId}`;

        // toast(txt)
        //console.log(txt);

        // saveInfo(txt)
        // shiftInfo(txt)
        // }








        // if (shiftFix.length < afternoonEmployees.length - doubleShift.length) {
        //     console.log("diferencia", afternoonEmployees.length - shiftFix.length - doubleShift.length);


        //     //el texto lo mande desde el context, asi si faltan 2 personas en ciudad me dice dos personas, y no dos veces la misma notificacion
        //     //tambien si se resuelve me tiene que desaparecer la notificacion
        //     toast(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio 1`)
        //     // saveInfo(`${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`, 'shiftFixMissing')

        //     shiftInfo(store, `${missing === 1 ? 'Falta' : 'Faltan'} ${missing} ${missing === 1 ? 'persona' : 'personas'} para el cambio`)




        // }

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
