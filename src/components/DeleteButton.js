import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  FETCH_POSTS_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
} from "../util/graphql";
import { Button, Icon, Confirm } from "semantic-ui-react";
import Tooltip from "./Tooltip";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    refetchQueries: [
      {
        query: FETCH_POSTS_QUERY,
      },
    ],
    update() {
      setConfirmOpen(false);
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <Tooltip content={`Delete this ${commentId ? "comment" : "post"}`}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Tooltip>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;
