import nodemailer from 'nodemailer';

export interface OrderItem {
    productName: string;
    quantity: number;
    price: number;
}

export interface OrderNotificationData {
    trackingId: string;
    customerName?: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    totalAmount: number;
    items: OrderItem[];
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOrderNotification(data: OrderNotificationData) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminWhatsApp = process.env.ADMIN_WHATSAPP;

    if (!adminEmail) {
        console.warn('ADMIN_EMAIL is not defined in environment variables. Email notification skipped.');
    } else {
        await sendEmail(adminEmail, data);
    }

    if (adminWhatsApp) {
        logWhatsAppMessage(adminWhatsApp, data);
    } else {
        console.warn('ADMIN_WHATSAPP is not defined. WhatsApp logging skipped.');
    }
}

async function sendEmail(to: string, data: OrderNotificationData) {
    const itemsHtml = data.items
        .map(
            (item) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.productName}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Rs. ${item.price.toLocaleString()}</td>
        </tr>
    `
        )
        .join('');

    const mailOptions = {
        from: `"CN Fragrances" <${process.env.SMTP_USER}>`,
        to: to,
        subject: `New Order Received - ${data.trackingId}`,
        html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                <h1 style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">New Order Placed</h1>
                <p style="text-align: center; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tracking ID: ${data.trackingId}</p>
                
                <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee;">
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Customer Details</h2>
                    <p><strong>Name:</strong> ${data.customerName || 'Guest'}</p>
                    <p><strong>Email:</strong> ${data.customerEmail}</p>
                    <p><strong>Phone:</strong> ${data.customerPhone}</p>
                    <p><strong>Shipping Address:</strong><br/>${data.shippingAddress}</p>
                </div>

                <div style="margin-top: 30px;">
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h2>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <thead>
                            <tr style="background-color: #f9f9f9;">
                                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Product</th>
                                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Qty</th>
                                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #333;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; text-transform: uppercase;">Total Amount:</td>
                                <td style="padding: 10px; font-weight: bold; border-top: 2px solid #333;">Rs. ${data.totalAmount.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
                    <p>&copy; ${new Date().getFullYear()} CN Fragrances. All rights reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${to} for order ${data.trackingId}`);
    } catch (error) {
        console.error('Error sending notification email:', error);
    }
}

function logWhatsAppMessage(phone: string, data: OrderNotificationData) {
    const itemsText = data.items
        .map((item) => `- ${item.productName} (x${item.quantity}): Rs. ${item.price.toLocaleString()}`)
        .join('\n');

    const message = `*NEW ORDER PLACED*\n\n` +
        `*ID:* ${data.trackingId}\n` +
        `*Customer:* ${data.customerName || 'Guest'}\n` +
        `*Phone:* ${data.customerPhone}\n` +
        `*Total:* Rs. ${data.totalAmount.toLocaleString()}\n\n` +
        `*Items:*\n${itemsText}\n\n` +
        `*Address:* ${data.shippingAddress}`;

    const waLink = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

    console.log('--- WHATSAPP NOTIFICATION ---');
    console.log(`To: ${phone}`);
    console.log(`Message: \n${message}`);
    console.log(`Universal Link: ${waLink}`);
    console.log('------------------------------');
}
