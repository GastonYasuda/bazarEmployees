import React, { useRef, useEffect } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';


const ScheduleGraphic = () => {
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendarInstance = calendarRef.current.getInstance();

        calendarInstance.createSchedules([
            {
                id: '1',
                calendarId: '1',
                title: 'Evento de prueba',
                category: 'time',
                start: '2025-06-24T10:00:00',
                end: '2025-06-24T12:00:00',
            },
        ]);
    }, []);

    return (
        <div style={{ height: '800px' }}>
            <Calendar
                ref={calendarRef}
                height="800px"
                view="week"
                useCreationPopup={true}
                useDetailPopup={true}
            />
        </div>
    )
}

export default ScheduleGraphic
