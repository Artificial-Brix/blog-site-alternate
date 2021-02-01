import React from "react";

import { useQuery } from "@apollo/client";
import PostGrid from "../components/common/PostGrid";
import withTitle from "../components/common/with-title";

import { GET_POSTS_BY_CATEGORIES_QUERY } from "../queries/posts";

const catIds = [8];

export default function Algos() {
  const { data, error } = useQuery(GET_POSTS_BY_CATEGORIES_QUERY, {
    variables: {
      cat_ids: catIds,
    },
  });
  if (error) {
    console.log(error);
    return "Something went wrong :(";
  }
  return withTitle(
    "Algorithms",
    data?.posts ? <PostGrid posts={data.posts} /> : "Loading"
  );
}
