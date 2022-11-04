import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $title: String!
    $username: String!
    $image: String!
    $subreddit_id: ID!
  ) {
    insertPost(
      body: $body
      title: $title
      username: $username
      image: $image
      subreddit_id: $subreddit_id
    ) {
      body
      title
      username
      image
      subreddit_id
      created_at
      id
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      topic
      created_at
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      id
      created_at
      post_id
      username
      text
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      created_at
      post_id
      username
      upvote
    }
  }
`;
