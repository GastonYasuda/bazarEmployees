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


        if (state === 'byDateStore') {
            setInfoOption(employeeData)

        } else if (state === 'showByStore') {
            setInfoOption(employeeData)//me lo muestra en directo employeeData === pruebaEmployees en showByStore
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeData, guardoDatoDelStoreParaMostrar])

    const labels = infoOption.map((e) => e.name);
    const entryTimes = infoOption.map(e => e.assist ? e.entry : 0);

    // horas hasta el inicio del corte
    const beforeCut = infoOption.map(e => e.assist ? e.cutStart - e.entry : 0);

    // duración del corte
    const cutHours = infoOption.map(e => e.assist ? e.cutEnd - e.cutStart : 0);

    // horas después del corte
    const afterCut = infoOption.map(e => e.assist ? e.exit - e.cutEnd : 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Inicio',
                data: entryTimes,
                backgroundColor: 'rgba(0, 0, 0, 0)', // offset invisible
            },
            {
                label: 'Trabajo antes del corte',
                data: beforeCut,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // celeste
            },
            {
                label: 'Corte',
                data: cutHours,
                backgroundColor: 'rgba(100, 254, 17, 0.89)', // verde
            },
            {
                label: 'Trabajo después del corte',
                data: afterCut,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // mismo celeste
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
