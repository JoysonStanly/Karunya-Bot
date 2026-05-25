import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import CoursesSection from "../components/CoursesSection";
import QuotesSection from "../components/QuotesSection";
import StudentLifeSection from "../components/StudentLifeSection";
import EventsGallery from "../components/EventsGallery";
import HiringStatsSection from "../components/HiringStatsSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <CoursesSection />
      <QuotesSection />
      <StudentLifeSection />
      <EventsGallery />
      <HiringStatsSection />
      <Footer />
    </div>
  );
}
