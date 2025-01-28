import nodemailer from "nodemailer";

// Create a transporter object


// Function to send an email
const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider (e.g., Gmail, Outlook, etc.)
        auth: {
            user: process.env.EMAIL_USER, // Your email address (from .env)
            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
    });

    try {
        const mailOptions = {
            from: `${process.env.EMAIL_USER}`, // Sender address
            to, // Recipient email
            subject, // Email subject
            text, // Plain text content
            html, // HTML content (optional)
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
