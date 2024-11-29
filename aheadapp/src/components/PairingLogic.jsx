import { useState, useRef } from "react";
import { Resend } from "resend";
import { Email } from "./email";
import emailjs from "@emailjs/browser";

// const form = useRef();
// ("use server");
// re_g2GdzTKA_9kybs71JzPstSkeLUSXn81hw

// async function send() {
//   "use server";

//   const resend = new Resend("re_g2GdzTKA_9kybs71JzPstSkeLUSXn81hw");

//   const { data } = await resend.emails.send({
//     from: "smtp.resend.com",
//     to: "clement.massit@u-bordeaux.fr",
//     subject: "hello world",
//     react: <Email />,
//   });

//   console.log(data);
// }

export default PairingLogic;
