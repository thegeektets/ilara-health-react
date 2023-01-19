class InventoryItem {
    constructor(id, name, description, price, quantity,category) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
      this.category = category;
    }
    
    // method to update the quantity of an item
    updateQuantity(newQuantity) {
      this.quantity = newQuantity;
    }
  }

  export default InventoryItem;

  