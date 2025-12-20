import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Link } from "react-router";

const scholarships = [
  {
    id: 1,
    title: "Doodle for Google Scholarship",
    amount: "$55,000",
    deadline: "December 10, 2025",
    desc:
      "Google has always been known as a champion for creativity and for creating environments...",
    tags: ["Artistic Ability", "Current Year in School"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 2,
    title: "Kemper Human Rights Essay Contest",
    amount: "$5,000",
    deadline: "December 10, 2025",
    desc:
      "The Kemper Human Rights Education Foundation offers scholarships to high school...",
    tags: ["GPA", "Selected Major(s)"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/HumanRightsLogo.png",
  },
  {
    id: 3,
    title: "Burger King Scholarship",
    amount: "$60,000",
    deadline: "December 15, 2025",
    desc:
      "The Burger King Foundation offers scholarships ranging from $1,000 to $60,000...",
    tags: ["GPA", "Financial Aid Status"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Burger_King_2020_logo.svg",
  },
  {
    id: 4,
    title: "Microsoft Tuition Scholarship",
    amount: "$20,000",
    deadline: "January 10, 2026",
    desc: "Microsoft supports students pursuing computer science education...",
    tags: ["Tech", "STEM"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 5,
    title: "Amazon Future Engineer Scholarship",
    amount: "$40,000",
    deadline: "January 15, 2026",
    desc: "Supporting future engineers with financial aid and internships...",
    tags: ["Engineering", "STEM"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 6,
    title: "NASA Space Grant Scholarship",
    amount: "$25,000",
    deadline: "February 1, 2026",
    desc: "NASA's scholarship for students passionate about space and aeronautics...",
    tags: ["Research", "STEM"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
  },
];

export default function TopScholarShip() {
  return (
    <div className="w-full mb-20 px-6 lg:px-24 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold"
      >
        Featured Scholarships
      </motion.h2>

      <p className="text-gray-600 mt-2 mb-6">
        Here are some of the best college scholarships with approaching deadlines.
      </p>

         <Link
            to="/all-scholarships"
            className="inline-block  bg-secondary text-black px-7 py-3 rounded-lg text-lg shadow-md hover:bg-primary hover:text-white transition"
          >
            View All 
          </Link>

      <div className="mt-10 relative overflow-visible">
        <Swiper
          className="pb-10 relative"
  style={{ paddingBottom: "60px" }}
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation={{
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  }}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000 }}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
        >
          {scholarships.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#E3F8F8] shadow-md rounded-3xl p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <img src={item.logo} alt={item.title} className="w-14 h-14 mb-4" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-medium">Amount:</span>
                    <span>{item.amount}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-medium">Deadline:</span>
                    <span>{item.deadline}</span>
                  </div>

                  <p className="text-gray-700 mt-4 text-sm line-clamp-3">{item.desc}</p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white px-3 py-1 rounded-full text-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-6 bg-secondary text-white py-2 rounded-xl  transition">
                  Apply Now
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="swiper-prev absolute -left-20 top-1/2 -translate-y-1/2 bg-[#E3F8F8] shadow-lg w-14 h-14 flex items-center justify-center rounded-full cursor-pointer z-50 text-2xl font-bold"> ← </div>
        <div className="swiper-next absolute -right-20 top-1/2 -translate-y-1/2 bg-[#E3F8F8] shadow-lg w-14 h-14 flex items-center justify-center rounded-full cursor-pointer z-50 text-2xl font-bold"> → </div>
      </div>
    </div>
  );
}
