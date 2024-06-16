import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  textarea{
    font-size:2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    padding:10px;
    width: 100%;
    max-width: 600px;
    line-height: 1.5;
    transition: border-color 0.3s, border-width 0.3s;
    &:focus{
      border-color: #187BCE; 
      border-width: 2px;
      outline: none; /* Loại bỏ viền mặc định của trình duyệt */
    }
  }
`;

function SelfIntroduce ({ profile }) {
  return (
    <Wrapper>
      <textarea
        value='alskdjflaksjdlfkjasldkjflaksa'
        rows='3'
        cols='10'
      />
    </Wrapper>
  )
}

export default SelfIntroduce;