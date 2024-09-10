import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'

import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'

function DesignCourse() {
  return (
    <>
      <GlobalStyle />
      <GeneralHeader />
      <DesignCourseWrapper>
        <Sticky>
          <Sidebar />
        </Sticky>
        <MainDesignCourse />
      </DesignCourseWrapper>
      <FooterNew />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
  }
`

const DesignCourseWrapper = styled.main`
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
`

export default DesignCourse
