import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import ListNotifications from "./ListNotifications";

function Notication() {
  return (
    <div>
      <HeaderAfterLogin />
      <main>
        <ListNotifications />
      </main>
      <GeneralFooter />
    </div>
  );
}

export default Notication;
