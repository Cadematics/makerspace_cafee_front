import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RewardCard from "../components/RewardCard"; // Adjust path

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [rewards, setRewards] = useState([]); // ✅ Define rewards state
  const [activeTab, setActiveTab] = useState("Rewards");
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("Failed to load project", err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/rewards/?project=${id}`)
      .then((res) => setRewards(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!project) return <p className="p-6">Loading...</p>;

  console.log("the project object is: ", project);

  const today = new Date();
  const deadline = new Date(project.deadline);
  const timeDiff = deadline - today;
  const daysToGo = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {project?.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-lg shadow"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              ${parseFloat(project.current_funding).toLocaleString() || 0}
            </h2>
            <p className="text-gray-600 mb-4">
              pledged of ${parseFloat(project.funding_goal).toLocaleString()}{" "}
              goal
            </p>
            <h3 className="text-2xl font-semibold text-gray-900">
              {project.backers_count}
            </h3>
            <p className="text-gray-600 mb-4">backers</p>
            <h3 className="text-2xl font-semibold text-gray-900">{daysToGo}</h3>
            <p className="text-gray-600">days to go</p>
          </div>
          <button className="mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Back this project
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6 text-gray-600 text-base">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="category">
            📂
          </span>
          <span>{project.category || "Technology"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span role="img" aria-label="location">
            📍
          </span>
          <span>{project.location || "San Francisco, CA"}</span>
        </div>
      </div>

      <div className="my-6 h-px bg-gray-300" />

      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mt-8">
          <ul className="flex gap-6 text-gray-700 text-lg font-medium">
            {[
              "Campaign",
              "Rewards",
              "Creator",
              "FAQ",
              "Updates",
              "Comments",
              "Community",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>

          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition text-sm whitespace-nowrap">
            Back this project
          </button>
        </div>

        <div className="mt-6 text-gray-700">
          {activeTab === "Campaign" && (
            <div>
              <h2 className="text-xl font-bold mb-2">About This Project</h2>
              <p>{project.description}</p>
            </div>
          )}

          {activeTab === "Rewards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Choose a Reward</h2>
                {rewards.length > 0 ? (
                  rewards.map((reward) => (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      projectId={project.id}
                    />
                  ))
                ) : (
                  <p>No rewards available for this project yet.</p>
                )}
              </div>

              {/* Right Side - Selected Reward Info */}
              <div>
                {selectedReward && (
                  <div className="bg-white p-4 rounded-md shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedReward.title}
                    </h3>
                    <p className="text-gray-700">
                      {selectedReward.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Creator" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Created by</h2>
              <p className="text-gray-700">
                {project.author_name || "Unknown Creator"}
              </p>
            </div>
          )}
          {activeTab === "FAQ" && (
            <div>
              <p>FAQ will be displayed here.</p>
            </div>
          )}
          {activeTab === "Updates" && (
            <div>
              <p>Updates will be displayed here.</p>
            </div>
          )}
          {activeTab === "Comments" && (
            <div>
              <p>Comments will be displayed here.</p>
            </div>
          )}
          {activeTab === "Community" && (
            <div>
              <p>Community stuff will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function ProjectDetailsPage() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [activeTab, setActiveTab] = useState("Campaign");

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/projects/${id}/`)
//       .then((res) => setProject(res.data))
//       .catch((err) => console.error("Failed to load project", err));
//   }, [id]);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/rewards/?project=${id}`)
//       .then((res) => setRewards(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   // const fundingPercent = Math.min(
//   //   (parseFloat(project.current_funding) / parseFloat(project.funding_goal)) *
//   //     100,
//   //   100
//   // ).toFixed(0);

//   console.log("the project object: ", project);

//   if (!project) return <p className="p-6">Loading...</p>;

//   // console.log('the project object is', project)

//   // Calculate days remaining
//   const today = new Date();
//   const deadline = new Date(project.deadline); // Make sure the project has a 'deadline' field
//   const timeDiff = deadline - today;
//   const daysToGo = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);

//   return (
//     <div className="p-6 max-w-6xl mx-auto font-sans">
//       {/* Top section: Media + Info */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-1">
//           {project?.image && (
//             <img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-auto rounded-lg shadow"
//             />
//           )}
//         </div>

//         <div className="flex-1 flex flex-col justify-between">
//           <div>
//             {/* <h2 className="text-4xl font-bold text-gray-900">${project.current_funding || 0}</h2> */}
//             <h2 className="text-4xl font-bold text-gray-900">
//               ${parseFloat(project.current_funding).toLocaleString() || 0}
//             </h2>

//             <p className="text-gray-600 mb-4">
//               pledged of ${parseFloat(project.funding_goal).toLocaleString()}{" "}
//               goal
//             </p>

//             <h3 className="text-2xl font-semibold text-gray-900">683</h3>
//             <p className="text-gray-600 mb-4">backers</p>

//             <h3 className="text-2xl font-semibold text-gray-900">
//               {" "}
//               {daysToGo}
//             </h3>
//             <p className="text-gray-600">days to go</p>
//           </div>

//           <button className="mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
//             Back this project
//           </button>
//         </div>
//       </div>

//       {/* Category and Location */}
//       <div className="mt-8 flex items-center gap-6 text-gray-600 text-base">
//         <div className="flex items-center gap-2">
//           <span role="img" aria-label="category">
//             📂
//           </span>
//           <span>{project.category || "Technology"}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span role="img" aria-label="location">
//             📍
//           </span>
//           <span>{project.location || "San Francisco, CA"}</span>
//         </div>
//       </div>

//       <div className="my-6 h-px bg-gray-300" />

//       <div className="border-b border-gray-300">
//         <div className="flex items-center justify-between border-b border-gray-300 pb-2 mt-8">
//           {/* Tabs */}
//           <ul className="flex gap-6 text-gray-700 text-lg font-medium">
//             {[
//               "Campaign",
//               "Rewards",
//               "Creator",
//               "FAQ",
//               "Updates",
//               "Comments",
//               "Community",
//             ].map((tab) => (
//               <li
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`cursor-pointer ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {tab}
//               </li>
//             ))}
//           </ul>

//           {/* Back This Project Button */}
//           <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition text-sm whitespace-nowrap">
//             Back this project
//           </button>
//         </div>

//         <div className="mt-6 text-gray-700">
//           {activeTab === "Campaign" && (
//             <div>
//               <h2 className="text-xl font-bold mb-2">About This Project</h2>
//               <p>{project.description}</p>
//             </div>
//           )}
//           {activeTab === "Rewards" && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Choose a Reward</h2>
//               {rewards.length > 0 ? (
//                 rewards.map((reward) => (
//                   <div
//                     key={reward.id}
//                     className="border rounded-md p-4 mb-4 shadow-sm"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       ${reward.amount} — {reward.title}
//                     </h3>
//                     <p className="text-gray-600">{reward.description}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No rewards available for this project yet.</p>
//               )}
//             </div>
//           )}

//           {activeTab === "Creator" && (
//             <div>
//               <p>Creator info will be displayed here.</p>
//             </div>
//           )}

//           {activeTab === "FAQ" && (
//             <div>
//               <p>FAQ will be displayed here.</p>
//             </div>
//           )}

//           {activeTab === "Updates" && (
//             <div>
//               <p>Updates will be displayed here.</p>
//             </div>
//           )}
//           {activeTab === "Comments" && (
//             <div>
//               <p>Comments will be displayed here.</p>
//             </div>
//           )}
//           {activeTab === "Community" && (
//             <div>
//               <p>community stuff will be displayed here.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
