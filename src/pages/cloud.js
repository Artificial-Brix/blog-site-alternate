import React from "react";

import { useQuery } from "@apollo/client";
import PostGrid from "../components/common/PostGrid";
import withTitle from "../components/common/with-title";

import { GET_POSTS_BY_CATEGORIES_QUERY } from "../queries/posts";

const catIds = [7];
export default function ContactUs() {
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
    "Cloud",
    data?.posts ? <PostGrid posts={data.posts} /> : "Loading"
  );
}
