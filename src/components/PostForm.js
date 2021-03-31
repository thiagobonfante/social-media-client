import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";
import Tooltip from "./Tooltip";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    refetchQueries: [{
      query: FETCH_POSTS_QUERY
    }],
    //update(proxy, result) {
    update() {
      /*const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });*/
      
      // Force cleaning because hook is not working
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
    },
  });

  function createPostCallback() {
    createPost();
    values.body = '';
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi world!"
            name="body"
            onChange={onChange}
            values={values.body}
            error={error ? true : false}
          />  
          <Tooltip content="Submit your comment">
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Tooltip>
        </Form.Field>
      </Form>
      {
        error && (
          <div className="ui error message" style={{marginBottom:20}}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )
      }
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
