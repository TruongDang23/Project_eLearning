import styled from 'styled-components'
import { useState } from 'react'
import { AddProject, AddWorking } from '~/components/popup/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Experience ({ profile, setProfile }) {
  const [openPro, setopenPro] = useState(false)
  const [openWork, setopenWork] = useState(false)

  const togglePro = () => { setopenPro(!openPro) }
  const toggleWork = () => { setopenWork(!openWork) }

  const deleteProject = (index) => {
    const newProjects = profile.projects.filter((_, i) => i !== index);
    setProfile((prev) => ({
      ...prev,
      projects: newProjects
    }))
  }

  const deleteWorking = (index) => {
    const newWorking = profile.working_history.filter((_, i) => i !== index);
    setProfile((prev) => ({
      ...prev,
      working_history: newWorking
    }))
  }

  return (
    <>
      <Wrapper>
        <div className="experience">
          <h4>Projects:</h4>
          <div className="content-experience">
            {profile.projects.map((project, index) => (
              <>
                <div className="contain">
                  <div key={index} className="experience-item">
                    <p><strong>Title:</strong> {project.title}</p>
                    <p><strong>Link:</strong><a href={project.link} target="_blank" rel="noreferrer">{project.link}</a></p>
                    <p><strong>Description:</strong> {project.description}</p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon className='recycle-bin' sx={{ fontSize: '40px' }} onClick={() => deleteProject(index)} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <button onClick={togglePro}>Add new</button>
        </div>

        <div className="experience">
          <h4>Working History:</h4>
          <div className="content-experience">
            {profile.working_history.map((work, index) => (
              <>
                <div className="contain">
                  <div key={index} className="experience-item">
                    <p><strong>Company:</strong> {work.company}</p>
                    <p><strong>Period:</strong> {work.begin_time} - {work.end_time}</p>
                    <p><strong>Description:</strong> {work.description}</p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon className='recycle-bin' sx={{ fontSize: '40px' }} onClick={() => deleteWorking(index)} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <button onClick={toggleWork}>Add new</button>
        </div>
      </Wrapper>
      {openPro && <AddProject handleClose={togglePro} handleSave={setProfile} />}
      {openWork && <AddWorking handleClose={toggleWork} handleSave={setProfile} />}
    </>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h4{
      font-size: 2.2rem;
  }

  .experience{
    height:auto;
    max-height: 400px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;

    .content-experience{
      max-height: 300px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      margin-top: 10px;
      margin-bottom: 10px;

      .contain {
        display: flex;
        align-items: center;

        &:hover {
          .recycle {
            opacity: 1;
            left: 10px;
          }
        }
        
        .recycle {
          cursor: pointer;
          opacity: 0;
          transition: left 0.3s ease, opacity 0.3s ease;
        }
      }
    }

    button{
      margin-top:10px;
      font-size: 2rem;
      border-radius: 5px;
      margin-left: 80%;
      transition: transform 0.3s;
      border:none;
      &:hover {
        font-weight: bold;
        transform: scale(1.05);
      }
    }

    .experience-item {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
    }

    .experience-item p {
      margin: 5px 0;
      max-width: 500px;
      word-wrap: break-word; 
    }

    .experience-item strong {
      color: #333;
    }
  }
`;

export default Experience;