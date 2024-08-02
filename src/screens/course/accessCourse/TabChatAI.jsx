import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TabChatAI({ accessCourseData }) {
  const navigate = useNavigate()
  const [numberConver, setNumber] = useState(0)
  const [input, setInput] = useState([{
    role:  'user',
    content: 'Hello Chat Assistant'
  }])
  const [text, setText] = useState('')

  console.log(input)
  const handleClick = () => {
    setInput(
      [
        ...input,
        { role: 'user', content: text }
      ]
    );
    setNumber(prevNum => prevNum + 1)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/chat/chatAI', {
      params: {
        input
      }
    })
      .then(response => {
        setInput(
          [
            ...input,
            { role: 'assistant', content: response.data }
          ]
        )
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403)
          navigate('/403error')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberConver])
  return (
    <>
      <input onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleClick}>SEND</button>
    </>
  )
}

export default TabChatAI;
