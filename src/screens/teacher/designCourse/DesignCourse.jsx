import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'

import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'
import { DesignCourseProvider } from './DesignCourseContext'

import { useState } from 'react'

function DesignCourse() {
  const [structure, setStructure] = useState({
    image_introduce: '',
    video_introduce: '',
    keywords: [],
    targets: [],
    requirements: [],
    chapters: []
  })
  console.log('structure: ', structure)
  return (
    <DesignCourseProvider>
      <GlobalStyle />
      <GeneralHeader />
      <DesignCourseWrapper>
        <Sticky disabled={window.innerWidth <= 768}>
          <Sidebar />
        </Sticky>
        <MainDesignCourse setStructure={setStructure}/>
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
    .sticky{
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
