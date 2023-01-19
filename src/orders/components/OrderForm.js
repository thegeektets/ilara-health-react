import axios from "axios";
import React, { useState, useEffect } from "react";

function OrderForm({ handleNewOrder }) {
  const [newProduct, setNewProduct] = useState({ product: "", quantity: "" });
  const [formData, setFormData] = useState({
    order_items: [],
    customer: "",
    status: { id: 1, name: "New" },
    price: 0,
  });
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      axios.get("/customer/customers/").then((res) => {
        setCustomers(res.data);
      });
    }
    async function fetchProducts() {
      axios.get("/inventory/products/").then((res) => {
        setProducts(res.data);
      });
    }
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    console.log("e.target.value", e.target.value);
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemove = (index) => {
    const updatedOrderItems = [...formData.order_items];
    formData.price =
      parseFloat(formData.price) -
      parseFloat(
        updatedOrderItems[index].total ? updatedOrderItems[index].total : 0
      );

    updatedOrderItems.splice(index, 1);
    setFormData({
      ...formData,
      order_items: updatedOrderItems,
    });
  };
  const isJSON = (str) => {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  };
  const handleProductAdd = () => {
    if (newProduct.product && newProduct.quantity) {
      console.log("newProduct.product", newProduct.product);
      let product = isJSON(newProduct.product)
        ? JSON.parse(newProduct.product)
        : newProduct.product;
      formData.price =
        parseFloat(formData.price) +
        parseFloat(product.price * newProduct.quantity);
      newProduct.price = product.price;
      newProduct.total = product.price * newProduct.quantity;
      newProduct.product = product;
      setFormData({
        ...formData,
        order_items: [...formData.order_items, newProduct],
      });
      setNewProduct({ product: null, quantity: "", price: "", total: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit", formData);
    let customer = isJSON(formData.customer)
      ? JSON.parse(formData.customer)
      : formData.customer;
    formData.customer = customer;
    axios
      .post("/order/orders/", formData)
      .then((res) => {
        handleNewOrder(res.data);
        setFormData({
          order_items: [],
          customer: "",
          status: { id: 1, name: "New" },
          price: "",
          quantity: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium mb-4">New Order</h3>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="order-items"
        >
          Order Items:
        </label>
        <div>
          <div>
            <label htmlFor="product">Product:</label>
            <select id="product" name="product" onChange={handleProductChange}>
              <option></option>
              {products.map((product) => (
                <option key={product.id} value={JSON.stringify(product)}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
            />
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleProductAdd();
            }}
          >
            Add
          </button>
        </div>
        {formData.order_items && formData.order_items.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.order_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product["name"]}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>

                  <td>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                      onClick={(event) => {
                        event.preventDefault();
                        handleRemove(index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="customer"
        >
          Customer:
        </label>
        <select
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleInputChange}
        >
          <option></option>
          {customers.map((customer) => (
            <option key={customer.id} value={JSON.stringify(customer)}>
              {`${customer.first_name} ${customer.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
          Price:
        </label>
        <input
          disabled
          className="border p-2 w-full"
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        type="submit"
        onClick={handleSubmit}
      >
        Create Order
      </button>
    </form>
  );
}

export default OrderForm;
