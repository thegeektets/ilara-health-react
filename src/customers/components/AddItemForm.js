import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onSave, onCancel }) => {
  const [first_name] = useState("");
  const [last_name] = useState("");
  const [email] = useState(0);
  const [phone] = useState(0);
  const [formData, setFormData] = useState({
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
    console.log("formData", formData);

    axios
      .post("customer/customers/", {
        ...formData,
      })
      .then((response) => {
        formData.id = response.data.id;
        onSave({ ...formData });
      })
      .catch((error) => {
        console.log(error);
      });
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

export default AddItemForm;
