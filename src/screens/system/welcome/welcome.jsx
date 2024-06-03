import React from "react";
import Headers from "./Header";
import HeroSection from "./HeroSection";
import Feature from "./Feature";

function Welcome() {
  return (
    <div>
      <Headers />
      <main>
        <HeroSection />
        <Feature />
      </main>
    </div>
  );
}

export default Welcome;
