import React from 'react';
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

const EmployeeScheduleChart = ({ employeeData }) => {



    const labels = employeeData.map((e) => e.name);

    // Usamos directamente los valores numéricos
    const entryTimes = employeeData.map((e) => e.assist ? e.entry : 0);
    const workedHours = employeeData.map((e) => e.assist ? e.exit - e.entry : 0);

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
            height: employeeData[0].store === 'espacio' ? `${employeeData.length * 27}px` : `${employeeData.length * 40}px`,


            // height: `${employeeData.length * 40}px`,
            margin: '0 auto'
        }}>
            <Bar data={data} options={options} />
        </div>


    );
};

export default EmployeeScheduleChart;
//27