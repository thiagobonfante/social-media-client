import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Button, Icon, Label, Popup } from "semantic-ui-react";

function FollowButton({ follower, user : { id, username, followersCount, followers } }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (follower && followers && followers.find((like) => like.username === follower.username)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [follower, followers]);

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username: username, follower: follower.username },
  });

  function followIt() {
    if (follower && follower.username !== username) followUser();
    else return;
  }

  const followButton = follower ? (
    following ? (
      <Button color="purple">
        <Icon name="star" />
      </Button>
    ) : (
      <Button color="purple" basic>
        <Icon name="star outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to={`/login`} color="purple" basic>
      <Icon name="star outline" />
    </Button>
  );
  return (
    <Popup
      inverted
      content="Follow this user"
      trigger={
        <Button as="div" labelPosition="right" onClick={followIt}>
          {followButton}
          <Label basic color="purple" pointing="left">
            {followersCount}
          </Label>
        </Button>
      }
    />
  );
}

const FOLLOW_USER_MUTATION = gql`
  mutation follow($username: String!, $follower: String!) {
    follow(username: $username, follower: $follower) {
      id
      followers {
        id
        username
      }
      followersCount
    }
  }
`;

export default FollowButton;
