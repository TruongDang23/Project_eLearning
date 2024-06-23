import styled from 'styled-components'
import SelfIntroduce from './SelfIntroduce'
import Education from './Education'
import Experience from './Experience'
import Published from './Published'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3{
    font-size: 2.2rem;
    color: #187bce;
    margin-bottom: 20px;
    margin-top:20px;  
  }
`;

function ExtraProfile ({ profile, setProfile }) {
  return (
    <Wrapper>
      <h3>Self - Introduce</h3>
      <SelfIntroduce profile={ profile } setProfile={setProfile}/>
      <h3>Education</h3>
      <Education profile={ profile } setProfile={setProfile}/>
      <h3>Experience</h3>
      <Experience profile={ profile } setProfile={setProfile}/>
      <h3>Courses Published</h3>
      <Published profile={ profile }/>
    </Wrapper>
  )
}

export default ExtraProfile;