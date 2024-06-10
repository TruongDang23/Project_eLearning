import React from "react";
import Headers from "./Header";
import HeroSection from "./HeroSection";
import Feature from "./Feature";
import HeadersOne from "./h1";
import HeroSectionOne from "./h2";
import FeatureOne from "./h3";

function Welcome() {
  return (
    <div>
      <Headers />
      <HeadersOne />
      <main>
        <HeroSection />
        <HeroSectionOne />
        <Feature />
        <FeatureOne />
      </main>
    </div>
  );
}

export default Welcome;
