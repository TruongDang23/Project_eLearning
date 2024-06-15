// src/UserProfile.js
import styled from 'styled-components'
import img from '~/assets/avatar.jpg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'
import { languages } from '~/constants/listLanguage'

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .avt{
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
    img{
      width: 300px;
      height: 300px;
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
      font-size: 2.4rem;
      color: #898989;
    }
    input {
      width: 90%;
      height: 50px;
      padding: 8px;
      font-size: 2.2rem;
      border: 1px solid #ccc;
      border-radius: 15px;
      transition: border-color 0.3s, border-width 0.3s;
      margin-bottom: 20px;
    }
    input:focus{
      border-color: #187BCE; 
      border-width: 2px;
      outline: none; /* Loại bỏ viền mặc định của trình duyệt */
    }
  }
  .react-calendar {
    width: 90%;
    font-size: 1.8rem;
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

function UserProfile() {
  const [date, setDate] = useState(new Date("2003-01-05"));
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <ProfileContainer>
        <div className="avt">
          <img src={ img } alt='test' />
        </div>
        <div className="content">
          <h3>UserID: </h3>
          <input
            type="text"
          />

          <h3>Full name:</h3>
          <input
            type="text"
          />

          <h3>Date of birth:</h3>
          <Calendar
            //onChange={handleDateChange}
            value={date}
            view="month" // Hiển thị lịch tháng
            showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
          />
          <h3>Location:</h3>
          <div className="location">
            <input
              type="text"
            />
            <input
              type="text"
            />
            <input
              type="text"
            />
          </div>
          <h3>Language:</h3>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleChange}
            className="language-select"
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
          />
          <input
            type="text"
            placeholder='Link to social profile'
          />
          <input
            type="text"
            placeholder='Link to social profile'
          />
          <input
            type="text"
            placeholder='Link to social profile'
          />
          <h3>Activity status:</h3>
          <input
            type="text"
          />
          <div className="item-btns">
            <button className="item-btn save-btn">Save</button>
            <button className="item-btn update-btn">Update</button>
          </div>
        </div>
      </ProfileContainer>
    </>
  )
}
export default UserProfile;
