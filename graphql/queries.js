import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      topic
      id
      created_at
    }
  }
`;

export const GET_SUBREDDIT_BY_LIMITS = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      topic
      id
      created_at
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      title
      username
      created_at
      id
      image
      comments {
        created_at
        id
        username
        post_id
        text
      }
      subreddit {
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      title
      username
      created_at
      id
      image
      comments {
        created_at
        id
        username
        post_id
        text
      }
      subreddit {
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostListByPostId(post_id: $post_id) {
      body
      title
      username
      created_at
      id
      image
      comments {
        created_at
        id
        username
        post_id
        text
      }
      subreddit {
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;
