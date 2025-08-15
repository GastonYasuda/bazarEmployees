import React, { useContext, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { apiEmployee } from '../../Context/EmployeeApiContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeScheduleChart = ({ employeeByStore, employeeData, isStored, date, from, state, guardoDatoDelStoreParaMostrar }) => {


    // const { employeesEspacioStored } = useContext(apiEmployee)

    const [infoOption, setInfoOption] = useState([]);

    useEffect(() => {


        if (state === 'byDateStore') {
            //  console.log('vengo de byDateStore');
            setInfoOption(employeeData)
            console.log('employeeData schedule', employeeData);

        } else if (state === 'showByStore') {
            // console.log('vengo de showByStore', guardoDatoDelStoreParaMostrar);
            console.log('employeeData schedule', employeeData);

            // setInfoOption(guardoDatoDelStoreParaMostrar)// cuando arranca tiene que mostrar este

            setInfoOption(employeeData)//me lo muestra en directo employeeData === pruebaEmployees en showByStore


        }
    }, [employeeData, guardoDatoDelStoreParaMostrar])


    // useEffect(() => {

    //     console.log('date', date);
    //     console.log('isStored', isStored);



    //     const stored = localStorage.getItem(date);


    //     const parsed = JSON.parse(stored);
    //     console.log('parsed', parsed);



    //     if (parsed === null) {
    //         console.log(employeeData)


    //         setInfoOption(employeeData)



    //     } else {
    //         if (isStored) {
    //             console.log(employeeData);//me trae solo los de ciudad
    //             console.log('1 isStored aca', isStored);//true
    //             // console.log(employeeData[0].store);//ciudad
    //             console.log('parsed', parsed);
    //             console.log('employeeData', employeeData);




    //             const searchStore = parsed.filter(empl => empl.store === employeeData[0].store)
    //             //traigo del local y lo filtro y lo grabo en un state
    //             setInfoOption(searchStore)

    //         } else {
    //             console.log('2 isStored alla', isStored);
    //             console.log('employeeData', employeeData);


    //             //en el state grabo employeedata
    //             const searchStore = employeeData.filter(empl => empl.store === employeeData[0].store)

    //             setInfoOption(searchStore)
    //         }
    //     }



    //     //tengo que preguntar si employeeData es lo guardado o no
    //     //o cuando es isStored lo traigo del localstorage


    // }, [])


    const labels = infoOption.map((e) => e.name);

    // Usamos directamente los valores numéricos
    const entryTimes = infoOption.map((e) => e.assist ? e.entry : 0);
    const workedHours = infoOption.map((e) => e.assist ? e.exit - e.entry : 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Inicio',
                data: entryTimes,
                backgroundColor: 'rgba(0,0,0,0)', // Invisible
            },
            {
                label: 'Turno trabajado',
                data: workedHours,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Horarios trabajados por empleados',
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                stacked: true,
                min: 9,
                max: 20,
                ticks: {
                    stepSize: 1,
                    callback: (val) => `${val}`,
                    maxRotation: 0,
                    minRotation: 0,
                },
                title: {
                    display: false,
                    text: 'Hora del día',
                },
            },
            y: {
                stacked: true,
                ticks: {
                    autoSkip: false,
                }
            },
        },
    };

    return (

        <div style={{
            width: '100%', maxWidth: '800px',
            height: (infoOption.length !== 0 ? infoOption[0].store === 'espacio' : '') ? `${infoOption.length * 27}px` : `${infoOption.length * 40}px`,


            // height: `${employeeData.length * 40}px`,
            margin: '0 auto'
        }}>
            <Bar data={data} options={options} />
        </div>


    );
};

export default EmployeeScheduleChart;
