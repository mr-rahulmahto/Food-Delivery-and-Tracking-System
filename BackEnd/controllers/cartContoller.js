import userModel from "../models/userModel.js";

// Add items to user cart 
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error("addToCart error:", error);
        res.json({ success: false, message: error.message || "Error adding to cart" });
    }
}

// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error("removeFromCart error:", error);
        res.json({ success: false, message: error.message || "Error removing from cart" });
    }
}

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found", cartData: {} });
        }
        const cartData = userData.cartData || {};
        res.json({ success: true, message: "Cart Data", cartData });
    } catch (error) {
        console.error("getCart error:", error);
        res.json({ success: false, message: error.message || "Error fetching cart" });
    }
}

export { addToCart, removeFromCart, getCart };
