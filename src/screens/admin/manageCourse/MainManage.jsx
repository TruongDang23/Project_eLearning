//This is information screen of admin
import { GeneralFooter, HeaderAfterLogin } from '~/components/general'
import PublishedCourse from './PublishedCourse'
import MonitoringCourse from './Monitoring'
import TerminatedCourse from './Terminated'

import styled from 'styled-components'

import { useState, useEffect } from 'react'
import axios from 'axios'

function ManageCourse() {

  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')

  const [activeTab, setActiveTab] = useState('Tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div>
        <HeaderAfterLogin />
        <main>
          <Container>
            <div className="tabs">
              <div className="tab-buttons">
                <button
                  className={activeTab === 'Tab1' ? 'active' : ''}
                  onClick={() => handleTabClick('Tab1')}
                >
                                  Published
                </button>
                <button
                  className={activeTab === 'Tab2' ? 'active' : ''}
                  onClick={() => handleTabClick('Tab2')}
                >
                                  Monitoring
                </button>
                <button
                  className={activeTab === 'Tab3' ? 'active' : ''}
                  onClick={() => handleTabClick('Tab3')}
                >
                                  Terminated
                </button>
              </div>
              <div className="tab-content">
                {activeTab === 'Tab1' && <PublishedCourse/>}
                {activeTab === 'Tab2' && <MonitoringCourse/>}
                {activeTab === 'Tab3' && <TerminatedCourse/>}
              </div>
            </div>
          </Container>
        </main>
        <GeneralFooter />
      </div>
    </>
  )
}

export default ManageCourse
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
	max-height: 600px;
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