import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from the frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  
  try {
    const { userId, items, amount, address } = req.body;

    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address: req.body.address
    });
    
    await newOrder.save();
    
    // Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 *80
        //expected amount in rupees

      },
      quantity: item.quantity
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2*100 * 80 // Delivery charge in cents (e.g., 2 INR)
      },
      quantity: 1
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const verfyOrder = async (req, res)=>{
  const {orderId, success} = req.body;
  try{
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId,{payment: true})
      res.json({success: true, message: "paid"})
    }else{
      await orderModel.findByIdAndUpdate(orderId);
      res.json({success:false, message:"Not paid"})
    }
  }catch(error){
    console.log(error);
    res.json({success:false, message:"Error"})

  }

}
//user orders for frontend

const userOrders = async (req, res)=>{
  try{
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true, data:orders})
  }catch(error){
    console.log(error);
    res.json({success:false, message:"Error"})
  }

}
// Listing orders for admin panel

const listOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success: true, data:orders})
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Error"})
    
  }

}
//api for updating order status
 const updateStatus = async(req, res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status})
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Error"})
    
  }

 }


export { placeOrder, verfyOrder, userOrders, listOrders, updateStatus };
