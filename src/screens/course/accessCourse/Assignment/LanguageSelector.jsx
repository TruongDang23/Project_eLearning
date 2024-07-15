import styled from "styled-components";
import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import { LANGUAGE_VERSIONS } from "./Constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#1976d2";

function LanguageSelector({ language, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LanguageSelectorWrapper>
      <Box ml={2} mb={4}>
        <Typography mb={2} variant="h6">
          Language:
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {language}
        </Button>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            style: { backgroundColor: "#110c1b" },
            disableScrollLock: true,
          }}
          ModalProps={{
            keepMounted: true, // Giữ DOM gốc trong document để không thay đổi layout
            disableScrollLock: true, // Ngăn không khóa cuộn body khi menu mở
          }}
          disableScrollLock={true}
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              selected={lang === language}
              onClick={() => {
                onSelect(lang);
                handleClose();
              }}
              sx={{
                color: lang === language ? ACTIVE_COLOR : "",
                backgroundColor: lang === language ? "gray.900" : "transparent",
                "&:hover": {
                  color: ACTIVE_COLOR,
                  backgroundColor: "gray.900",
                },
              }}
            >
              {lang}
              &nbsp;
              <Typography component="span" color="gray.600" fontSize="sm">
                ({version})
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </LanguageSelectorWrapper>
  );
}

const LanguageSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #1976d2; /* Màu nền của nút */
    color: white; /* Màu chữ của nút */
    &:hover {
      background-color: #115293; /* Màu tối hơn khi hover */
    }
  }
`;

export default LanguageSelector;
