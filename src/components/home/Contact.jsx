import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thank you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full py-20 bg-[#E3F8F8] mb-24 rounded-lg">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">Have questions? Reach out and we’ll get back to you.</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-4 rounded-xl border border-gray-300"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 rounded-xl border border-gray-300"
          />
          <textarea
            required
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-4 rounded-xl border border-gray-300 h-40 resize-none"
          />
          <button type="submit" className="bg-primary text-white px-6 py-4 rounded-xl hover:bg-secondary transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
