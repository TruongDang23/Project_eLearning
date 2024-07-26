/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import axios from "axios";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

function Output({ editorRef, language, testcases }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [correct, setCorrect] = useState(0)
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const userData = JSON.parse(localStorage.getItem('userAuth'))
  const num_topics = JSON.parse(localStorage.getItem('assignment')).topics.length
  const params = useParams()
  const [searchParam] = useSearchParams()
  const title = params.courseID + params.id + searchParam.get('page')
  const [output, setOutput] = useState();
  const navigate = useNavigate()

  const [progress, setProgress] = useState({
    userID: userData.userID,
    courseID: params.courseID,
    lectureID: params.id,
    percent: 0
  })

  const handleProgress = () => {
    const code = JSON.parse(localStorage.getItem(title))

    if (code !== null && code.result === 'Accepted') {
      setCorrect(correct)
    }
    else {
      setCorrect(prevCorrect => prevCorrect + 1)
    }
  }

  useEffect(() => {
    console.log('correct value changed:', correct)
    setProgress((prev) => ({
      ...prev,
      percent: (correct*100 / num_topics).toFixed(1)
    }))
  }, [correct]);

  useEffect(() => {
    const code = JSON.parse(localStorage.getItem(title))
    const isNull = (code === null) ? null : code.result
    if (isNull === 'Accepted') {
      setIsError(false)
    } else if (isNull !== null) {
      setIsError(true)
    }
    setOutput(isNull)
  }, [title])

  useEffect(() => {
    axios.post('http://localhost:3000/c/updateNewProgress',
      {
        progress
      },
      {
        headers: {
          'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
          'user': userAuth
        }
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
  }, [progress.percent])

  console.log(progress)
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try
    {
      setIsLoading(true)
      const res = await axios.post('http://localhost:3000/c/acceptAssignment',
        { language, sourceCode, testcases },
        {
          headers: {
            'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
            'user': userAuth
          }
        }
      )
      if (res.data === true)
      {
        handleProgress()
        let result = 'Accepted'
        localStorage.setItem(title, JSON.stringify({ sourceCode, result }))
        setOutput(result)
        setIsError(false)
      }
      else
      {
        let result = 'Wrong answer at testcase: ' + res.data.testcase + '\n' +
                      'Expected: ' + res.data.expected + '\n' +
                      'Found: ' + res.data.found
        localStorage.setItem(title, JSON.stringify({ sourceCode, result }))
        setOutput(result);
        setIsError(true);
      }
    }
    catch (error) {
      setErrorMessage(error.message || "Unable to run code");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OutputWrapper>
      <Box sx={{ width: "100%" }}>
        <Button
          variant="outlined"
          onClick={runCode}
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Run Code"}
        </Button>
        <Box
          sx={{
            height: "10rem",
            p: 2,
            color: isError ? "error.main" : "#4CAF50",
            borderRadius: 1,
            borderColor: isError ? "error.main" : "grey.500",
            overflow: "auto",
            backgroundColor: "#1e1e1e",
            fontSize: "1.6rem",
            whiteSpace: "pre-wrap",
            lineHeight: "2rem"
          }}
        >
          {output
            ? output
            : (
              <>
                <p style={{ color:'#e3e3e3' }}>Click "Run Code" to see the output here</p>
              </>
            )}
        </Box>
        <Snackbar
          open={isError && !!errorMessage}
          autoHideDuration={6000}
          onClose={() => setIsError(false)}
        >
          <Alert
            onClose={() => setIsError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </OutputWrapper>
  );
}

const OutputWrapper = styled.section`
  grid-column: 2 / 3;
  width: 100%;
  margin-top: 1rem;


  button {
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
    background-color: #fff;
    color: #1971c2;
    box-shadow: 0 0 0 1px #1971c2;
    &:hover {
      background-color: #1971c2;
      color: #fff;
      transition: all 0.3s;
    }
  }

  h6 {
    font-size: 1.6rem;
  }
`;

export default Output;
