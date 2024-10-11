import { GeneralFooter, GeneralHeader } from '~/components/general'
import ListNotifications from './ListNotifications'
import { NotificationProvider } from '../../../context/NotificationContext'

function Notication() {
  return (
    <>
      <GeneralHeader />
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
