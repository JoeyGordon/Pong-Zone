import * as React from "react";
import styled from "styled-components";
import User from "../models/user";

export type UserProfileProps = {
  user?: User
};

const UserProfile: React.SFC<UserProfileProps> = props => {
  return (
    <UserProfileWrapper>
      You picked {props.user.name}
      <p>We can show whatever here</p>
    </UserProfileWrapper>
  );
};

const UserProfileWrapper = styled.div`
  background: #eee;
`;

export default UserProfile;
