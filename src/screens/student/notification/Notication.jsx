import FooterNew from "~/components/general/Footer/FooterNew";
import HeaderAfterLogin from "~/components/general/HeaderAfterLogin/HeaderAfterLogin";
import Header from "~/screens/system/welcome/Header";
import ListNotifications from "./ListNotifications";

function Notication() {
  return (
    <div>
      <HeaderAfterLogin />
      <main>
        <ListNotifications />
      </main>
      <FooterNew />
    </div>
  );
}

export default Notication;
