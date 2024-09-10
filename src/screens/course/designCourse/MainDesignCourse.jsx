import styled from 'styled-components'
import { Element } from 'react-scroll'

function MainDesignCourse() {
  return (
    <MainDesignCourseWrapper>
      <h1>Design Your Course</h1>

      <Element name="general">
        <div className="design-general">
          <h2>General</h2>
          <hr />
        </div>
      </Element>

      <Element name="categories">
        <div className="design-categories">
          <h2>Categories</h2>
          <hr />
        </div>
      </Element>

      <Element name="intended-learners">
        <div className="design-intended">
          <h2>Intended learners</h2>
          <hr />
        </div>
      </Element>

      <Element name="course-structure">
        <div className="design-structure">
          <h2>Course Structure</h2>
          <hr />
        </div>
      </Element>

      <Element name="introduce-course">
        <div className="design-introduce">
          <h2>Introduce Course</h2>
          <hr />
        </div>
      </Element>
    </MainDesignCourseWrapper>
  )
}

const MainDesignCourseWrapper = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #1971c2;
    margin-bottom: 10px;
    text-align: center;
  }

  .design-general {
    margin-bottom: 20px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
  }

  .design-categories {
    margin-bottom: 20px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
  }

  .design-intended {
    margin-bottom: 20px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
  }

  .design-structure {
    margin-bottom: 20px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
  }

  .design-introduce {
    margin-bottom: 20px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
  }
`

export default MainDesignCourse
