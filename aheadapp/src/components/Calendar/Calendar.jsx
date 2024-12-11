import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr"; // Charger la localisation française
import "./Calendar.css";
import supabase from "../supabase";
import Terminal from "../terminal/Terminal";
moment.locale("fr");
const formatDate = (timestamp) => {
  return moment(timestamp).format("dddd D MMMM YYYY, HH:mm");
};

// Localisation des dates avec Moment
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Événement sélectionné

  useEffect(() => {
    getCalendar();
  }, []);
  // Gérer la sélection d'un événement
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Fermer la fenêtre modale
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  async function getCalendar() {
    const { data, error } = await supabase().from("calendar").select();
    if (error) {
      console.error("Erreur de récupération des participants", error);
    } else {
      setEvents(data);
    }
    return (
      <ul>
        {events.map((event, index) => (
          <li>{event.title}</li>
        ))}
      </ul>
    );
  }

  const { defaultDate, views } = useMemo(
    () => ({
      //   components: {
      //     timeSlotWrapper: ColoredDateCellWrapper,
      //   },
      defaultDate: new Date(2024, 1, 12),
      //   max: dates.add(dates.endOf(new Date(2024, 31, 12), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <div className="responsive-div">
      {/* <Terminal text={"Calendrier"}></Terminal> */}
      <p className='title' >Calendrier</p>
      {/* {events.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))} */}
      {/* <button onClick={handleAddEvent} style={{ marginBottom: "10px" }}>
        Ajouter un événement
      </button> */}
      <div
        style={{
          backgroundColor: "#FFDCEE",
          height: "100%",
          padding: "10px",
          borderRadius: "5px",
          background:
            "linear-gradient(135deg, rgba(255,169,169,1) 0%, rgba(255,220,220,1) 100%)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => {
            return new Date(event.start);
          }}
          endAccessor={(event) => {
            return new Date(event.end);
          }}
          style={{ height: "100%" }}
          selectable
          // onSelectSlot={(slotInfo) =>
          //   console.log("Plage sélectionnée :", slotInfo)
          // }
          onSelectEvent={handleSelectEvent}
          views={views}
        />
      </div>
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Date de début :</strong> {formatDate(selectedEvent.start)}
            </p>
            <p>
              <strong>Date de fin :</strong> {formatDate(selectedEvent.end)}
            </p>
            {/* <p>
              <strong>Description :</strong>{" "}
              {selectedEvent.description || "Aucune description"}
            </p> */}
            <button onClick={handleCloseModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
