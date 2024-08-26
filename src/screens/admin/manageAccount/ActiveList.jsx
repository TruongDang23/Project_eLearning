// src/UserProfile.js
import { Items } from './ActiveItem'

function ActiveList({ account, reload, setReload }) {
  return (
    <>
      {account.map((accountItem) => (
        <Items key={accountItem.userID} accountItem={accountItem} reload={reload} setReload={setReload} />
      ))}
    </>
  )
}

export default ActiveList;
