/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const ScheduleGraphic = ({ employees }) => {
    const calendarRef = useRef(null);

    const calendars = [
        {
            id: 'emp1',
            name: 'Juan',
            color: '#ffffff',
            bgColor: '#1e90ff',
            dragBgColor: '#1e90ff',
            borderColor: '#1e90ff',
        },
        {
            id: 'emp2',
            name: 'María',
            color: '#ffffff',
            bgColor: '#ff7f50',
            dragBgColor: '#ff7f50',
            borderColor: '#ff7f50',
        },
        {
            id: 'emp3',
            name: 'Pedro',
            color: '#ffffff',
            bgColor: '#32cd32',
            dragBgColor: '#32cd32',
            borderColor: '#32cd32',
        },
    ];

    const schedules = [
        {
            id: '1',
            calendarId: 'emp1',
            title: 'Juan',
            category: 'time',
            start: '2025-06-22T09:30:00',
            end: '2025-06-22T14:30:00',
        },
        {
            id: '2',
            calendarId: 'emp2',
            title: 'María',
            category: 'time',
            start: '2025-06-22T10:00:00',
            end: '2025-06-22T18:00:00',
        },
        {
            id: '3',
            calendarId: 'emp3',
            title: 'Pedro',
            category: 'time',
            start: '2025-06-22T12:00:00',
            end: '2025-06-22T20:00:00',
        },
    ];

    useEffect(() => {
        const calendarInstance = calendarRef.current?.getInstance();

        if (calendarInstance) {
            calendarInstance.clear();
            calendarInstance.createSchedules(schedules);
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '90vh' }}>
            <Calendar
                ref={calendarRef}
                height="100%"
                view="day"
                calendars={calendars}
                theme={{
                    common: {
                        backgroundColor: '#fff',
                    },
                }}
                day={{
                    hourStart: 9,
                    hourEnd: 20,
                }}
                taskView={false}
                scheduleView
            />
        </div>
    );
};

export default ScheduleGraphic;
