import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Feature from "./Feature";

function Welcome() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Feature />
      </main>
    </div>
  );
}

export default Welcome;
