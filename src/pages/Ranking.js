import React from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Segment, Loader, Dimmer } from "semantic-ui-react";

import moment from "moment";
import UserAvatar from "../components/UserAvatar";

function Ranking(props) {
  const { loading, data: { getRanking: ranking } = {} } = useQuery(
    FETCH_RANKING_QUERY
  );

  let rankingMarkup;
  if (loading) {
    rankingMarkup = (
      <Segment style={{ margin: 80 }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  } else {
    console.log(ranking);
    rankingMarkup = (
      <Grid centered>
        <Grid.Row className="page-title">
          <h1>Top Influencers</h1>
        </Grid.Row>
        {ranking && ranking.map((rank) => (
          <Grid.Row key={rank.id}>
            <Grid.Column width={2}>
              <UserAvatar
                float="right"
                size="small"
                username={rank.username}
                avatar={rank.avatar}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{rank.username}</Card.Header>
                  <Card.Meta>
                    Member since {moment(rank.createdAt).format("MMMM, D")}
                  </Card.Meta>
                  <Card.Description>
                    This user influences at least <b>{rank.influences}</b> others persons
                  </Card.Description>
                  <hr />
                  <Card.Content extra>
                    <p>Good job <b>{rank.username}</b></p>
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        ))
      }
      </Grid>
    );
  }
  return rankingMarkup;
}

const FETCH_RANKING_QUERY = gql`
  query {
    getRanking {
      username
      influences
      avatar
      createdAt
    }
  }
`;

export default Ranking;
