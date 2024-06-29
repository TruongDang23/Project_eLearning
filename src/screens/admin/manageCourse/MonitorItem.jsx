import styled from "styled-components";
import { useState } from 'react'
import { PublishCourse, RejectCourse } from '~/components/popup/index'

export function Items({ courseItem }) {
  const [openPub, setopenPub] = useState(false)
  const [openReject, setopenReject] = useState(false)

  const togglePub = () => { setopenPub(!openPub) }
  const toggleReject = () => { setopenReject(!openReject) }
  return (
    <>
      <Wrapper>
        <div key={courseItem.courseID} className="course-item">
          <div className="image">
            <img src={courseItem.image_introduce} alt='image' />
          </div>

          <div className="center_infor">
            <h2>{courseItem.title}</h2>
            <p><strong>Teacher:</strong> {courseItem.teacher}</p>
            <p><strong>Method:</strong> {courseItem.method}</p>
            <p><strong>Sending Date:</strong> {courseItem.time}</p>
            <p><strong>Program:</strong> {courseItem.program}</p>
          </div>

          <div className="right_infor">
            <h2>{courseItem.courseID}</h2>
            <p>Monitoring</p>
            <div className="button">
              <button>Go to course</button>
              <button onClick={togglePub}>Accept</button>
              <button onClick={toggleReject}>Reject</button>
            </div>
          </div>
        </div>
      </Wrapper>
      {openPub && <PublishCourse handleClose={togglePub} course={courseItem.courseID} />}
      {openReject && <RejectCourse handleClose={toggleReject} course={courseItem.courseID} />}
    </>
  )
}

const Wrapper = styled.div`
	.course-item {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 15px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.image{
    align-self: center;
			img{
				width: 170px;
				height: 170px;
				object-fit: contain;
				border: 1px solid #ccc;
				${"" /* bo hai góc trên của ảnh */}
				border-top-left-radius: 20%;
				border-top-right-radius: 20%;
				border-bottom-left-radius: 20%;
				border-bottom-right-radius: 20%;
			}
  	}

		.center_infor{
			flex: 0.4;

			h2{
				color: #187bce;
				font-weight: bold;
				font-size: 2.4rem;
				padding-bottom: 5px;
				margin-left: -30px;
			}
			p{
				font-size: 1.8rem;
			}
		}

		.right_infor{
			flex: 0.4;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			h2{
				color: #187bce;
				font-weight: bold;
				font-size: 2.4rem;
				padding-bottom: 5px;
				text-align: center;
			}

			p{
				font-size: 2.0rem;
				text-align: center;
			}

			.button{
				display: flex;
				justify-content: space-around;

				button{
					font-size: 1.8rem;
					border-radius: 15px;
					padding: 10px;
					border: 1px solid #ccc;
					background-color: #f1f1f1;
					transition: background-color 0.3s, color 0.3s;
					&:hover {
						background-color: #e0e0e0;
					}
				}
			}
		}
	}
`
