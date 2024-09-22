//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ActiveList from './ActiveList'
import LockedList from './LockedList'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang


function ManageAccount() {
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const [reload, setReload] = useState(false)
  const [activeTab, setActiveTab] = useState('Tab1');
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [active, setActive] = useState([])
  const [locked, setLocked] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/ad/getActiveAccounts', {
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        setActive(response.data)
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        else if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        else if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        else if (error.response.status === 403)
          navigate('/403error')
        else
          navigate('/error-get-data')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  useEffect(() => {
    axios.get('http://localhost:3000/ad/getLockedAccounts', {
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        setLocked(response.data)
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        else if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        else if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        else if (error.response.status === 403)
          navigate('/403error')
        else
          navigate('/error-get-data')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return (
    <>
      <div>
        <Helmet>
          <title> Manage Account | EL-Space </title>
        </Helmet>
        <GeneralHeader />
        <main>
          <Container>
            <div className="tabs">
              <div className="tab-buttons">
                <button
                  className={activeTab === 'Tab1' ? 'active' : ''}
                  onClick={() => handleTabClick('Tab1')}
                >
                                  Active
                </button>
                <button
                  className={activeTab === 'Tab2' ? 'active' : ''}
                  onClick={() => handleTabClick('Tab2')}
                >
                                  Locked
                </button>
              </div>
              <div className="tab-content">
                {activeTab === 'Tab1' && <ActiveList account={ active } reload={reload} setReload={setReload}/>}
                {activeTab === 'Tab2' && <LockedList account={ locked } reload={reload} setReload={setReload}/>}
              </div>
            </div>
          </Container>
        </main>
        <GeneralFooter />
      </div>
    </>
  )
}

export default ManageAccount
const Container = styled.div`
	.tabs {
	font-family: 'Arial', sans-serif;
	max-width: 70%;
	min-width: 800px;
	margin: 50px auto;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;
	min-height: 349px;
	max-height: 800px;
	overflow-y: auto;
	}

	.tab-buttons {
	display: flex;
	width: 50px;
	background-color: #f1f1f1;
	}

	.tab-buttons button {
	flex: 1;
	padding: 15px;
	margin: 0px 5px;
	cursor: pointer;
	border: none;
	border-radius: 15px;
	background-color: #f1f1f1;
	font-size: 1.8rem;
	transition: background-color 0.3s, color 0.3s;
	}

	.tab-buttons button:hover {
	background-color: #e0e0e0;
	}

	.tab-buttons button.active {
	background-color: #187bce;
	color: white;
	}

	.tab-content {
	padding: 20px;
	background-color: white;
	}

	.tab-content div {
	animation: fadeIn 0.5s ease-in-out;
	}

	@keyframes fadeIn {
			from {
					opacity: 0;
					transform: translateY(10px);
			}
			to {
					opacity: 1;
					transform: translateY(0);
			}
	}
`;