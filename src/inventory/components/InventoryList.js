import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryItem from "./InventoryItem";
import EditForm from "./EditForm";
import AddItemForm from "./AddItemForm";

import { connect } from "react-redux";
import { fetchItems, editItem, saveItem } from "../actions/inventoryActions";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    document.title = "Inventory : Ilara Pharmacy";
    console.log("loading inventory products");
    axios
      .get("inventory/products/")
      .then((res) => {
        const items = res.data.map(
          (item) =>
            new InventoryItem(
              item.id,
              item.name,
              item.description,
              item.price,
              item.quantity,
              item.category
            )
        );
        setInventory(items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAdd = () => {
    setShowForm(true);
  };
  const handleSaveNewItem = (newItem) => {
    setInventory([...inventory, newItem]);
    setShowForm(false);
  };
  const handleCancel = () => {
    setShowForm(false);
  };

  const handleEdit = (itemId) => {
    setEditingItem(itemId);
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`inventory/products/${itemId}/`)
      .then(() => {
        const updatedInventory = inventory.filter((item) => item.id !== itemId);
        setInventory(updatedInventory);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSave = (itemId, updatedItem) => {
    const updatedInventory = inventory.map((item) => {
      if (item.id === itemId) {
        return updatedItem;
      }
      return item;
    });
    setInventory(updatedInventory);
    setEditingItem(null);
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "15px",
          float: "left",
          color: "rgb(59 130 246)",
        }}
      >
        Inventory List
      </h1>
      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleAdd}
        style={{ float: "right", marginBottom: "15px" }}
      >
        Add New
      </button>
      {showForm && (
        <div style={{ float: "left", margin: "20px", padding: "10px" }}>
          <AddItemForm onSave={handleSaveNewItem} onCancel={handleCancel} />
        </div>
      )}

      {inventory.length ? (
        <table className="table-auto" style={{ width: "100%" }}>
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Category</th>

              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.category.name}</td>

                <td className="border px-4 py-2">
                  {editingItem === item.id ? (
                    <EditForm
                      item={item}
                      onSave={(updatedItem) => handleSave(item.id, updatedItem)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white p-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  items: state.items,
  editingItem: state.editingItem,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
  editItem: (id) => dispatch(editItem(id)),
  saveItem: (item) => dispatch(saveItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
