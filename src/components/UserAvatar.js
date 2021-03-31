import React from "react";
import { Image } from "semantic-ui-react";

const UserAvatar = ({ username, size, floated }) => {
  return (
    <Image
      floated={floated}
      size={size}
      src={
        getAvatar(username)
      }
    />
  );
};

function getAvatar(username) {
  switch (username) {
    case "thiago":
      return "https://react.semantic-ui.com/images/avatar/large/matthew.png";
    case "user":
      return "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";
    case "molly":
      return "https://react.semantic-ui.com/images/avatar/large/molly.jpg";
    case "jenny":
      return "https://react.semantic-ui.com/images/avatar/large/jeny.jpg";
    default:
      return "https://react.semantic-ui.com/images/avatar/large/steve.jpg";
  }
}

export default UserAvatar;
