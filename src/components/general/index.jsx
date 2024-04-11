import HeaderBe from './HeaderBeforeLogin/header'
import HeaderAf from './HeaderAfterLogin/header'
import Footer from './Footer/footer'
export function HeaderBeforeLogin() {
  return (
    <HeaderBe />
  )
}

export function HeaderAfterLogin() {
  return (
    <HeaderAf />
  )
}

export function GeneralFooter() {
  return (
    <Footer />
  )
}