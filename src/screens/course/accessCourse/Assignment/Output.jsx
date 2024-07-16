import styled from "styled-components";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { executeCode } from "./Api";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
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
            color: isError ? "error.main" : "text.primary",
            border: "1px solid",
            borderRadius: 1,
            borderColor: isError ? "error.main" : "grey.500",
            overflow: "auto",
          }}
        >
          {output
            ? output.map((line, i) => (
                <Typography key={i} variant="subtitle1" component="p">
                  {line}
                </Typography>
              ))
            : 'Click "Run Code" to see the output here'}
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
