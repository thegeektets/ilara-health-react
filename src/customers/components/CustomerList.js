import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerItem from "./CustomerItem";
import EditForm from "./EditForm";
import AddItemForm from "./AddItemForm";

import { connect } from "react-redux";
import { fetchItems, editItem, saveItem } from "../actions/customerActions";

const CustomerList = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log("loading inventory products");
    axios
      .get("customer/customers/")
      .then((res) => {
        console.log(res.data);
        const items = res.data.map(
          (item) =>
            new CustomerItem(
              item.id,
              item.user,
              item.first_name,
              item.last_name,
              item.email,
              item.phone
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
      .delete(`customer/customers/${itemId}/`)
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
      <h1>Customer List</h1>
      <button className="bg-green-500 text-white p-2" onClick={handleAdd}>
        Add New
      </button>
      {showForm && (
        <AddItemForm onSave={handleSaveNewItem} onCancel={handleCancel} />
      )}

      {inventory.length ? (
        <table className="table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>

              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.first_name}</td>
                <td className="border px-4 py-2">{item.last_name}</td>
                <td className="border px-4 py-2">{item.phone}</td>
                <td className="border px-4 py-2">{item.email}</td>

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
