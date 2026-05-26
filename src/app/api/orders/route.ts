import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(request: Request) {
  try {
    const { userEmail, shippingAddress, items, totalAmount } = await request.json();

    if (!userEmail || !shippingAddress || !items || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    const { firstName, lastName, address, city, state, zip } = shippingAddress;
    if (!firstName || !lastName || !address || !city || !state || !zip) {
      return NextResponse.json(
        { error: "Complete shipping address is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create the order
    const newOrder = await Order.create({
      userEmail: userEmail.toLowerCase(),
      shippingAddress,
      items: items.map(item => {
        const priceStr = item.price;
        const itemRate = (priceStr && typeof priceStr === "string")
            ? parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0
            : typeof priceStr === "number" ? priceStr : 0;
        
        const quantity = Number(item.quantity) || 1;
        const price = Number((itemRate * quantity).toFixed(2));
            
        return {
          productId: item.id || item.productId,
          name: item.name,
          selectedMg: item.selectedMg || "",
          quantity,
          itemRate,
          price,
          image: item.image || ""
        };
      }),
      totalAmount,
      paymentStatus: "pending"
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId: newOrder._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while placing your order" },
      { status: 500 }
    );
  }
}
