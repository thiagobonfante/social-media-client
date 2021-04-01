import React from "react";
import { Image } from "semantic-ui-react";

const UserAvatar = ({ username, size, floated, avatar }) => {
  return (
    <Image
      floated={floated}
      size={size}
      src={avatar}
    />
  );
};

export default UserAvatar;
