import React, { useState, useEffect } from "react";
import axios from "axios";

const EditForm = ({ item, onSave, onCancel }) => {
  const [name] = useState(item.name);
  const [description] = useState(item.description);
  const [price] = useState(item.price);
  const [quantity] = useState(item.quantity);
  const [selectedCategory] = useState(item.category);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: item.id,
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    category: selectedCategory,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
  const isJSON = (str) => {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.category = isJSON(formData.category)
      ? JSON.parse(formData.category)
      : formData.category;
    axios
      .put("/inventory/products/" + item.id + "/", {
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
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
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
