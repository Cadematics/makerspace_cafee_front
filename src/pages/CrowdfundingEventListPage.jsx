import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CrowdfundingEventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/crowdfunding-events/"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Crowdfunding Events
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              to={`/crowdfunding-events/${event.id}`}
              key={event.id}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {event.photo && (
                <img
                  src={event.photo}
                  alt={event.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
