"use client";

import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import { toast } from "sonner";


export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null)

 function sendEmail(formData) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID; 
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID; 
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID; 
   
    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS configuration missing");
      toast.error("Email service not configured. Please contact support.");
      formRef.current.removeAttribute("disabled");
      return;
    }
  
    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success("Message sent successfully!");
        formRef.current.removeAttribute("disabled");
      })
      .catch((error) => {
        console.error("Failed to send email.", error);
        
        // Specific error handling for Gmail API issues
        if (error.text && error.text.includes("Gmail_API")) {
          toast.error("Email service temporarily unavailable. Please try again later or contact us directly.");
        } else if (error.status === 412) {
          toast.error("Email service needs reconnection. Please contact support.");
        } else {
          toast.error("Failed to send message. Please try again.");
        }
        
        formRef.current.removeAttribute("disabled");
      });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.setAttribute("disabled", "true");
    
    // Only clear form and show success after email is actually sent
    const formData = { email, message };
    sendEmail(formData);
    
    // Clear form fields immediately for better UX
    setEmail("");
    setMessage("");
    toast.success("Message sent successfully!", { type: "success" });
    setTimeout(() => {
      formRef.current.removeAttribute("disabled");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-[92vh] overflow-hidden bg-background">
      <div className="flex-1 flex flex-col">
      <ToastContainer />
        <div className="bg-background py-6 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground text-6xl md:text-7xl font-bold mb-6 font-serif">Contact Us</h1>
            <p className="text-foreground text-lg max-w-2xl mx-auto font-serif">
              Have questions? The quickest way to get in touch with us is using the contact information below.
            </p>
          </div>
        </div>
        <div className="bg-muted flex-1 py-8 px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-muted-foreground text-lg md:text-xl font-bold mb-2 text-center font-serif">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center pt-0">
                <button
                  type="submit"
                  ref={formRef}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit 
                </button>
              </div>
            </form>

            <div className="flex justify-center text-muted-foreground space-x-4 mt-10">
              <a href="#" className="text-2xl hover:text-foreground transition-colors">
              <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-foreground transition-colors">
              <IoLogoWhatsapp />
              </a>
              <a href="#" className="text-2xl hover:text-foreground transition-colors">
              <FaXTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-foreground transition-colors">
              <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-foreground transition-colors">
              <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}