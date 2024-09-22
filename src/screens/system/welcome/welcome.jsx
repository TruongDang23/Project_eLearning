import { GeneralHeader } from '~/components/general'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'
import Sticky from 'react-sticky-el'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function Welcome() {
  return (
    <>
      <Helmet>
        <title>Website ELearning | EL-Space</title>
      </Helmet>
      <Sticky disabled={window.innerWidth <= 768}>
        <GeneralHeader />
      </Sticky>
      <main>
        <HeroSection />
        <Feature />
        <CourseList />
        <Instructor />
      </main>
      <FooterNew />
    </>
  )
}

export default Welcome
