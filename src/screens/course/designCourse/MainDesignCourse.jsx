import styled from 'styled-components'
import { Element } from 'react-scroll'
import { TextField } from '@mui/material'
import { useState, useContext } from 'react'

import { DesignCourseContext } from './DesignCourseContext'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function MainDesignCourse() {
  //* Context API from DesignCourseContext
  const { markSectionAsCompleted } = useContext(DesignCourseContext)
  //* Intended learners section
  const [intendedInputs, setInputs] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])
  const handleIntendedInputChange = (index, event) => {
    const newIntendedInputs = [...intendedInputs]
    newIntendedInputs[index].value = event.target.value
    setInputs(newIntendedInputs)
  }
  const handleIntendedAddMore = () => {
    setInputs([...intendedInputs, { value: '' }])
  }
  const handleIntendedRemoveInput = (index) => {
    const newInputs = intendedInputs.filter((_, i) => i !== index)
    setInputs(newInputs)
  }
  return (
    <MainDesignCourseWrapper>
      <h1>Design Your Course</h1>

      <Element name="general">
        <div className="design-general">
          <h2>General</h2>
          <hr />
          <div className="design-genral-button">
            <button onClick={() => markSectionAsCompleted('general')}>
              Save General
            </button>
          </div>
        </div>
      </Element>

      <Element name="categories">
        <div className="design-categories">
          <h2>Categories</h2>
          <hr />
          <div className="design-categories-button">
            <button onClick={() => markSectionAsCompleted('categories')}>
              Save Categories
            </button>
          </div>
        </div>
      </Element>

      <Element name="intended-learners">
        <div className="design-intended">
          <h2>Intended learners</h2>
          <hr />
          <h3>What will students learn in your course?</h3>
          <div className="design-intended-inputs">
            {intendedInputs.map((input, index) => (
              <div key={index} className="design-intended-input">
                <TextField
                  key={index}
                  placeholder={`e.g. Learning Java`}
                  value={input.value}
                  variant="outlined"
                  onChange={(e) => handleIntendedInputChange(index, e)}
                  InputProps={{
                    endAdornment: <span>200</span>,
                    style: { fontSize: '1.6rem', color: '#555' },
                    sx: {
                      height: '40px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(243, 243, 250, 0.8)',
                      color: '#187bce',
                      fontSize: '1.6rem',
                      paddingLeft: '10px',
                      outline: 'none',
                      transition: '0.3s all ease',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all ease',
                        border: 'none', // Loại bỏ border khi hover
                        boxShadow: '0 0 0 2px #187bce'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all',
                        border: 'none', // Loại bỏ border khi focus
                        boxShadow: '0 0 0 2px #187bce'
                      }
                    },
                    notchedOutline: {
                      border: 'none' // Loại bỏ border mặc định
                    }
                  }}
                  fullWidth
                />
                <button onClick={() => handleIntendedRemoveInput(index)}>
                  <span>
                    <CancelIcon />
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="design-intended-button">
            <button onClick={handleIntendedAddMore}>
              Add More{' '}
              <span>
                <AddCircleIcon />
              </span>
            </button>
            <button onClick={() => markSectionAsCompleted('intendedLearners')}>
              Save Intended Learners
            </button>
          </div>
        </div>
      </Element>

      <Element name="course-structure">
        <div className="design-structure">
          <h2>Course Structure</h2>
          <hr />
          <div className="design-structure-button">
            <button onClick={() => markSectionAsCompleted('courseStructure')}>
              Save Course Structure
            </button>
          </div>
        </div>
      </Element>

      <Element name="introduce-course">
        <div className="design-introduce">
          <h2>Introduce Course</h2>
          <hr />
          <div className="design-introduce-button">
            <button onClick={() => markSectionAsCompleted('introduceCourse')}>
              Save Introduce Course
            </button>
          </div>
        </div>
      </Element>
    </MainDesignCourseWrapper>
  )
}

const MainDesignCourseWrapper = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  width: 100%;
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
    height: 400px;
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
    .design-genral-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      button {
        background-color: #1971c2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        transition: 0.3s all ease;
        span {
          svg {
            font-size: 2rem;
          }
        }

        &:hover {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #1971c2;
        }
      }
    }
  }

  .design-categories {
    margin-bottom: 20px;
    height: 400px;
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
    .design-categories-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      button {
        background-color: #1971c2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        transition: 0.3s all ease;
        span {
          svg {
            font-size: 2rem;
          }
        }

        &:hover {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #1971c2;
        }
      }
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
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 10px;
    }
    .design-intended-inputs {
      margin: 0 auto;
      width: 90%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .design-intended-input {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
        button {
          background-color: #fff;
          border: none;
          svg {
            font-size: 3rem;
            color: #868e96;
            transition: 0.3s all ease;

            &:hover {
              color: #e03131;
              scale: 1.1;
            }
          }
        }
      }
    }
    .design-intended-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      button {
        background-color: #1971c2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        transition: 0.3s all ease;
        span {
          svg {
            font-size: 2rem;
          }
        }

        &:hover {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #1971c2;
        }
      }
    }
  }

  .design-structure {
    margin-bottom: 20px;
    height: 400px;
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
    .design-structure-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      button {
        background-color: #1971c2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        transition: 0.3s all ease;
        span {
          svg {
            font-size: 2rem;
          }
        }

        &:hover {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #1971c2;
        }
      }
    }
  }

  .design-introduce {
    margin-bottom: 20px;
    height: 400px;
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
    .design-introduce-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      button {
        background-color: #1971c2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        transition: 0.3s all ease;
        span {
          svg {
            font-size: 2rem;
          }
        }

        &:hover {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #1971c2;
        }
      }
    }
  }
`

export default MainDesignCourse
