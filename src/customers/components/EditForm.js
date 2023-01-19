import React, { useState } from "react";
import axios from "axios";

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
      });
    onSave({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

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
    </form>
  );
};

export default EditForm;
