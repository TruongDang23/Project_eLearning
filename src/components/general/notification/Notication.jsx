import { GeneralFooter, GeneralHeader } from '~/components/general'
import ListNotifications from './ListNotifications'
import { NotificationProvider } from '../../../context/NotificationContext'
import Header from '../Header/header'

function Notication() {
  return (
    <>
      <GeneralHeader />
      {/* <Header /> */}
      <main>
        <NotificationProvider>
          <ListNotifications />
        </NotificationProvider>
      </main>
      <GeneralFooter />
    </>
  )
}

export default Notication
