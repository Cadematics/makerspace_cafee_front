import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const ticketsLeft = event
    ? event.number_of_tickets - (event.tickets_sold || 0)
    : 0;

  const handleBuyTicket = async () => {
    if (quantity < 1 || quantity > ticketsLeft) {
      setError("Invalid quantity selected.");
      return;
    }

    setBuying(true);
    setError("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
        "http://localhost:8000/api/events/create-checkout-session/",
        {
          event: event.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setError("Failed to start payment. Please try again.");
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return <div className="p-6 text-center text-red-600">Event not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Photo */}
      {event.photo && (
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2 text-gray-800">{event.title}</h1>
      <p className="text-gray-500 mb-4">
        {event.start_date} – {event.end_date}
      </p>

      {event.description && (
        <p className="text-gray-700 mb-6">{event.description}</p>
      )}

      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Tickets Available:</span>
          <span className="text-green-600 font-bold">
            {ticketsLeft} / {event.number_of_tickets}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Cost:</span>
          <span className="text-blue-600 font-bold">
            ${Number(event.cost || 0).toFixed(2)}
          </span>
        </div>

        <div className="mt-6">
          <label className="mr-2 font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            max={ticketsLeft}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </div>

        <button
          className="mt-4 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
          onClick={handleBuyTicket}
          disabled={buying || ticketsLeft <= 0}
        >
          {buying
            ? "Redirecting..."
            : ticketsLeft <= 0
            ? "Sold Out"
            : "Buy Ticket"}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Back
      </button>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EventDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [buying, setBuying] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const [quantity, setQuantity] = useState(1);

//   // Fetch event details on mount
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/events/${id}/`);
//         setEvent(res.data);
//       } catch (err) {
//         console.error("Failed to fetch event", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id]);

//   const ticketsLeft = event
//     ? event.number_of_tickets - (event.tickets_sold || 0)
//     : 0;

//   const handleBuyTicket = async () => {
//     setBuying(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post(
//         "http://localhost:8000/api/events/buy-ticket/",
//         {
//           event: event.id,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setSuccess(true);

//       // Refetch event data to update tickets_sold
//       const res = await axios.get(`http://localhost:8000/api/events/${id}/`);
//       setEvent(res.data);
//     } catch (err) {
//       setError(
//         err?.response?.data?.error ||
//           "Purchase failed. Maybe not enough tickets."
//       );
//     } finally {
//       setBuying(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-600">
//         Loading event details...
//       </div>
//     );
//   }

//   if (!event) {
//     return <div className="p-6 text-center text-red-600">Event not found.</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       {/* Event Photo */}
//       {event.photo && (
//         <img
//           src={event.photo}
//           alt={event.title}
//           className="w-full h-64 object-cover rounded-lg mb-6"
//         />
//       )}

//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-2 text-gray-800">{event.title}</h1>
//       <p className="text-gray-500 mb-4">
//         {event.start_date} – {event.end_date}
//       </p>

//       {/* Description */}
//       {event.description && (
//         <p className="text-gray-700 mb-6">{event.description}</p>
//       )}

//       <div className="border-t pt-4 space-y-3">
//         <div className="flex justify-between items-center">
//           <span className="font-medium text-gray-700">Tickets Available:</span>
//           <span className="text-green-600 font-bold">
//             {ticketsLeft} / {event.number_of_tickets}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="font-medium text-gray-700">Cost:</span>
//           <span className="text-blue-600 font-bold">
//             ${Number(event.cost || 0).toFixed(2)}
//           </span>
//         </div>

//         <div className="mt-6">
//           <label className="mr-2 font-medium">Quantity:</label>
//           <input
//             type="number"
//             min="1"
//             max={ticketsLeft}
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="border rounded px-2 py-1 w-20"
//           />
//         </div>

//         {success ? (
//           <p className="text-green-600 text-center font-semibold">
//             ✅ Ticket purchased successfully!
//           </p>
//         ) : (
//           <button
//             className="mt-4 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
//             onClick={handleBuyTicket}
//             disabled={buying || ticketsLeft <= 0}
//           >
//             {buying
//               ? "Processing..."
//               : ticketsLeft <= 0
//               ? "Sold Out"
//               : "Buy Ticket"}
//           </button>
//         )}

//         {error && <p className="text-red-600 text-center">{error}</p>}
//       </div>

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-6 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//       >
//         Back
//       </button>
//     </div>
//   );
// }
