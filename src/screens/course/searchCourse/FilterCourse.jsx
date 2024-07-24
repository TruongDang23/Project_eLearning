import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import StarRating from "~/components/general/Other/StarRating";

function FilterCourse(searchCourseData) {
  return (
    <FilterCourseWrapper>
      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          fontSize: "1rem !important",
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-content"
          id="rating-header"
          sx={{
            padding: "0px 10px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <h3>Rating</h3>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="star"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={4} />
                    <span id="number">4 and up</span>
                  </div>
                }
              />

              <FormControlLabel
                value="3"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={3} />
                    <span id="number">3 and up</span>
                  </div>
                }
              />

              <FormControlLabel
                value="2"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={2} />
                    <span id="number">2 and up</span>
                  </div>
                }
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          fontSize: "1rem !important",
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="language-content"
          id="language-header"
          sx={{
            padding: "0px 10px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <h3>Language</h3>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          fontSize: "1rem !important",
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="method-content"
          id="method-header"
          sx={{
            padding: "0px 10px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <h3>Method</h3>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          fontSize: "1rem !important",
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-content"
          id="price-header"
          sx={{
            padding: "0px 10px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <h3>Price</h3>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          fontSize: "1rem !important",
          "&:before": {
            display: "none",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="program-content"
          id="program-header"
          sx={{
            padding: "0px 10px",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <h3>Program</h3>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </FilterCourseWrapper>
  );
}

const FilterCourseWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.8rem;

  .MuiAccordion-root {
    margin: 0;
  }

  .MuiAccordionSummary-root {
    margin: 0;
  }

  .css-1i7u1af-MuiPaper-root-MuiAccordion-root.Mui-expanded {
    margin: 0;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.6;
  }

  .star-value {
    display: flex;
    align-items: center;

    span {
      font-size: 1.6rem;
      margin-top: 0.5rem;
    }
    #number {
      margin-left: 20px;
      line-height: 1.6;
    }
  }
`;

export default FilterCourse;
