"use client";

import Head from "next/head";
import { Mail, Github, Linkedin } from "lucide-react";
import Image from "next/image";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Urban Flavour - Contact Us</title>
        <meta name="description" content="Get in touch with Urban Flavour. Contact us for any queries or support." />
        <meta property="og:title" content="Urban Flavour - Contact Us" />
        <meta property="og:description" content="Get in touch with Urban Flavour. Contact us for any queries or support." />
        <meta property="og:image" content="/path-to-your-image.jpg" /> {/* Adjust as needed */}
        <meta property="og:url" content="https://yourwebsite.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="bg-primary text-secondary min-h-screen flex flex-col items-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Contact Us</h1>
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            We’re here to help you with any questions or concerns.
          </h2>
          <p className="text-lg mb-8 text-center text-gray-600">
            Feel free to reach out to us through the form below or through any of our social media channels. We’re always happy to hear from you!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
              <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
              <form
                action="https://formspree.io/f/{your-form-id}" // Replace with your Formspree or other form handler URL
                method="POST"
                className="space-y-4"
              >
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Message</span>
                  <textarea
                    name="message"
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs w-full">
                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-gray-700 mr-3" />
                  <a href="mailto:codewithash.work@gmail.com" className="text-lg text-gray-700 hover:underline">
                    codewithash.work@gmail.com
                  </a>
                </div>
                <div className="flex items-center mb-4">
                  <Github className="w-6 h-6 text-gray-700 mr-3" />
                  <a href="https://github.com/Tech-Xposer" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:underline">
                    github.com/Tech-Xposer
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="w-6 h-6 text-gray-700 mr-3" />
                  <a href="https://www.linkedin.com/in/asharma73/" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:underline">
                    linkedin.com/in/asharma73
                  </a>
                </div>
              </div>

              {/* Illustration */}
              <div className="hidden md:block">
                <Image
                  src="/path-to-your-illustration.png" // Replace with the path to your illustration
                  alt="Contact Illustration"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
