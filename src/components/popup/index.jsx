import PopupExp from './popupAddExp'
import PopupCre from './popupAddCre'
import PopupPro from './popupAddPro'
import PopupWork from './popupAddWork'
import PopupPub from './popupPublish'

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

export function PublishCourse({ handleClose, course }) {
  return (
    <PopupPub handleClose={handleClose} course={course}/>
  )
}