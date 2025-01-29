import nodemailer from 'nodemailer';
import * as env from '../config/env';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the transporter (example using Gmail)
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or use any other service
      auth: {
        user: env.EMAIL_USER, // Your email
        pass: env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });
  }

  // Send an email
  private async sendEmail(options: EmailOptions) {
    try {
      const info = await this.transporter.sendMail({
        from: `"ECommerceApp Team" <${env.EMAIL_USER}>`, // sender address with a name
        to: options.to, // recipient address
        subject: options.subject,
        text: options.text,
        html: options.html, // optional, for HTML formatted emails
      });
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }

  // Send a welcome email after account creation
  public sendWelcomeEmail(userEmail: string, userName: string) {
    const subject = `Welcome to ECommerceApp, ${userName}!`;
    const text = `Hello ${userName},\n\nThank you for creating an account with us. We're excited to have you!`;
    const html = `
      <p style="font-family: Arial, sans-serif; color: #333;">
        <strong>Hello ${userName},</strong><br><br>
        Thank you for creating an account with us. We're excited to have you on board!<br><br>
        Feel free to explore our wide range of products and enjoy shopping.<br><br>
        Best regards,<br>
        <span style="font-weight: bold;">ECommerceApp Team</span>
      </p>
    `;
    
    this.sendEmail({
      to: userEmail,
      subject,
      text,
      html,
    });    
  }

  // Send an email after an order is placed
  public sendOrderConfirmation(userEmail: string, orderId: string) {
    const subject = `Order Confirmation - ${orderId}`;
    const text = `Your order ${orderId} has been successfully placed. We'll notify you once it's shipped.`;
    const html = `
      <p style="font-family: Arial, sans-serif; color: #333;">
        <strong>Your order ${orderId}</strong> has been successfully placed. We're preparing it for shipment.<br><br>
        We'll notify you as soon as it's on the way!<br><br>
        If you have any questions, feel free to contact our customer support.<br><br>
        Best regards,<br>
        <span style="font-weight: bold;">ECommerceApp Team</span>
      </p>
    `;
    
    this.sendEmail({
      to: userEmail,
      subject,
      text,
      html,
    });
  }
}

export default new EmailService();
