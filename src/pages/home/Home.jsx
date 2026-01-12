import Banner from "../../components/home/Banner";
import Contact from "../../components/home/Contact";
import FAQ from "../../components/home/FAQ";
import HowItWorks from "../../components/home/HowItWorks";
import Newsletter from "../../components/home/Newsletter";
import ScholarshipCategories from "../../components/home/ScholarshipCategories ";
import Statistics from "../../components/home/Statistics";
import Testimonials from "../../components/home/Testimonals";
import TopScholarship from "../../components/home/TopScholarShip";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Blogs from "../Blogs";

const Home = () => {
  return (
    <div>
      <Banner  />
      <TopScholarship/>
      <WhyChooseUs />
      <HowItWorks/>
      <ScholarshipCategories/>
      <Statistics/>
      <Testimonials/>
      <Blogs/>
      <Newsletter/>
      <FAQ/>
      <Contact/>
     
      
    </div>
  );
};

export default Home;
