import React from "react";
import styled from "styled-components";

function ContactInfo({ userProfile }) {
  const {
    avatar,
    fullname,
    date_of_birth,
    street,
    province,
    country,
    social_networks,
  } = userProfile;
  return (
    <ContactInfoWrapper>
      <div className="contact-info">
        <div className="contact-info__avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="contact-info__content">
          <h2>{fullname}</h2>

          <div className="contact-info__content-detail">
            <div className="contact-info__content-addition">
              <p>
                <span>Date of birth:</span> {date_of_birth}
              </p>
              <p>
                <span>Address:</span> {street}, {province}, {country}
              </p>
            </div>
            <div className="contact-info__content-social">
              <h3>Social networks</h3>
              <ul>
                {social_networks.map((social_network, index) => (
                  <li key={index}>{social_network}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContactInfoWrapper>
  );
}

const ContactInfoWrapper = styled.section`
  .contact-info {
    display: flex;
    align-items: center;
    padding: 20px;
    ${'' /* border: 1px solid #e0e0e0;
    border-radius: 5px; */}

    .contact-info__avatar {
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }

    .contact-info__content {
      margin-left: 20px;

      h2 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .contact-info__content-detail {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .contact-info__content-addition {
          p {
            margin-bottom: 10px;

            span {
              font-weight: 700;
            }
          }
        }

        .contact-info__content-social {
          h3 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          ul {
            list-style: none;
            padding: 0;

            li {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
`;

export default ContactInfo;
