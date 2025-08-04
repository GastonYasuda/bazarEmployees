import React from 'react';
import Calendar from 'react-calendar';
import { FaRegStar } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

const specialDates = [new Date(2025, 7, 5), new Date(2025, 7, 10)];

function isSameDay(a, b) {
    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );
}

export default function MyCalendar() {
    return (
        <Calendar
            tileContent={({ date }) =>
                specialDates.some((d) => isSameDay(d, date)) ? (
                    <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                        <FaRegStar color="gold" />
                    </div>
                ) : null
            }
        />
    );
}
