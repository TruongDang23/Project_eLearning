import Header from './Header'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'

function Welcome() {
  return (
    <div>
      <Header />
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
