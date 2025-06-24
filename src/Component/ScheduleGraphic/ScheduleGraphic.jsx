/* eslint-disable react-hooks/exhaustive-deps */
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

// Registrar módulos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ScheduleGraphic = ({ employees }) => {

    const employeesu = [
        { name: 'Juan', hours: 35 },
        { name: 'Ana', hours: 42 },
        { name: 'Luis', hours: 28 },
    ]


    // Generar etiquetas y datos a partir de employees
    const labels = employeesu.map(emp => emp.name);
    const hours = employeesu.map(emp => emp.hours);

    const data = {
        labels,
        datasets: [
            {
                label: 'Horas trabajadas',
                data: hours,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Horas trabajadas por empleado'
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            // y: {
            //     beginAtZero: true
            // }
        }
    };


    return (
        <div style={{ width: '100%', height: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ScheduleGraphic;
