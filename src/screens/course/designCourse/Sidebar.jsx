import styled from 'styled-components'
function Sidebar() {
  return (
    <SidebarWrapper>Đây là sidebar của trang thiết kế khóa học</SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  width: 100%;
  padding: 20px;
  border-right: 1px solid #ddd;
  position: sticky;
  top: 20px; /* Sidebar sẽ dính lại khi cuộn xuống */
  height: 100px; /* Đảm bảo sidebar chiếm toàn bộ chiều cao trang */
  background-color: #f9f900;
`

export default Sidebar
