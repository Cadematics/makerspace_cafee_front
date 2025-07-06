import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CrowdfundingEventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReward, setSelectedReward] = useState(null);
  const [pledging, setPledging] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/crowdfunding-events/${id}/`
        );
        console.log("Fetched event:", res);
        setEvent(res.data);
        setRewards(res.data.rewards);
      } catch (err) {
        console.error("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handlePledge = async () => {
    if (!selectedReward) {
      setError("Please select a reward first!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to pledge.");
      return;
    }

    setPledging(true);
    setError("");
    setMessage("");

    try {
      await axios.post(
        "http://localhost:8000/api/pledges/",
        {
          event: event.id,
          reward: selectedReward.id,
          amount: selectedReward.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("🎉 Pledge successful!");
      setSelectedReward(null);

      // ✅ Refresh event data
      const refreshed = await axios.get(
        `http://localhost:8000/api/crowdfunding-events/${id}/`
      );
      setEvent(refreshed.data);
      setRewards(refreshed.data.rewards);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error || "Pledge failed. Please try again."
      );
    } finally {
      setPledging(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (!event) {
    return <div className="p-6 text-center text-red-600">Event not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Event Image */}
      {event.photo && (
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>

      {/* Funding Progress */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Funding Goal
        </h2>
        <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${event.funding_percent}%` }}
          />
        </div>
        <p className="text-gray-700 mt-1">
          ${event.current_funding} raised of ${event.funding_goal} goal
        </p>
      </div>

      {/* Rewards List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rewards</h2>
        {rewards.length === 0 ? (
          <p className="text-gray-500">No rewards available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`border rounded-lg p-4 shadow hover:ring-2 ${
                  selectedReward?.id === reward.id
                    ? "ring-2 ring-orange-500"
                    : "ring-gray-200"
                } transition`}
              >
                {reward.image && (
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{reward.title}</h3>
                <p className="text-gray-700 mb-2">{reward.description}</p>
                <p className="text-green-700 font-semibold mb-2">
                  ${reward.amount}
                </p>
                <button
                  className={`${
                    selectedReward?.id === reward.id
                      ? "bg-orange-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white px-4 py-2 rounded w-full transition`}
                  onClick={() =>
                    setSelectedReward(
                      selectedReward?.id === reward.id ? null : reward
                    )
                  }
                >
                  {selectedReward?.id === reward.id
                    ? "Deselect"
                    : "Select Reward"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pledge Confirmation */}
      {selectedReward && (
        <div className="mt-8 p-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Confirm Your Pledge</h2>
          <p className="mb-2">
            Reward: <strong>{selectedReward.title}</strong>
          </p>
          <p className="mb-2">
            Amount: <strong>${selectedReward.amount}</strong>
          </p>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {message && <p className="text-green-600 mb-2">{message}</p>}

          <button
            className={`w-full py-2 rounded ${
              pledging ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold transition`}
            onClick={handlePledge}
            disabled={pledging || !selectedReward}
          >
            {pledging ? "Processing..." : "Confirm Pledge"}
          </button>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Back
      </button>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CrowdfundingEventDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [event, setEvent] = useState(null);
//   const [rewards, setRewards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedReward, setSelectedReward] = useState(null);
//   const [pledging, setPledging] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/crowdfunding-events/${id}/`
//         );
//         setEvent(res.data);
//         setRewards(res.data.rewards);
//       } catch (err) {
//         console.error("Failed to fetch event", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id]);

//   const handlePledge = async () => {
//     if (!selectedReward) return;

//     setPledging(true);
//     setError("");
//     setMessage("");

//     try {
//       const token = localStorage.getItem("access_token");

//       await axios.post(
//         "http://localhost:8000/api/pledges/",
//         {
//           project: event.id,
//           reward: selectedReward.id,
//           amount: selectedReward.amount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage("🎉 Pledge successful!");
//       setSelectedReward(null);

//       // Optionally refetch the event to update funding info
//       const refreshed = await axios.get(
//         `http://localhost:8000/api/crowdfunding-events/${id}/`
//       );
//       setEvent(refreshed.data);
//       setRewards(refreshed.data.rewards);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err?.response?.data?.error || "Pledge failed. Please try again."
//       );
//     } finally {
//       setPledging(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-center">Loading...</div>;
//   }

//   if (!event) {
//     return <div className="p-6 text-center text-red-600">Event not found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       {event.photo && (
//         <img
//           src={event.photo}
//           alt={event.title}
//           className="w-full h-64 object-cover rounded-lg mb-6"
//         />
//       )}

//       <h1 className="text-3xl font-bold mb-2 text-gray-800">{event.title}</h1>
//       <p className="text-gray-600 mb-4">{event.description}</p>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Funding Goal
//         </h2>
//         <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-green-500"
//             style={{ width: `${event.funding_percent}%` }}
//           />
//         </div>
//         <p className="text-gray-700 mt-1">
//           ${event.current_funding} raised of ${event.funding_goal} goal
//         </p>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Rewards</h2>
//         {rewards.length === 0 ? (
//           <p className="text-gray-500">No rewards available.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {rewards.map((reward) => (
//               <div
//                 key={reward.id}
//                 className={`border rounded-lg p-4 shadow ${
//                   selectedReward?.id === reward.id
//                     ? "ring-2 ring-orange-500"
//                     : ""
//                 }`}
//               >
//                 {reward.image && (
//                   <img
//                     src={reward.image}
//                     alt={reward.title}
//                     className="h-40 w-full object-cover rounded mb-3"
//                   />
//                 )}
//                 <h3 className="text-lg font-bold mb-1">{reward.title}</h3>
//                 <p className="text-gray-700 mb-2">{reward.description}</p>
//                 <p className="text-green-700 font-semibold mb-2">
//                   ${reward.amount}
//                 </p>
//                 <button
//                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
//                   onClick={() => setSelectedReward(reward)}
//                 >
//                   {selectedReward?.id === reward.id
//                     ? "Selected"
//                     : "Select Reward"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedReward && (
//         <div className="mt-8 p-4 border-t">
//           <h2 className="text-lg font-semibold mb-2">Confirm Your Pledge</h2>
//           <p className="mb-2">
//             Reward: <strong>{selectedReward.title}</strong>
//           </p>
//           <p className="mb-2">
//             Amount: <strong>${selectedReward.amount}</strong>
//           </p>

//           {error && <p className="text-red-600 mb-2">{error}</p>}
//           {message && <p className="text-green-600 mb-2">{message}</p>}

//           <button
//             className={`w-full py-2 rounded ${
//               pledging ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//             } text-white font-semibold transition`}
//             onClick={handlePledge}
//             disabled={pledging}
//           >
//             {pledging ? "Processing..." : "Confirm Pledge"}
//           </button>
//         </div>
//       )}

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-6 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//       >
//         Back
//       </button>
//     </div>
//   );
// }
