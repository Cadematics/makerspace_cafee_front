import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventModal from "./EventModal";

export default function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (fetchInfo) => {
    const res = await axios.get("http://localhost:8000/api/events/");
    const fc = res.data.map((ev) => ({
      id: ev.id.toString(),
      title: ev.title,
      start: ev.start_datetime,
      end: ev.end_datetime,
      extendedProps: ev,
    }));
    setEvents(fc);
  };

  const handleEventClick = (clickInfo) => {
    setSelected(clickInfo.event.extendedProps);
    setModalOpen(true);
  };

  return (
    <>
      <div className={modalOpen ? "blur-sm opacity-4 pointer-events-none" : ""}>
        <div className="max-w-5xl mx-auto p-4">
          <div className="bg-white rounded shadow overflow-auto">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              datesSet={fetchEvents}
            />
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EventModal event={selected} onClose={() => setModalOpen(false)} />
        </div>
      )}
    </>
  );
}
