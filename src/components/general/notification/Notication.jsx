import { GeneralFooter, GeneralHeader } from '~/components/general'
import ListNotifications from "./ListNotifications";

function Notication() {
  return (
    <div>
      <GeneralHeader />
      <main>
        <ListNotifications />
      </main>
      <GeneralFooter />
    </div>
  );
}

export default Notication;
