import FoodModel from "../models/foodModel.js"; // Assuming you have a food model

// Add food item
const addFood = async (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newFood = new FoodModel({ name, price, image });
    await newFood.save();
    res.json({ success: true, message: "Food item added", data: newFood });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};

// List food items
const listFood = async (req, res) => {
  try {
    const foodItems = await FoodModel.find();
    res.json({ success: true, data: foodItems });
  } catch (error) {
    console.error("Error listing food items:", error);
    res.status(500).json({ success: false, message: "Error listing food items" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  const { id } = req.body;

  try {
    const foodItem = await FoodModel.findByIdAndDelete(id);
    if (!foodItem) {
      return res.json({ success: false, message: "Food item not found" });
    }
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};

export { addFood, listFood, removeFood };
