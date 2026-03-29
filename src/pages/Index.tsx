// import Navbar from "@/components/Navbar";
// import HeroSection from "@/components/HeroSection";
// import ServicesSection from "@/components/ServicesSection";
// import FooterSection from "@/components/FooterSection";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <HeroSection />
//       <ServicesSection />
//       <FooterSection />
//     </div>
//   );
// };

// export default Index;















import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    // overflow-x-hidden prevents unwanted side-scrolling on mobile devices
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Main content wrapper with consistent responsive padding */}
      <main className="relative">
        <HeroSection />

        {/* Added vertical spacing that adjusts based on screen size (py-12 on mobile, py-24 on desktop) */}
        <div className="py-12 md:py-24">
          <ServicesSection />
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;