import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfISOWeek';
import getDay from 'date-fns/getDay';
import esLocale from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { es: esLocale },
});

const ComponenteCalendario = ({
    eventos,
    seleccionable,
    onSelectEvent,
    onSelectSlot,
    eventPropGetter
}) => {
    return (
        <div className="mt-4">
            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                selectable={seleccionable}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                style={{ height: "50vh" }}
                culture="es"
                locale="es"
                messages={{
                    today: 'Hoy',
                    previous: '← Anterior',
                    next: 'Siguiente →',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                }}
                eventPropGetter={eventPropGetter}
                className="bg-white rounded-3 p-3 shadow-sm"
            />
        </div>
    );
};

export default ComponenteCalendario;