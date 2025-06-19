import React, { useState } from "react";
import axios from "axios";

function PetitionForm({ onNewSignature }) {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip_code: "", // ✅ Use zip_code consistently
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/petitions/",
        {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          message: formData.message,
        }
      );

      setStatus("success");
      setFormData({
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        message: "",
      });

      if (onNewSignature) onNewSignature(response.data);
    } catch (error) {
      console.error("Failed to submit petition", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">Sign the Petition</h2>

      <label className="block mb-2">
        Your Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        Street Address:
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        State:
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        ZIP Code:
        <input
          type="text"
          name="zip_code" // ✅ Updated to match the state and backend
          value={formData.zip_code}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-4">
        Message (optional):
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Sign Petition
      </button>

      {status === "success" && (
        <p className="text-green-600 mt-2">Thank you for signing!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

export default PetitionForm;

// import React, { useState } from "react";
// import axios from "axios";

// function PetitionForm({ onNewSignature }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     message: "",
//   });

//   const [status, setStatus] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Combine full address from parts
//     const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`;

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/petitions/",
//         {
//           name: formData.name,
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           zip_code: formData.zip_code,
//           message: formData.message,
//         }
//       );

//       setStatus("success");
//       setFormData({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zip_code: "",
//         message: "",
//       });

//       if (onNewSignature) onNewSignature(response.data);
//     } catch (error) {
//       console.error("Failed to submit petition", error);
//       setStatus("error");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
//     >
//       <h2 className="text-xl font-semibold mb-4">Sign the Petition</h2>

//       <label className="block mb-2">
//         Your Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <label className="block mb-2">
//         Street Address:
//         <input
//           type="text"
//           name="street"
//           value={formData.street}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <label className="block mb-2">
//         City:
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <label className="block mb-2">
//         State:
//         <input
//           type="text"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <label className="block mb-2">
//         ZIP Code:
//         <input
//           type="text"
//           name="zip"
//           value={formData.zip_code}
//           onChange={handleChange}
//           required
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <label className="block mb-4">
//         Message (optional):
//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border border-gray-300 rounded"
//         />
//       </label>

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Sign Petition
//       </button>

//       {status === "success" && (
//         <p className="text-green-600 mt-2">Thank you for signing!</p>
//       )}
//       {status === "error" && (
//         <p className="text-red-600 mt-2">Something went wrong. Try again.</p>
//       )}
//     </form>
//   );
// }

// export default PetitionForm;
