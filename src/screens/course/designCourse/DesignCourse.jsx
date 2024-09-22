import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'
import { DesignCourseProvider } from './DesignCourseContext'

function DesignCourse() {
  return (
    <DesignCourseProvider>
      <GlobalStyle />
      <Helmet>
        <title>Design Course | EL-Space</title>
      </Helmet>
      <GeneralHeader />
      <DesignCourseWrapper>
        <Sticky disabled={window.innerWidth <= 768}>
          <Sidebar />
        </Sticky>
        <MainDesignCourse />
      </DesignCourseWrapper>
      <FooterNew />
    </DesignCourseProvider>
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .sticky {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    margin: 10px;
  }

  @media (max-width: 768px) {
    margin: 5px;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`

export default DesignCourse
