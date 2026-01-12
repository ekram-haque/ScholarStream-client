import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "../card/ScholarShipCard";

export default function TopScholarShip() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/top/scholarships")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading top scholarships...
      </div>
    );
  }

  return (
    <section className="w-full mb-24 px-6 lg:px-24 py-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900"
          >
            Featured Scholarships
          </motion.h2>

          <p className="text-gray-600 mt-2 max-w-xl">
            Explore top scholarships with upcoming deadlines from trusted
            institutions.
          </p>
        </div>

        <Link
          to="/all-scholarships"
          className="bg-secondary text-black px-7 py-3 rounded-xl font-semibold
          shadow-md hover:bg-primary hover:text-white transition"
        >
          View All
        </Link>
      </div>

      {/* SLIDER */}
      <div className="relative overflow-visible ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => `
      <span class="
        ${className}
        inline-block mx-1
        w-3 h-3 rounded-full
        bg-gray-300
        transition-all duration-300 
      "></span>
    `,
          }}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="
  pb-16 pt-6
  [&_.swiper-pagination]:bottom-0
  [&_.swiper-pagination]:mt-8
"
        >
          {scholarships.map((scholarship) => (
            <SwiperSlide>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className=" rounded-3xl shadow-sm p-6 py-5 h-full flex flex-col"
              >
                {/* TOP */}
                {<ScholarshipCard scholarship={scholarship} />}
    
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CUSTOM ARROWS */}
        <div
          className="swiper-prev absolute -left-16 top-1/2 -translate-y-1/2
          bg-white shadow-lg w-12 h-12 flex items-center justify-center
          rounded-full cursor-pointer z-50 text-xl hover:bg-primary hover:text-white"
        >
          ←
        </div>

        <div
          className="swiper-next absolute -right-16 top-1/2 -translate-y-1/2
          bg-white shadow-lg w-12 h-12 flex items-center justify-center
          rounded-full cursor-pointer z-50 text-xl hover:bg-primary hover:text-white"
        >
          →
        </div>
      </div>
    </section>
  );
}
