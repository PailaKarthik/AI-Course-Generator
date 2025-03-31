"use client";

import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";


export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null)

 function sendEmail(formData) {
    const serviceId = "service_o4g2msu"; 
    const templateId = "template_4fprgkb"; 
    const userId = "uteOLn79vEZztaE0K"; 
   
  
    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        formRef.current.removeAttribute("disabled");
      })
      .catch((error) => {
        console.error("Failed to send email.", error);
      });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.setAttribute("disabled", "true");
    sendEmail({ email, message });
    setEmail("");
    setMessage("");
    alert("Your message has been sent successfully!");
  };

  return (
    <div className="flex flex-col min-h-[92vh] overflow-hidden">
      <div className="flex-1  flex flex-col">
        <div className="dark:bg-black bg-white py-6 px-4">
          <div className="max-w-3xl  mx-auto text-center">
            <h1 className="text-[#000000] dark:text-white text-6xl md:text-7xl font-bold mb-6 font-serif">Contact Us</h1>
            <p className="text-[#000000] dark:text-white text-lg max-w-2xl mx-auto font-serif">
              Have questions? The quickest way to get in touch with us is using the contact information below.
            </p>
          </div>
        </div>
        <div className="bg-[#000000] dark:bg-white flex-1 py-2 px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="dark:text-[#000000] text-white text-lg md:text-xl font-bold mb-2 text-center font-serif">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md dark:bg-gray-200 bg-white text-[#000000]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-md dark:bg-gray-200 bg-white text-[#000000]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center pt-0">
                <button
                  type="submit"
                  ref={formRef}
                  className="dark:bg-black bg-white text-[#000000] dark:text-white px-6 py-2 rounded-md font-medium hover:bg-[#d7d7d7] transition-colors"
                >
                  Submit 
                </button>
              </div>
            </form>

            <div className="flex justify-center dark:text-[#000000] text-white space-x-4 mt-10">
              <a href="#" className="text-2xl">
              <FaInstagram />
              </a>
              <a href="#" className="text-2xl">
              <IoLogoWhatsapp />
              </a>
              <a href="#" className="text-2xl">
              <FaXTwitter />
              </a>
              <a href="#" className="text-2xl">
              <FaLinkedin />
              </a>
              <a href="#" className="text-2xl">
              <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}