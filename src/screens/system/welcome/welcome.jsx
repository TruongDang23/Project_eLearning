import { HeaderBeforeLogin } from '~/components/general'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'

function Welcome() {
  return (
    <div>
      <HeaderBeforeLogin />
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
