import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Student",
    feedback:
      "ScholarStream helped me get a fully funded scholarship abroad!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Smith",
    role: "Graduate",
    feedback:
      "The platform is very intuitive and the scholarship filters are amazing.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Sophia Lee",
    role: "Masters Student",
    feedback:
      "I found multiple scholarships that perfectly matched my profile.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-20 ">
      <div className="max-w-7xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          What Students Say
        </motion.h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          centeredSlides
          loop
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="pb-12"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#E3F8F8] p-8 rounded-3xl shadow-md hover:shadow-xl
                max-w-md mx-auto"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-secondary"
                />

                <p className="text-gray-700 mb-4 italic">
                  “{t.feedback}”
                </p>

                <h4 className="font-semibold text-lg">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
