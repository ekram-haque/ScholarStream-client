import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all purchases."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact us through the Contact Us form or email support@example.com."
    },
    {
      question: "Do you offer international scholarships?",
      answer: "Yes, we list scholarships worldwide. You can filter them by country."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#E3F8F8] rounded-2xl py-16 mb-24" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left font-medium text-gray-800 focus:outline-none flex justify-between items-center"
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600 overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
