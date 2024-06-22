import PopupExp from './AddExpertise/popup'
import PopupCre from './AddCredential/popup'
import PopupPro from './AddProject/popup'
import PopupWork from './AddWorking/popup'

export function AddExpertise({ handleClose, handleSave }) {
  return (
    <PopupExp handleClose={handleClose} handleSave={handleSave}/>
  )
}

export function AddCredential({ handleClose, handleSave }) {
  return (
    <PopupCre handleClose={handleClose} handleSave={handleSave}/>
  )
}

export function AddProject({ handleClose, handleSave }) {
  return (
    <PopupPro handleClose={handleClose} handleSave={handleSave}/>
  )
}

export function AddWorking({ handleClose, handleSave }) {
  return (
    <PopupWork handleClose={handleClose} handleSave={handleSave}/>
  )
}