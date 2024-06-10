import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Feature from "./Feature";
import CourseList from "./CourseList";
import Instructor from "./Instructor";

function Welcome() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Feature />
        <CourseList />
        <Instructor />
      </main>
    </div>
  );
}

export default Welcome;
