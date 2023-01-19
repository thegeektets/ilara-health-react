import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);
  const [formData, setFormData] = useState({
    name: name,
    description: description,
    price: price,
    quantity: quantity
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/inventory/products' + item.id, {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    })
    .then(response => {
        onSave({ ...formData });
    })
    .catch(error => {
        console.log(error);
    });
    onSave({
      id: item.id,
      name,
      description,
      price,
      quantity,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="bg-green-500 text-white p-2">Save</button>
      <button type="button" onClick={onCancel} className="bg-red-500 text-white p-2">Cancel</button>
    </form>
  );
};

export default EditForm;