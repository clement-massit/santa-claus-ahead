import { sendEmail } from "@netlify/emails";

export const handler = async (event, context) => {
  try {
    let { email, name } = JSON.parse(event.body);
    await sendEmail({
      from: "santa.claus.ahead@gmail.com", // Remplacez par votre email
      to: email,
      subject: "Secret SantaHead ",
      template: "subscribed", // Nom du modèle d'email (configuré dans votre tableau SendGrid)
      parameters: {
        name,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        details: error.message,
      }),
    };
  }
};
