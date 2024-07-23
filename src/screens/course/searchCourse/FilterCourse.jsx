import styled from "styled-components";

function FilterCourse(searchCourseData) {
  return (
    <FilterCourseWrapper>
      <h2>Filter</h2>
      <div>
        <h3>Category</h3>
        <ul>
          <li>
            <input type="checkbox" id="web" name="web" />
            <label htmlFor="web">Web Development</label>
          </li>
          <li>
            <input type="checkbox" id="mobile" name="mobile" />
            <label htmlFor="mobile">Mobile Development</label>
          </li>
          <li>
            <input type="checkbox" id="desktop" name="desktop" />
            <label htmlFor="desktop">Desktop Development</label>
          </li>
          <li>
            <input type="checkbox" id="network" name="network" />
            <label htmlFor="network">Network Development</label>
          </li>
        </ul>
      </div>
      <div>
        <h3>Level</h3>
        <ul>
          <li>
            <input type="checkbox" id="beginner" name="beginner" />
            <label htmlFor="beginner">Beginner</label>
          </li>
          <li>
            <input type="checkbox" id="intermediate" name="intermediate" />
            <label htmlFor="intermediate">Intermediate</label>
          </li>
          <li>
            <input type="checkbox" id="advanced" name="advanced" />
            <label htmlFor="advanced">Advanced</label>
          </li>
        </ul>
      </div>
      <div>
        <h3>Price</h3>
        <ul>
          <li>
            <input type="checkbox" id="free" name="free" />
            <label htmlFor="free">Free</label>
          </li>
          <li>
            <input type="checkbox" id="paid" name="paid" />
            <label htmlFor="paid">Paid</label>
          </li>
        </ul>
      </div>
    </FilterCourseWrapper>
  
  )
}

const FilterCourseWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  max-height: 100vh;
  overflow-y: auto;
`;

export default FilterCourse;
