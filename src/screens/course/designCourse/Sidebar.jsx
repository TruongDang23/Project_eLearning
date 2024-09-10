import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

function Sidebar() {
  return (
    <SidebarWrapper>
      <div className="sidebar-container">
        <h3>Publish Your Course</h3>
        <div className="sidebar-content">
          <button>
            Type of Course
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
          <button>
            General
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
          <button>
            Course Content
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
        </div>
      </div>
      <div className="sidebar-container">
        <h3>Plan Your Course</h3>
        <div className="sidebar-content">
          <button>
            Intended learners
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
          <button>
            Course Structure
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
          <button>
            Introduce Course
            <span>
              <CheckCircleOutlineIcon />
            </span>
          </button>
        </div>
      </div>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all ease 0.3s;
  }
  .sidebar-container {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    .sidebar-content {
      display: flex;
      flex-direction: column;
      button {
        background-color: #fff;
        ${'' /* background-color: #f5f5f5; */}
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border: none;
        font-size: 1.6rem;
        svg {
          font-size: 2rem;
          color: #37b24d;
        }
      }
    }
  }
`

export default Sidebar
