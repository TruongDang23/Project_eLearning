import styled from 'styled-components'
import heroImgPng from '../assets/hero.png'

function HeroSection() {
  return (
    <SectionHero>
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="headingPrimary">
            Learn essential skills for today and tomorrow
          </h1>
          <p className="heroDescription">
            Skills for your present (and your future). Unlock your potential
            with our online courses. Gain skills that matter today and shape
            your future. Start learning with us now!
          </p>
          <div className="heroBtns">
            <a href="#Learning" className="heroBtnPrimary">
              Start learning &rarr;
            </a>
            <a href="#learnmore" className="heroBtnOutline">
              Learn more &darr;
            </a>
          </div>
        </div>
        <div className="hero-img-box">
          <picture>
            {/* <source srcSet={heroImgWebp} type="image/webp" /> */}
            <source srcSet={heroImgPng} type="image/png" />
            <img
              src={heroImgPng}
              className="heroImg"
              alt="Hero Section Image"
            />
          </picture>
        </div>
      </div>
    </SectionHero>
  )
}

const SectionHero = styled.section`
  background-color: #d0ebff;
  padding: 4.8rem 0 9.6rem 0;

  .hero {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 3.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9.6rem;
    align-items: center;

    .hero-text-box {
      .headingPrimary {
        font-size: 5.2rem;
        line-height: 1.05;
        margin-bottom: 3.2rem;
        font-weight: 700;
        color: #333;
        letter-spacing: -0.5px;
      }

      .heroDescription {
        font-size: 2rem;
        line-height: 1.6;
        margin-bottom: 4.8rem;
      }

      .heroBtns {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.6rem;
        

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
        }

        .heroBtnPrimary {
          display: inline-block;
          padding: 1.6rem 4.8rem;
          font-size: 1.6rem;
          font-weight: 500;
          color: #fff;
          background-color: #1971c2;
          border: none;
          border-radius: 5px;
          text-transform: uppercase;
          text-decoration: none;
          margin-right: 1.6rem;
          transition: all 0.3s;

          &:hover {
            background-color: #155b96;
            transition: all 0.3s;
          }
        }

        .heroBtnOutline {
          display: inline-block;
          padding: 1.6rem 4.8rem;
          font-size: 1.6rem;
          font-weight: 500;
          color: #1971c2;
          background-color: #fff;
          border: 2px solid #1971c2;
          border-radius: 5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            background-color: #1971c2;
            color: #fff;
            transition: all 0.3s;
          }
        }
      }
    }

    .hero-img-box {
      .heroImg {
        width: 100%;
      }
    }
  }
  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 4.8rem;

      .hero-text-box {
        text-align: center;
      }
      .hero-img-box {
        display: none;
      }
    }
  }
  @media (min-width: 1400px) {
    .hero {
      max-width: 140rem;
    }
  }
`

export default HeroSection
