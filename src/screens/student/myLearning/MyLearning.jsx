import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'

function MyLearning() {
  return (
    <>
      <GlobalStyle />
      <GeneralHeader />
      <MyLearningWrapper>
        <h1>My Learning</h1>
      </MyLearningWrapper>
      <GeneralFooter />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
body {
    background-color: #F1F3F5 !important;
  }
`
const MyLearningWrapper = styled.main``

export default MyLearning
