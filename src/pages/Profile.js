import React, { useContext } from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Segment, Loader, Dimmer } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import moment from "moment";
import FollowButton from "../components/FollowButton";
import UserAvatar from "../components/UserAvatar";

function Profile(props) {
  const { user } = useContext(AuthContext);

  const profileUsername = props.match.params.username;

  const { loading, data: { getUser: userFound } = {} } = useQuery(
    FETCH_USER_QUERY,
    {
      variables: {
        username: profileUsername,
      },
    }
  );

  let userMarkup;
  if (loading) {
    userMarkup = (
      <Segment style={{ margin: 80 }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  } else {
    userMarkup = (
      <Grid centered>
        <Grid.Row className="page-title">
          <h1>Profile of {userFound.username}</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}>
            <UserAvatar float="right" size="small" username={profileUsername} avatar={userFound.avatar} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userFound.username}</Card.Header>
                <Card.Meta>
                  Member since {moment(userFound.createdAt).format("MMMM, D")}
                </Card.Meta>
                <Card.Description>
                  Something nice about this guy is mentioned here!
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {user ? 
                (
                  <FollowButton follower={user} user={userFound} />
                ) :
                (
                  <p>You must login to follow this person</p>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return userMarkup;
}

const FETCH_USER_QUERY = gql`
  query($username: String!) {
    getUser(username: $username) {
      id
      username
      createdAt
      avatar
      followers {
        username
      }
      followersCount
    }
  }
`;

export default Profile;
