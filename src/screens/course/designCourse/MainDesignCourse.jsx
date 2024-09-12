import styled from 'styled-components'
import { Element } from 'react-scroll'
import { TextField } from '@mui/material'
import { useState, useContext } from 'react'

import { DesignCourseContext } from './DesignCourseContext'
import { categories } from '~/constants/listCategories'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadFile from './UploadFile'

function MainDesignCourse() {
  //* Context API from DesignCourseContext
  const { markSectionAsCompleted } = useContext(DesignCourseContext)
  //* General section
  const [generalTitle, setGeneralTitle] = useState('')
  const maxGeneralTitleLength = 80
  const handleGeneralTitleChange = (event) => {
    const inputValue = event.target.value
    if (inputValue.length <= maxGeneralTitleLength) {
      setGeneralTitle(inputValue)
    }
  }
  //* Intended learners section
  // About intendedInputs
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
  // About requirement inputs
  const [requirementInputs, setRequirementInputs] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])
  const handleRequirementInputChange = (index, event) => {
    const newRequirementInputs = [...requirementInputs]
    newRequirementInputs[index].value = event.target.value
    setRequirementInputs(newRequirementInputs)
  }
  const handleRequirementAddMore = () => {
    setRequirementInputs([...requirementInputs, { value: '' }])
  }
  const handleRequirementRemoveInput = (index) => {
    const newInputs = requirementInputs.filter((_, i) => i !== index)
    setRequirementInputs(newInputs)
  }

  return (
    <MainDesignCourseWrapper>
      <h1>Design Your Course</h1>

      <Element name="general">
        <div className="design-general">
          <h2>General</h2>
          <hr />
          <div className="design-general-title">
            <h3>Title of Course</h3>
            <TextField
              placeholder="e.g. Java Programming for Beginners"
              helperText={`${generalTitle.length}/${maxGeneralTitleLength}`}
              variant="outlined"
              fullWidth
              value={generalTitle}
              onChange={handleGeneralTitleChange}
              InputProps={{
                endAdornment: (
                  <span>{maxGeneralTitleLength - generalTitle.length}</span>
                ),
                style: { fontSize: '1.6rem', color: '#555' },
                sx: {
                  height: '40px',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(243, 243, 250, 0.8)',
                  color: '#187bce',
                  fontSize: '1.6rem',
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
            />
          </div>
          <div className="design-genral-button">
            <button
              id="btn-primary"
              onClick={() => markSectionAsCompleted('general')}
            >
              Save General
            </button>
          </div>
        </div>
      </Element>

      <Element name="categories">
        <div className="design-categories">
          <h2>Categories</h2>
          <hr />
          <h3>What categories best fits the knowledge you will share ?</h3>
          <div className="design-categories-selects">
            <select defaultValue="" required>
              <option value="" disabled hidden>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="design-categories-button">
            <button
              id="btn-primary"
              onClick={() => markSectionAsCompleted('categories')}
            >
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
                <a id="cancel" onClick={() => handleIntendedRemoveInput(index)}>
                  <span>
                    <CancelIcon />
                  </span>
                </a>
              </div>
            ))}
            <div className="design-intended-input-addmore">
              <button id="btn-secoundary" onClick={handleIntendedAddMore}>
                Add More{' '}
                <span>
                  <AddCircleIcon />
                </span>
              </button>
            </div>
          </div>
          <h3>
            What are the requirements of prerequisites for taking your course?
          </h3>
          <div className="design-intended-inputs">
            {requirementInputs.map((input, index) => (
              <div key={index} className="design-intended-input">
                <TextField
                  key={index}
                  placeholder={`e.g. Basic Java`}
                  value={input.value}
                  variant="outlined"
                  onChange={(e) => handleRequirementInputChange(index, e)}
                  InputProps={{
                    endAdornment: <span>200</span>,
                    style: { fontSize: '1.6rem', color: '#555' },
                    sx: {
                      height: '40px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(243, 243, 250, 0.8)',
                      color: '#187bce',
                      fontSize: '1.6rem',
                      outline: 'none',
                      transition: '0.3s all',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all',
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
                      border: 'none' // Lo
                    }
                  }}
                  fullWidth
                />
                <a
                  id="cancel"
                  onClick={() => handleRequirementRemoveInput(index)}
                >
                  <span>
                    <CancelIcon />
                  </span>
                </a>
              </div>
            ))}
            <div className="design-intended-input-addmore">
              <button id="btn-secoundary" onClick={handleRequirementAddMore}>
                Add More{' '}
                <span>
                  <AddCircleIcon />
                </span>
              </button>
            </div>
          </div>

          <div className="design-intended-button">
            <button
              id="btn-primary"
              onClick={() => markSectionAsCompleted('intendedLearners')}
            >
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
            <button
              id="btn-primary"
              onClick={() => markSectionAsCompleted('courseStructure')}
            >
              Save Course Structure
            </button>
          </div>
        </div>
      </Element>

      <Element name="introduce-course">
        <div className="design-introduce">
          <h2>Introduce Course</h2>
          <hr />
          <div className="design-introduce-image">
            <h3>Course Image</h3>
            <UploadFile uniqueId="introduceImage" type="image" />
          </div>
          <div className="design-introduce-video">
            <h3>Promotional Video</h3>
            <UploadFile uniqueId="introduce-video" type="video" />
          </div>
          <div className="design-introduce-button">
            <button
              id="btn-primary"
              onClick={() => markSectionAsCompleted('introduceCourse')}
            >
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

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1971c2;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  hr {
    margin-bottom: 10px;
    border: none;
    height: 2px;
    background-color: #1971c2;
  }

  #btn-primary {
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
    #btn-main span {
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

  #btn-secoundary {
    background-color: #6c757d;
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
    transition: 0.3s all ease;

    span svg {
      font-size: 1.6rem;
    }

    &:hover {
      background-color: #fff;
      color: #6c757d;
      box-shadow: 0 0 0 2px #6c757d;
    }
  }

  .design-general {
    margin-bottom: 20px;
    height: 400px;

    .design-general-title {
    }
    .design-genral-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-categories {
    margin-bottom: 20px;
    .design-categories-selects {
      select {
        width: 100%;
        height: 4rem;
        padding: 8px;
        margin: 0 auto;
        font-size: 1.6rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        transition: border-color 0.3s, border-width;
        &:focus {
          border-color: #187bce;
          border-width: 2px;
          outline: none;
        }
      }
    }
    .design-categories-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-intended {
    margin-bottom: 20px;
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
        a {
          background-color: #fff;
          border: none;
          &:hover {
            border: none !important;
          }
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
      .design-intended-input-addmore {
        display: flex;
        justify-content: center;
      }
    }
    .design-intended-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-structure {
    margin-bottom: 20px;
    height: 400px;

    .design-structure-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-introduce {
    margin-bottom: 20px;

    .design-introduce-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }
`

export default MainDesignCourse
