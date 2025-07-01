import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [created, setCreated] = useState([]);
  const [backed, setBacked] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [myProjects, myBackings, myProfile, myTickets] =
          await Promise.all([
            axios.get("http://localhost:8000/api/my-projects/", { headers }),
            axios.get("http://localhost:8000/api/my-backings/", { headers }),
            axios.get("http://localhost:8000/api/me/", { headers }),
            axios.get("http://localhost:8000/api/my-tickets/", { headers }),
          ]);

        setCreated(myProjects.data);
        setBacked(myBackings.data);
        setProfile(myProfile.data);
        setTickets(myTickets.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [token]);

  const Card = ({ image, title, subtitle, children }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition border overflow-hidden flex flex-col">
      {image && (
        <img src={image} alt={title} className="h-40 w-full object-cover" />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-blue-700">{title}</h3>
        {subtitle && <p className="text-gray-500 text-sm mb-2">{subtitle}</p>}
        <div className="text-gray-700 text-sm flex-1">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        My Dashboard
      </h1>

      {profile && (
        <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                {profile.username[0].toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {profile.username}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          {profile.bio && (
            <p className="text-gray-700 mb-4 italic border-t pt-3">
              {profile.bio}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 rounded p-3">
              <p className="text-lg font-bold">{created.length}</p>
              <p className="text-gray-600">Created Projects</p>
            </div>
            <div className="bg-gray-100 rounded p-3">
              <p className="text-lg font-bold">{backed.length}</p>
              <p className="text-gray-600">Backed Projects</p>
            </div>
            <div className="bg-gray-100 rounded p-3">
              <p className="text-lg font-bold">{tickets.length}</p>
              <p className="text-gray-600">Tickets Purchased</p>
            </div>
          </div>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Created Projects
        </h2>
        {created.length === 0 ? (
          <p className="text-gray-500">You haven’t created any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {created.map((proj) => (
              <Link key={proj.id} to={`/projects/${proj.id}`}>
                <p>{proj.image}</p>
                <Card
                  image={"http://localhost:8000" + proj.image}
                  alt={proj.title}
                  title={proj.title}
                  subtitle={proj.author_name}
                >
                  {proj.description && (
                    <p className="line-clamp-3">{proj.description}</p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Backed Projects
        </h2>
        {backed.length === 0 ? (
          <p className="text-gray-500">You haven’t backed any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backed.map((b) => (
              <Link key={b.backing_id} to={`/projects/${b.project_id}`}>
                <Card
                  image={b.project_image}
                  title={b.project_title}
                  subtitle={b.reward}
                >
                  <p className="text-sm">Amount: ${b.amount}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Backed Projects
        </h2>
        {backed.length === 0 ? (
          <p className="text-gray-500">You haven’t backed any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backed.map((b) => (
              <Link key={b.backing_id}>
                <p>{console.log("backed", b)}</p>
                <Card
                  key={b.backing_id}
                  image={b.project_image}
                  title={b.project_title}
                  subtitle={b.reward}
                >
                  <p className="text-sm">Amount: ${b.amount}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section> */}

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Tickets Purchased
        </h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500">
            You haven’t purchased any tickets yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((t) => (
              <Link key={t.id} to={`/events/${t.event_id}`}>
                <Card
                  image={t.event_photo}
                  title={t.event_title}
                  subtitle={t.event_date}
                >
                  <p className="text-sm">Quantity: {t.quantity}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Tickets Purchased
        </h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500">
            You haven’t purchased any tickets yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((t) => (
              <Link key={t.id}>
                <Card
                  key={t.id}
                  image={t.event_photo}
                  title={t.event_title}
                  subtitle={t.event_date}
                >
                  <p className="text-sm">Quantity: {t.quantity}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section> */}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function DashboardPage() {
//   const [created, setCreated] = useState([]);
//   const [backed, setBacked] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [profile, setProfile] = useState(null);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const [myProjects, myBackings, myProfile, myTickets] =
//           await Promise.all([
//             axios.get("http://localhost:8000/api/my-projects/", { headers }),
//             axios.get("http://localhost:8000/api/my-backings/", { headers }),
//             axios.get("http://localhost:8000/api/me/", { headers }),
//             axios.get("http://localhost:8000/api/my-tickets/", { headers }),
//           ]);

//         setCreated(myProjects.data);
//         setBacked(myBackings.data);
//         setProfile(myProfile.data);
//         setTickets(myTickets.data);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-8">
//       <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
//         My Dashboard
//       </h1>

//       {profile && (
//         <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-200">
//           <div className="flex items-center gap-4 mb-4">
//             {profile.avatar ? (
//               <img
//                 src={profile.avatar}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full object-cover border"
//               />
//             ) : (
//               <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
//                 {profile.username[0].toUpperCase()}
//               </div>
//             )}
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">
//                 {profile.username}
//               </h2>
//               <p className="text-gray-500">{profile.email}</p>
//             </div>
//           </div>
//           {profile.bio && (
//             <p className="text-gray-700 mb-4 italic border-t pt-3">
//               {profile.bio}
//             </p>
//           )}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
//             <div className="bg-gray-100 rounded p-3">
//               <p className="text-lg font-bold">{created.length}</p>
//               <p className="text-gray-600">Created Projects</p>
//             </div>
//             <div className="bg-gray-100 rounded p-3">
//               <p className="text-lg font-bold">{backed.length}</p>
//               <p className="text-gray-600">Backed Projects</p>
//             </div>
//             <div className="bg-gray-100 rounded p-3">
//               <p className="text-lg font-bold">{tickets.length}</p>
//               <p className="text-gray-600">Tickets Purchased</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Created Projects
//         </h2>
//         {created.length === 0 ? (
//           <p className="text-gray-500">You haven’t created any projects yet.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {created.map((proj) => (
//               <Link
//                 key={proj.id}
//                 to={`/projects/${proj.id}`}
//                 className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
//               >
//                 <h3 className="font-semibold text-lg text-blue-600">
//                   {proj.title}
//                 </h3>
//                 {proj.description && (
//                   <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//                     {proj.description}
//                   </p>
//                 )}
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Backed Projects
//         </h2>
//         {backed.length === 0 ? (
//           <p className="text-gray-500">You haven’t backed any projects yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {backed.map((b) => (
//               <li
//                 key={b.backing_id}
//                 className="border rounded-lg p-4 bg-white shadow"
//               >
//                 <div className="font-semibold text-blue-600">
//                   {b.project_title}
//                 </div>
//                 <div className="text-sm text-gray-600">Amount: ${b.amount}</div>
//                 <div className="text-sm text-gray-500">{b.reward}</div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <section>
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Tickets Purchased
//         </h2>
//         {tickets.length === 0 ? (
//           <p className="text-gray-500">
//             You haven’t purchased any tickets yet.
//           </p>
//         ) : (
//           <ul className="space-y-4">
//             {tickets.map((t) => (
//               <li key={t.id} className="border rounded-lg p-4 bg-white shadow">
//                 <div className="font-semibold text-green-700">
//                   {t.event_title}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Quantity: {t.quantity}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function DashboardPage() {
//   const [created, setCreated] = useState([]);
//   const [backed, setBacked] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [profile, setProfile] = useState(null);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const [myProjects, myBackings, myProfile, myTickets] =
//           await Promise.all([
//             axios.get("http://localhost:8000/api/my-projects/", { headers }),
//             axios.get("http://localhost:8000/api/my-backings/", { headers }),
//             axios.get("http://localhost:8000/api/me/", { headers }),
//             axios.get("http://localhost:8000/api/my-tickets/", { headers }),
//           ]);

//         setCreated(myProjects.data);
//         setBacked(myBackings.data);
//         setProfile(myProfile.data);
//         setTickets(myTickets.data);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

//       {profile && (
//         <div className="bg-muted p-4 rounded mb-6">
//           <h2 className="text-xl font-bold mb-2">Profile Stats</h2>
//           <p>
//             <span className="font-medium">Username:</span> {profile.username}
//           </p>
//           <p>
//             <span className="font-medium">Email:</span> {profile.email}
//           </p>
//           {profile.bio && (
//             <p>
//               <span className="font-medium">Bio:</span> {profile.bio}
//             </p>
//           )}
//           <p className="mt-2 text-gray-600">
//             Created Projects: <strong>{created.length}</strong> | Backed
//             Projects: <strong>{backed.length}</strong> | Tickets:{" "}
//             <strong>{tickets.length}</strong>
//           </p>
//         </div>
//       )}

//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Created Projects</h2>
//         {created.length === 0 ? (
//           <p className="text-gray-600">You haven’t created any projects yet.</p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2">
//             {created.map((proj) => (
//               <Link
//                 key={proj.id}
//                 to={`/projects/${proj.id}`}
//                 className="border p-4 rounded hover:shadow transition"
//               >
//                 <h3 className="font-bold">{proj.title}</h3>
//                 <p className="text-sm text-gray-600">{proj.description}</p>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Backed Projects</h2>
//         {backed.length === 0 ? (
//           <p className="text-gray-600">You haven’t backed any projects yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {backed.map((b) => (
//               <li key={b.backing_id} className="border p-3 rounded">
//                 <div className="font-medium">{b.project_title}</div>
//                 <div className="text-sm text-gray-600">Amount: ${b.amount}</div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <section>
//         <h2 className="text-2xl font-bold mb-4">Tickets Purchased</h2>
//         {tickets.length === 0 ? (
//           <p className="text-gray-600">
//             You haven’t purchased any tickets yet.
//           </p>
//         ) : (
//           <ul className="space-y-2">
//             {tickets.map((t) => (
//               <li key={t.id} className="border p-3 rounded">
//                 <div className="font-medium">{t.event_title}</div>
//                 <div className="text-sm text-gray-600">
//                   Quantity: {t.quantity}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }
