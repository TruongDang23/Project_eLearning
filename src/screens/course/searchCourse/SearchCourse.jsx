import styled from "styled-components"
import { GeneralHeader } from "~/components/general"
import { GeneralFooter } from "~/components/general"
import HeadingSearch from "./HeadingSearch"
import MainSearch from "./MainSearch"
import { useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import SearchCourseData from "~/data/SearchCourseData"
import axios from "axios"

function SearchCourse() {
  const { category } = useParams()
  const [search, setSearch] = useSearchParams()
  const title = search.get('q')
  const searchCourseData = SearchCourseData

  useEffect(() => {
    console.log('hello')
  }, [search])

  const resultNumber = searchCourseData.length;
  const resultText = resultNumber > 1 ? "results" : "result";

  return (
    <>
      <GeneralHeader />
      <SearchCourseWrapper>
        <HeadingSearch resultNumber={resultNumber} resultText={resultText} />
        <MainSearch searchCourseData={searchCourseData} title={title} />
      </SearchCourseWrapper>
      <GeneralFooter />
    </>
  );
}

const SearchCourseWrapper = styled.main`
  width: 100%;
  max-width: 134rem;
  margin: 0 auto;
  padding: 4.6rem 2.4rem;
  display: flex;
  flex-direction: column;
`;

export default SearchCourse;
