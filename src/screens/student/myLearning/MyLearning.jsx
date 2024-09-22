import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import Heading from './Heading'
import MainMyLearning from './MainMyLearning'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

import DataCourseMyLearning from '~/data/DataCourseMyLearning'

function MyLearning() {
  return (
    <>
      <Helmet>
        <title>My Learning | EL-Space</title>
      </Helmet>
      <GlobalStyle />
      <GeneralHeader />
      <MyLearningWrapper>
        <Heading />
        <MainMyLearning dataCourseMyLearning={DataCourseMyLearning} />
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
const MyLearningWrapper = styled.main`
  display: flex;
  flex-direction: column;
`

export default MyLearning
