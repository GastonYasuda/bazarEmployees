import React, { useEffect, useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeScheduleChart = ({ employeeData, state, guardoDatoDelStoreParaMostrar }) => {





    const [infoOption, setInfoOption] = useState([]);

    useEffect(() => {
        // const doubles = employeeData.filter(e => e.doubleShift);


        if (state === 'byDateStore') {
            setInfoOption(employeeData)

        } else if (state === 'showByStore') {
            setInfoOption(employeeData)//me lo muestra en directo employeeData === pruebaEmployees en showByStore

            // if (doubles.length !== 0) {

            //     doubleShiftCut()
            // }
        }







        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeData, guardoDatoDelStoreParaMostrar])





    const generateChartData = () => {
        const labels = infoOption.map(e => e.name);

        // Creamos datasets iniciales vacíos
        const inicio = [];
        const trabajoAntes = [];
        const corte = [];
        const trabajoDespues = [];

        infoOption.forEach(e => {
            if (e.assist) {
                if (e.doubleShift) {
                    // Empleado con corte
                    inicio.push(e.entry);
                    trabajoAntes.push(e.cutStart - e.entry);
                    corte.push(e.cutEnd - e.cutStart);
                    trabajoDespues.push(e.exit - e.cutEnd);
                } else {
                    // Empleado sin corte
                    inicio.push(e.entry);
                    trabajoAntes.push(e.exit - e.entry); // todo el turno en "trabajoAntes"
                    corte.push(0); // no tiene corte
                    trabajoDespues.push(0); // no tiene después del corte
                }
            } else {
                // Si no asistió, todo 0
                inicio.push(0);
                trabajoAntes.push(0);
                corte.push(0);
                trabajoDespues.push(0);
            }
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Inicio',
                    data: inicio,
                    backgroundColor: 'rgba(0,0,0,0)', // offset invisible
                },
                {
                    label: 'Trabajo antes del corte',
                    data: trabajoAntes,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Corte',
                    data: corte,
                    backgroundColor: 'rgba(100, 254, 17, 0.89)',
                },
                {
                    label: 'Trabajo después del corte',
                    data: trabajoDespues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };
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

            <Bar data={generateChartData()} options={options} />
        </div>


    );
};

export default EmployeeScheduleChart;
