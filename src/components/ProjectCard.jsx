import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const fundingPercent = Math.min(
    (parseFloat(project.current_funding) / parseFloat(project.funding_goal)) * 100,
    100
  ).toFixed(0);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block hover:cursor-pointer"
    >
      <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-200 text-sm">
        {/* Image */}
        <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden rounded-t-md">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-1">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${fundingPercent}%` }}
            ></div>
          </div>

          {/* Funding Info */}
          <div className="text-[11px] text-gray-500 flex justify-between">
            <span><strong>${project.current_funding}</strong></span>
            <span>{fundingPercent}% funded</span>
          </div>

          {/* Location */}
          <p className="text-[11px] text-gray-400 mt-1">{project.location}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;















// import React from "react";

// function ProjectCard({ project }) {
//   const fundingPercent = Math.min(
//     (parseFloat(project.current_funding) / parseFloat(project.funding_goal)) * 100,
//     100
//   ).toFixed(0);

//   return (
//     <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-200 text-sm">
//       {/* Image */}
//       <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden rounded-t-md">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
//           {project.title}
//         </h3>
//         <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//           {project.description}
//         </p>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-1">
//           <div
//             className="bg-green-500 h-full"
//             style={{ width: `${fundingPercent}%` }}
//           ></div>
//         </div>

//         {/* Funding Info */}
//         <div className="text-[11px] text-gray-500 flex justify-between">
//           <span><strong>${project.current_funding}</strong></span>
//           <span>{fundingPercent}% funded</span>
//         </div>

//         {/* Location */}
//         <p className="text-[11px] text-gray-400 mt-1">{project.location}</p>
//       </div>
//     </div>
//   );
// }

// export default ProjectCard;
