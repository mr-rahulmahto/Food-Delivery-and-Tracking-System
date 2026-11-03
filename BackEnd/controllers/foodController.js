import foodModels from "../models/foodModels.js";
import fs from 'fs'

// add food item 
const addFood = async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "An image file is required" })
        }

        const image_filename = req.file.filename;
        const food = new foodModels({
            name:        req.body.name,
            description: req.body.description,
            price:       req.body.price,
            category:    req.body.category,
            image:       image_filename
        })
        try {
            await food.save();
            res.json({ success: true, message: "Food item added successfully" })
        } catch (error) {
            console.log(error)
            fs.unlink(`uploads/${image_filename}`, () => {})
            res.status(500).json({ success: false, message: "Unable to save food item" })
        }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModels.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Unable to load food items" })
    }
}

// Remove Food item
const removeFood = async (req, res) => {
   try {
    const food = await foodModels.findById(req.body.id);
    if (!food) {
        return res.status(404).json({ success: false, message: "Food item not found" })
    }
    fs.unlink(`uploads/${food.image}`, () => {})
    await foodModels.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Food item removed successfully" })
   } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Unable to remove food item" })
   }
}    

export { addFood, listFood, removeFood };
