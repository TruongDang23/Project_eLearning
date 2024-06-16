import styled from "styled-components";
import Badge from "@mui/material/Badge";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"; // import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import AvatarImg from "./avatar.png";

function HeaderAfterLogin() {
  return (
    <Navbar>
      <a className="brand">
        <img
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
          alt="Udemy Logo"
        />
      </a>
      <div className="navLinks">
        <a href="#" className="link">
          Categories
        </a>
        <div className="searchBox">
          <input type="text" placeholder="Search for anything" />
          <a href="search">
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="Search Icon"
            />
          </a>
        </div>
        <a href="#" className="link">
          Teach on Udemy
        </a>
        <a href="#" className="link">
          My learning
        </a>
        <a>
          <StyledBadge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
          </StyledBadge>
        </a>
        <a>
          <StyledBadge badgeContent={17} color="error">
            <NotificationsOutlinedIcon />
          </StyledBadge>
        </a>
        <a>
          <StyledAvatar src={AvatarImg} />
        </a>
      </div>
    </Navbar>
  );
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 2px 2px 8px rgba(40, 44, 51, 0.2) !important;

  .brand {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      margin-right: 10px;
    }
  }

  .navLinks {
    display: flex;
    align-items: center;
    gap: 20px;

    .link {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        color: #1971c2;
        transition: all 0.3s;
      }
    }

    .searchBox {
      display: flex;
      font-size: 16px;
      align-items: center;
      padding: 5px 10px;
      border: 1px solid #1971c2;
      border-radius: 5px;
      background-color: #fff;

      input {
        border: none;
        outline: none;
        background: none;
        padding: 5px;
        width: 400px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
const StyledBadge = styled(Badge)`
  cursor: pointer;
  color: #555;
  transition: all 0.3s;
  ${"" /* giảm kích thước của badge */}
  .MuiBadge-badge {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0 2px;
  }
  .MuiSvgIcon-root {
    width: 2.6rem;
    height: 2.6rem;
    &:hover, &:focus {
      color: #1971c2;
      ${"" /* Phóng to một chút */}
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  width: 2.6rem;
  height: 2.6rem;
  border: 2px solid #1971c2;
`;

export default HeaderAfterLogin;