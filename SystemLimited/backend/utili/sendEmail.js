import transporter from "../config/mail.js";

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Systme_Limited" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email failed:", error);
    throw new Error("Unable to send email");
  }
};

export default sendEmail;
