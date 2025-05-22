"use client";

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="pt-6 pb-6 bg-white md:w-[1170px] md:mx-auto">
      {/* Optional Top Bar */}
      <div className="h-[12vh] bg-white shadow-md flex items-center justify-between px-4 md:px-16">
        {/* You can add logo or contact info here if needed */}
      </div>

      {/* Main Footer */}
      <footer className="bg-[#80b934] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
               <Link href="/">
                           <button className="ml-4  text-xl sm:2xl md:3xl xl:4xl font-bold text-[#252B42] mt-3">
                               <Image src="/logo.png" alt="logo" width={100} height={80}/>
                           </button>
                           </Link>
            </div>
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company Info</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
            
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Disclaimer</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
              <p className="text-sm mb-3 text-gray-200">
                Stay updated with latest offers. Message us directly via WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Your Message"
                  className="flex-1 p-2 rounded-md text-white"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const email = document.getElementById("emailInput") as HTMLInputElement;
                    if (email && email.value) {
                      const whatsappMessage = `Hello, I want to subscribe with this email: ${encodeURIComponent(email.value)}`;
                      const phoneNumber = "923162391694";
                      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
                      window.open(whatsappURL, "_blank");
                    } else {
                      alert("Please enter your email address.");
                    }
                  }}
                  className="bg-[#25D366] hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Subscribe via WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 border-t border-white/30 pt-6 text-center">
            <p className="text-sm text-gray-200">
              Mudassir Medicos | All Rights Reserved © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
