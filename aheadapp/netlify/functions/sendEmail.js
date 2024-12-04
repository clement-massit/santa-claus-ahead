import { sendEmail } from "@netlify/emails";

export const handler = async (event, context) => {
  try {
    let { email, giver, receiver } = JSON.parse(event.body);
    await sendEmail({
      from: "santa.claus.ahead@gmail.com", // Remplacez par votre email
      to: email,
      subject: "Secret SantaHead ",
      template: "subscribed", // Nom du modèle d'email (configuré dans votre tableau SendGrid)
      parameters: {
        giver,
        receiver,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        details: error.message,
      }),
    };
  }
};
