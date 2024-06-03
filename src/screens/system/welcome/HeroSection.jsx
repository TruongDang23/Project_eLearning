import React from "react";
import styles from "./HeroSection.module.css";
import heroImgPng from "../assets/test1.png";
function HeroSection() {
  return (
    <section className={styles.sectionHero}>
      <div className={styles.hero}>
        <div className="hero-text-box">
          <h1 className={styles.headingPrimary}>
            Learn essential skills for today and tomorrow
          </h1>
          <p className={styles.heroDescription}>
            Skills for your present (and your future). Unlock your potential
            with our online courses. Gain skills that matter today and shape
            your future. Start learning with us now!
          </p>
          <a href="#Learning" className={styles.heroBtnPrimary}>
            Start learning &rarr;
          </a>
          <a href="#learnmore" className={styles.heroBtnOutline}>
            Learn more &darr;
          </a>
        </div>
        <div className="hero-img-box">
          <picture>
            {/* <source srcSet={heroImgWebp} type="image/webp" /> */}
            <source srcSet={heroImgPng} type="image/png" />
            <img
              src={heroImgPng}
              className={styles.heroImg}
              alt="Hero Section Image"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
