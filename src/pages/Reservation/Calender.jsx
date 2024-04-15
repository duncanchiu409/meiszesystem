import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calender = () => {
  const events = [
    {
      title: "抗鄒刀",
      start: "2024-02-05T12:00:00",
      end: "2024-02-05T13:00:00",
    },
    {
      title: "抗鄒刀",
      start: "2024-02-05T12:00:00",
      end: "2024-02-05T13:00:00",
    },
    {
      title: "抗鄒刀",
      start: "2024-02-05T12:00:00",
      end: "2024-02-05T13:00:00",
    },
  ];

  const handleDateClick = (e) => {
    alert(e.dateStr)
    e.view = "timeGridWeek"
  }

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="calendar">
            <Fullcalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              navLinks
              headerToolbar={{
                start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
              }}
              height={"90vh"}
              events={events}
              dayMaxEventRows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
