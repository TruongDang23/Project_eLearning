import PopupExp from './popupAddExp'
import PopupCre from './popupAddCre'
import PopupPro from './popupAddPro'
import PopupWork from './popupAddWork'
import PopupPub from './popupPublish'
import PopupReject from './popupReject'
import PopupRePub from './popupRePublish'
import PopupTerminate from './popupTerminate'

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

export function PublishCourse({ handleClose, course, reload, setReload }) {
  return (
    <PopupPub handleClose={handleClose} course={course} reload={reload} setReload={setReload} />
  )
}

export function RejectCourse({ handleClose, course, reload, setReload }) {
  return (
    <PopupReject handleClose={handleClose} course={course} reload={reload} setReload={setReload} />
  )
}

export function RePublishCourse({ handleClose, course, reload, setReload }) {
  return (
    <PopupRePub handleClose={handleClose} course={course} reload={reload} setReload={setReload} />
  )
}

export function TerminateCourse({ handleClose, course, reload, setReload }) {
  return (
    <PopupTerminate handleClose={handleClose} course={course} reload={reload} setReload={setReload}/>
  )
}