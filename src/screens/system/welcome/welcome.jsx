import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Feature from "./Feature";
import CourseList from "./CourseList";

function Welcome() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Feature />
        <CourseList />
      </main>
    </div>
  );
}

export default Welcome;
