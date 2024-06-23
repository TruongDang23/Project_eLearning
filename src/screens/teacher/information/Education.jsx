import styled from 'styled-components'
import { useState } from 'react';
import { AddExpertise, AddCredential } from '~/components/popup/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Education ({ profile, setProfile }) {
  const [openExp, setopenExp] = useState(false)
  const [openCre, setopenCre] = useState(false)

  const toggleExp = () => { setopenExp(!openExp) }
  const toggleCre = () => { setopenCre(!openCre) }

  const deleteDegree = (index) => {
    const newDegrees = profile.degrees.filter((_, i) => i !== index);
    setProfile((prev) => ({
      ...prev,
      degrees: newDegrees
    }))
  }

  return (
    <>
      <Wrapper>
        <div className="expertise">
          <h4>Expertise:</h4>
          <div className="content-expertise">
            {profile.expertise.map((exp, index) => (
              <label key={index}>{exp}</label>
            ))}
          </div>
          <button onClick={toggleExp}>Add Expertise</button>
        </div>

        <div className="degree">
          <h4>Degree:</h4>
          <div className="content-degree">
            {profile.degrees.map((degree, index) => (
              <>
                <div className="contain">
                  <div key={index} className="degree-item">
                    <p><strong>School:</strong> {degree.school}</p>
                    <p><strong>Faculty:</strong> {degree.falcuty}</p>
                    <p><strong>Period:</strong> {degree.begin_time} - {degree.end_time}</p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon className='recycle-bin' sx={{ fontSize: '40px' }} onClick={() => deleteDegree(index)} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <button onClick={toggleCre}>Add Credential</button>
        </div>
      </Wrapper>
      {openExp && <AddExpertise handleClose={toggleExp} handleSave={setProfile} />}
      {openCre && <AddCredential handleClose={toggleCre} handleSave={setProfile} />}
    </>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h4{
      font-size: 2.2rem;
  }

  .expertise{
    height: auto;
    max-height:200px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    .content-expertise{
      max-height: 100px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    button{
      margin-top:10px;
      font-size: 2rem;
      border-radius: 5px;
      margin-left: 70%;
      transition: transform 0.3s;
      border:none;
      &:hover {
        font-weight: bold;
        transform: scale(1.05);
      }
    }
    label{
      margin-right: 10px;
      height: 50px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display:flex;
      align-items: center;
      color: white;
      background-color: #187bce;
    }
  }

  .degree{
    height:auto;
    max-height: 250px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;

    .content-degree{
      max-height: 140px;
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

        .degree-item {
          padding: 10px;
          margin: 10px 0;
          border-bottom: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          max-width: 600px;
          transition: background-color 0.3s;

          p {
            margin: 5px 0;
          }

          strong {
            color: #333;
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
      margin-left: 70%;
      transition: transform 0.3s;
      border:none;
      &:hover {
        font-weight: bold;
        transform: scale(1.05);
      }
    }

    label{
      margin-right: 10px;
      height: 50px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display:flex;
      align-items: center;
      color: white;
      background-color: #187bce;
    }

  }
`;

export default Education;