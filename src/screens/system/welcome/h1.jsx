import * as React from "react";
import "./h1.css";

function MyComponent() {
  return (
    <section className="hero-section">
      <div className="content">
        <h1>Learn on your schedule</h1>
        <p>
          Study any topic, anytime. Explore thousands of courses starting at
          $12.99 each.
        </p>
        <div className="buttons">
          <a href="#" className="button primary">
            Get Started
          </a>
          <a href="#" className="button secondary">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default MyComponent;
