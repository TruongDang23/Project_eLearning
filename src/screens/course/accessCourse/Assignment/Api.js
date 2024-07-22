import axios from "axios";
import { LANGUAGE_VERSIONS } from "./Constants";
const testCases = [
  { input: '1 2', expected: '3' },
  { input: '2 2', expected: '4' },
  { input: '3 -1', expected: '2' }
];
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston"
});
export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    // language: language,
    // version: LANGUAGE_VERSIONS[language],
    language: 'c',
    version: '*',
    files: [
      {
        content: sourceCode
      }
    ],
    stdin: testCases[2].input
  });
  return response.data;
};
