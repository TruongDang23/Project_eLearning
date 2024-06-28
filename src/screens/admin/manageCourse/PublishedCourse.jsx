// src/UserProfile.js
import { useState } from 'react'
import axios from 'axios'
import { Items } from './PublishedItem'

function PublishedCourse() {
  const [course, setCourse] = useState([
    {
      courseID: 'C0001',
      title: 'Database Basic',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Dang Quang Truong',
      method: 'Supervised by AI camera',
      time: '06-01-2024',
      program: 'Certificate'
    },
    {
      courseID: 'C0002',
      title: 'Advanced Database',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Le Van An',
      method: 'Supervised by AI camera',
      time: '07-01-2024',
      program: 'Certificate'
    },
    {
      courseID: 'C0003',
      title: 'Database Management',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Nguyen Van B',
      method: 'Supervised by AI camera',
      time: '08-01-2024',
      program: 'Diploma'
    },
    {
      courseID: 'C0004',
      title: 'Database Administration',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Tran Van C',
      method: 'Supervised by AI camera',
      time: '09-01-2024',
      program: 'Diploma'
    },
    {
      courseID: 'C0004',
      title: 'Database Administration',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Tran Van C',
      method: 'Supervised by AI camera',
      time: '09-01-2024',
      program: 'Diploma'
    },
    {
      courseID: 'C0004',
      title: 'Database Administration',
      image_introduce: 'https://th.bing.com/th/id/OIP.QAEooHnm_NDANoOR-2xeIwHaF_?rs=1&pid=ImgDetMain',
      teacher: 'Tran Van C',
      method: 'Supervised by AI camera',
      time: '09-01-2024',
      program: 'Diploma'
    }
  ])
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem}/>
      ))}
    </>
  )
}

export default PublishedCourse;
