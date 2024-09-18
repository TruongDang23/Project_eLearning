import { GeneralHeader } from '~/components/general'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'
import Sticky from 'react-sticky-el'

function Welcome() {
  return (
    <div>
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
    </div>
  )
}

export default Welcome
