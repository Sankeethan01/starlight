import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { wixClientServer } from '@/lib/wixClientServer';
import { media as cartImg } from "@wix/sdk";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail account email
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

export async function POST(req: Request) {

    const wixClient = wixClientServer()

  try {
    const body = await req.json();
    const { firstName, lastName, email, address, mobile} = body;

    const currentCart = await (await wixClient).currentCart.getCurrentCart();
    
const emailContent = `
  <h3>Thank you for your order, ${firstName} ${lastName}!</h3>
  <p>Here are your order details:</p>
  <P>Your Address : ${address}</p>
  <P>Your Mobile : ${mobile}</p>
  <div>
    ${currentCart.lineItems.map(item => `
      <div key="${item._id}" style="display: flex; gap: 16px;">
       <div>
        ${item.image ? `
          <img src="${cartImg.getScaledToFillImageUrl(item.image, 72, 96, {})}" 
               alt="cart-image" 
               width="72" 
               height="96" 
               style="border-radius: 8px; object-fit: cover;" />
        ` : ''}
        <h3 style="font-weight: 600;">${item.productName?.original}</h3>
       </div>
        <div style="padding: 8px; display: flex; align-items: center; gap: 15px;">
                ${item.quantity! > 0 ? `<div style="font-size: 17px; color: #333;">${item.quantity} x </div>` : ''}
                <span style="font-weight: bold;">LKR ${item.price?.amount}</span>
              </div>
      </div>
    `).join('')}
  </div>
  <div style="display: flex; justify-content: space-between; font-weight: 600; margin-top: 16px;">
    <span>Subtotal</span>
    <span>LKR ${currentCart.subtotal?.amount}</span>
  </div>
  <p>We will process your order and send you a confirmation email soon.</p>
`;



    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order confirmation for ${firstName}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error:any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
