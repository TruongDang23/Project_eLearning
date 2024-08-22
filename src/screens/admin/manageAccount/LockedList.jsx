// src/UserProfile.js
import { Items } from './LockedItem'

function LockedList({ account, reload, setReload }) {
  return (
    <>
      {account.map((accountItem) => (
        <Items key={accountItem.userID} accountItem={accountItem} reload={reload} setReload={setReload} />
      ))}
    </>
  )
}

export default LockedList;
