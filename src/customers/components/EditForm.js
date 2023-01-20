import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const EditForm = ({ item, onSave, onCancel }) => {
  const [id] = useState(item.id);

  const [first_name] = useState(item.first_name);
  const [last_name] = useState(item.last_name);
  const [email] = useState(item.email);
  const [phone] = useState(item.phone);
  const [formData, setFormData] = useState({
    id: id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/customer/customers/" + item.id + "/", {
        ...formData,
      })
      .then((response) => {
        onSave({ ...formData });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          width:'300px',
          heightAuto: false,
          position:'top-center',
          text: error.message,
          icon: 'error',
          timer: 2000,
          showCloseButton: false
        })
      });
    onSave({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="first_name">First Name:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="last_name">Last Name:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Phone:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <button type="submit" className="bg-green-500 text-white p-2">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white p-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
