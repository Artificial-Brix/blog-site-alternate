import React from "react";
import trending from "../assets/mocks/trending";
import featured from "../assets/mocks/featured";
import { PostMasonry } from "../components/common";

const trendingConfig = {
  1: {
    gridArea: "1 / 2 / 3 / 3",
  },
};

const featuredConfig = {
  1: {
    gridArea: "1 / 2 / 3 / 3",
  },
};

const mergeStyles = function (posts, config) {
  posts.forEach((post, index) => {
    post.style = config[index];
  });
};

mergeStyles(trending, trendingConfig);
mergeStyles(featured, featuredConfig);

export default function Home() {
  return (
    <section className="container home">
      <div className="row">
        <h1>Featured Posts</h1>
        <PostMasonry />
        <h1>Trending Posts</h1>
        <PostMasonry posts={trending} columns={3} />
      </div>
    </section>
  );
}
