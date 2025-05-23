import React from 'react';
import './Contact.css'; // Optional for custom styles

export default function Contact() {
  return (
    <div className="contact-container p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>

      <p className="text-gray-600 mb-8 text-center">
        Whether you have a question, suggestion, or just want to say hello — we'd love to hear from you!
      </p>

      <form className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
