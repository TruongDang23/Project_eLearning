import styled from 'styled-components'

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const UserActivity = ({ activities }) => {
  return (
    <ActivityContainer>
      {activities.map((activity, index) => (
        <ActivityItem key={index}>{activity}</ActivityItem>
      ))}
    </ActivityContainer>
  );
};

export default UserActivity;
