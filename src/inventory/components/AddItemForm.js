import React, { useState, useEffect } from "react";
import axios from "axios";

const AddItemForm = ({ onSave, onCancel }) => {
  const [name] = useState("");
  const [description] = useState("");
  const [price] = useState(0);
  const [quantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    category: selectedCategory,
  });
  useEffect(() => {
    axios
      .get("inventory/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.category = JSON.parse(selectedCategory);
    console.log("formData", formData);

    axios
      .post("inventory/products/", {
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
    <form
      className="bg-white p-8 rounded-lg"
      onSubmit={handleSubmit}
      style={{ margin: "10px" }}
    >
      <div className="mb-4">
        <label htmlFor="name">Name:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description">Description:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price">Price:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity">Quantity:</label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label>
          Category:
          <select
            className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option disabled value="">
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
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

export default AddItemForm;
