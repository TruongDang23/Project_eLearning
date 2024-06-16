import styled from 'styled-components'
import { useState } from 'react';

function Experience ({ profile }) {
  const [degrees, setDegrees] = useState([
    { school: 'Harvard University', faculty: 'Computer Science', period: '2015 - 2019' },
    { school: 'MIT', faculty: 'Mechanical Engineering', period: '2012 - 2016' },
    { school: 'Stanford University', faculty: 'Electrical Engineering', period: '2010 - 2014' }
  ]);

  return (
    <Wrapper>
      <div className="degree">
        <h4>Projects:</h4>
        <div className="content-degree">
          {degrees.map((degree, index) => (
            <div key={index} className="degree-item">
              <p><strong>School:</strong> {degree.school}</p>
              <p><strong>Faculty:</strong> {degree.faculty}</p>
              <p><strong>Period:</strong> {degree.period}</p>
            </div>
          ))}
        </div>
        <button>Add new</button>
      </div>

      <div className="degree">
        <h4>Working History:</h4>
        <div className="content-degree">
          {degrees.map((degree, index) => (
            <div key={index} className="degree-item">
              <p><strong>School:</strong> {degree.school}</p>
              <p><strong>Faculty:</strong> {degree.faculty}</p>
              <p><strong>Period:</strong> {degree.period}</p>
            </div>
          ))}
        </div>
        <button>Add new</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h4{
      font-size: 2.2rem;
  }

  .degree{
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
    .content-degree{
      max-height: 300px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      margin-top: 10px;
      margin-bottom: 10px;
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
    .degree-item {
      padding: 10px;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
    }

    .degree-item p {
      margin: 5px 0;
    }

    .degree-item strong {
      color: #333;
    }
  }
`;

export default Experience;