import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51I7ddiA3MASHtQVF7ZINRMLrbtAqmCxwCrKcJlzb4kdjMwDZssER7DcSBXWvHK6rq1vUXeUutu1laPeeLpxGzk2r00lpegVwew"
);

export default function EventModal({ event, onClose }) {
  const [eventData, setEventData] = useState(event);
  const [quantity, setQuantity] = useState(1);
  const [buying, setBuying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEventData(event);
    setQuantity(1);
    setSuccess(false);
    setError("");
  }, [event]);

  if (!eventData) return null;

  const ticketsLeft = eventData.number_of_tickets
    ? eventData.number_of_tickets - (eventData.tickets_sold || 0)
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

      // Create checkout session
      const res = await axios.post(
        "http://localhost:8000/api/events/create-checkout-session/",
        {
          event: eventData.id,
          quantity,
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
      setError("Stripe checkout failed. Please try again.");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {eventData.title}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {eventData.start_date} – {eventData.end_date}
        </p>

        {eventData.photo && (
          <img
            src={eventData.photo}
            alt={eventData.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        {eventData.description && (
          <p className="text-gray-700 mb-4">{eventData.description}</p>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">
              Tickets Available:
            </span>
            <span className="text-green-600 font-bold">
              {ticketsLeft} / {eventData.number_of_tickets}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-700">Cost:</span>
            <span className="text-blue-600 font-bold">
              ${Number(eventData.cost || 0).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <label className="mr-2 text-gray-700">Quantity:</label>
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
            className={`w-full py-2 rounded-lg ${
              buying ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            } text-white font-semibold transition`}
            onClick={handleBuyTicket}
            disabled={buying || ticketsLeft <= 0}
          >
            {buying
              ? "Redirecting..."
              : ticketsLeft <= 0
              ? "Sold Out"
              : "Buy Ticket"}
          </button>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </div>

        <button
          className="mt-4 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function EventModal({ event, onClose }) {
//   const [eventData, setEventData] = useState(event);
//   const [buying, setBuying] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // When the prop changes, reset local state
//   useEffect(() => {
//     setEventData(event);
//     setSuccess(false);
//     setError("");
//   }, [event]);

//   if (!eventData) return null;

//   const ticketsLeft = eventData.number_of_tickets
//     ? eventData.number_of_tickets - (eventData.tickets_sold || 0)
//     : 0;

//   const handleBuyTicket = async () => {
//     setBuying(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("access_token");

//       // Make purchase
//       await axios.post(
//         "http://localhost:8000/api/events/buy-ticket/",
//         {
//           event: eventData.id,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccess(true);

//       // Re-fetch the updated event to get new tickets_sold count
//       const res = await axios.get(
//         `http://localhost:8000/api/events/${eventData.id}/`
//       );
//       setEventData(res.data);
//     } catch (err) {
//       setError(
//         err?.response?.data?.error ||
//           "Purchase failed. Maybe not enough tickets."
//       );
//     } finally {
//       setBuying(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//       <div className="relative bg-white rounded-xl shadow-lg max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
//         {/* Close button top-right */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-bold mb-2 text-gray-800">
//           {eventData.title}
//         </h2>
//         <p className="text-sm text-gray-500 mb-4">
//           {eventData.start_date} – {eventData.end_date}
//         </p>

//         {/* Image */}
//         {eventData.photo && (
//           <img
//             src={eventData.photo}
//             alt={eventData.title}
//             className="w-full h-48 object-cover rounded-lg mb-4"
//           />
//         )}

//         {/* Description */}
//         {eventData.description && (
//           <p className="text-gray-700 mb-4">{eventData.description}</p>
//         )}

//         <div className="border-t pt-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="font-medium text-gray-700">
//               Tickets Available:
//             </span>
//             <span className="text-green-600 font-bold">
//               {ticketsLeft} / {eventData.number_of_tickets}
//             </span>
//           </div>

//           <div className="flex justify-between items-center mb-4">
//             <span className="font-medium text-gray-700">Cost:</span>
//             <span className="text-blue-600 font-bold">
//               ${Number(eventData.cost || 0).toFixed(2)}
//             </span>
//           </div>

//           {success ? (
//             <p className="text-green-600 text-center font-semibold mb-4">
//               ✅ Ticket purchased successfully!
//             </p>
//           ) : (
//             <button
//               className={`w-full py-2 rounded-lg ${
//                 buying ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
//               } text-white font-semibold transition`}
//               onClick={handleBuyTicket}
//               disabled={buying || ticketsLeft <= 0}
//             >
//               {buying
//                 ? "Processing..."
//                 : ticketsLeft <= 0
//                 ? "Sold Out"
//                 : "Buy Ticket"}
//             </button>
//           )}

//           {error && <p className="text-red-600 text-center mt-2">{error}</p>}
//         </div>

//         <button
//           className="mt-4 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
