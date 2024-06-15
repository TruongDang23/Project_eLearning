import HeaderBe from './HeaderBeforeLogin/header'
import HeaderAf from './HeaderAfterLogin/HeaderAfterLogin'
import Footer from './Footer/FooterNew'
import Notification from './notification/Notication'

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

export function Notify() {
  return (
    <Notification />
  )
}