// src/UserProfile.js
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'
import { languages } from '~/constants/listLanguage'

function UserProfile({ profile }) {
  const [user, setUser] = useState({
    userID: profile[0].userID,
    avatar: profile[0].avatar,
    fullname: profile[0].fullname,
    date_of_birth: new Date(profile[0].date_of_birth),
    street: profile[0].street,
    province: profile[0].province,
    country: profile[0].country,
    language: profile[0].language,
    social_network: profile[0].social_network,
    activity_status: profile[0].activity_status
  })

  const [isReadOnly, setIsReadOnly] = useState(true)

  return (
    <>
      <ProfileContainer>
        <div className="avt">
          <img src={ user.avatar } alt='avatar' />
        </div>
        <div className="content">
          <h3>UserID: </h3>
          <input
            type="text"
            value={ user.userID }
            readOnly={ true }
          />

          <h3>Full name:</h3>
          <input
            type="text"
            value={ user.fullname }
            readOnly={ isReadOnly }
          />

          <h3>Date of birth:</h3>
          <Calendar
            //onChange={handleDateChange}
            value={ user.date_of_birth }
            view="month" // Hiển thị lịch tháng
            showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
          />

          <h3>Location:</h3>
          <div className="location">
            <input
              type="text"
              value={ user.street }
              readOnly={ isReadOnly }
            />
            <input
              type="text"
              value={ user.province }
              readOnly={ isReadOnly }
            />
            <input
              type="text"
              value={ user.country }
              readOnly={ isReadOnly }
            />
          </div>

          <h3>Language:</h3>
          <select
            id="language"
            value={ user.language }
            className="language-select"
            disabled={ isReadOnly }
          >
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          <h3>Social networks:</h3>
          <input
            type="text"
            placeholder='Link to social profile'
            value={ user.social_network[0] }
            readOnly={ isReadOnly }
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ user.social_network[1] }
            readOnly={ isReadOnly }
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ user.social_network[2] }
            readOnly={ isReadOnly }
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ user.social_network[3] }
            readOnly={ isReadOnly }
          />

          <h3>Activity status:</h3>
          <input
            type="text"
            value={ user.activity_status }
            readOnly={ isReadOnly }
          />

          <div className="item-btns">
            <button className="item-btn save-btn" onClick={() => setIsReadOnly(true)}>Save</button>
            <button className="item-btn update-btn" onClick={() => setIsReadOnly(false)}>Update</button>
          </div>
        </div>
      </ProfileContainer>
    </>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .avt{
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
    img{
      width: 200px;
      height: 200px;
      object-fit: cover;
      ${"" /* bo hai góc trên của ảnh */}
      border-top-left-radius: 40%;
      border-top-right-radius: 40%;
      border-bottom-left-radius: 40%;
      border-bottom-right-radius: 40%;
    }
  }
  .content{
    margin-left: 50px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 2.2rem;
      color: #898989;
    }
    input {
      width: 90%;
      height: 50px;
      padding: 8px;
      font-size: 2rem;
      border: 1px solid #ccc;
      border-radius: 15px;
      transition: border-color 0.3s, border-width 0.3s;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    input:focus{
      border-color: #187BCE; 
      border-width: 2px;
      outline: none; /* Loại bỏ viền mặc định của trình duyệt */
    }
  }
  .react-calendar {
    width: 300px;
    font-size: 1.8rem;
    margin: 0 auto;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 15px;
    margin-bottom: 20px;
  }

  .react-calendar__tile {
    padding: 10px;
    border-radius: 4px;
    border: none;
    transition: background-color 0.2s;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #76baff;
  }

  .react-calendar__tile--active {
    background-color: #006edc;
    color: white;
  }

  .react-calendar__tile--now {
    background-color: #ffff76;
  }

  .language-select {
    width: 90%;
    height: 50px;
    padding: 8px;
    font-size: 2.2rem;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s, border-width;
  }

  .language-select:focus {
    border-color: #187BCE;
    border-width: 2px;
    outline: none;
  }
  .location{
    display:flex;
    width: 90%;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
    input {
      margin: 0 5px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 15px;
      box-sizing: border-box;
    }
  }
  .item-btns {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    padding: 4px 8px 20px 18px;
    width: 90%;

    margin-top: auto;
    .item-btn {
      display: inline-block;
      font-size: 2.2rem;
      padding: 1rem 2rem;
      font-weight: 700;
      border-radius: 5px;
      text-decoration: none;
      transition: all 0.3s;

      &.save-btn {
        background-color: #1971c2;
        color: #fff;
        border: none;
        &:hover {
          background-color: #155b96;
          transition: all 0.3s;
        }
      }

      &.update-btn {
        background-color: #fff;
        color: #1971c2;
        border: 1px solid #1971c2;
        margin-left: 10px;
        &:hover {
          background-color: #1971c2;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
  }
`;

export default UserProfile;
