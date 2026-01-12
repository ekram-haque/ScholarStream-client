import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`);
    setEmail("");
  };

  return (
    <section className="w-full py-20  mb-24 bg-[#E3F8F8]">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-8">Get updates about new scholarships and latest blog posts</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-4 rounded-xl border border-gray-300 flex-1"
          />
          <button type="submit" className="bg-primary text-white px-6 py-4 rounded-xl hover:bg-secondary transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
