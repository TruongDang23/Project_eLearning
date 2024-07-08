import { useState } from "react";
import { AppBar, Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";
import TabOverview from "./TabOverview";
import TabReview from "./TabReview";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <PStyle>{children}</PStyle>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabviewAccessCourse({ accessCourseData }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabviewAccessCourseWrapper>
      <div>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <TabStyled label="Overview" {...a11yProps(0)} />
            <TabStyled label="Chat AI" {...a11yProps(1)} />
            <TabStyled label="Reviews" {...a11yProps(2)} />
            <TabStyled label="Q&A" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TabOverview accessCourseData={accessCourseData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Đây là phần Chat AI
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TabReview accessCourseData={accessCourseData} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Đây là phần Q&A
        </TabPanel>
      </div>
    </TabviewAccessCourseWrapper>
  );
}

const PStyle = styled.p`
  font-size: 1.6rem;
`;

const TabStyled = styled(Tab)`
  color: #f9f9f9 !important;
  font-size: 1.6rem !important; /* Thay đổi kích thước chữ tại đây */

  &.Mui-selected {
    color: #ffffff !important;
    font-weight: bold;
    font-size: 1.6rem !important; /* Kích thước chữ khi tab được chọn */
  }
`;

const TabviewAccessCourseWrapper = styled.section`
  .MuiAppBar-colorPrimary {
    background-color: #2d2f31;
  }
  .MuiTabs-indicator {
    background-color: #f9f9f9;
  }
  .MuiTab-textColorPrimary {
    color: #f9f9f9;
  }
  .MuiTab-textColorPrimary.Mui-selected {
    color: #f9f9f9;
  }
  .MuiTab-root {
    text-transform: none;
  }
`;

export default TabviewAccessCourse;
