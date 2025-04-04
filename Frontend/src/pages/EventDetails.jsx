import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch {
        alert("Event not found");
        navigate("/");
      }
    };
    fetchEvent();
  }, [id, navigate]); // ✅ fixed from isFinite -> id

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await api.delete(`/events/${id}`);
      alert("Event deleted");
      navigate("/");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-xl shadow-lg space-y-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-800">{event.description}</p>
      <p className="text-gray-600">📍 Location: {event.location}</p>
      <p className="text-gray-600">📅 Date: {new Date(event.date).toLocaleDateString()}</p>

      {/* ✅ Add more details below as needed */}
      {event.time && <p className="text-gray-600">⏰ Time: {event.time}</p>}
      {event.category && <p className="text-gray-600">📂 Category: {event.category}</p>}
      {event.speakers?.length > 0 && (
        <p className="text-gray-600">
          🎤 Speakers: {event.speakers.join(", ")}
        </p>
      )}
      {event.capacity && <p className="text-gray-600">👥 Capacity: {event.capacity}</p>}
      {event.createdBy && <p className="text-sm text-gray-400">Created by: {event.createdBy}</p>}

      {user && user._id === event.createdBy && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Event
        </button>
      )}
    </div>
  );
};

export default EventDetails;
