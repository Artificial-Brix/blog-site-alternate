import gql from "graphql-tag";

export const GET_POSTS_BY_CATEGORIES_QUERY = gql`
  query GetBlogPostsByCategories($cat_ids: [Int]) {
    posts: getPostsByCategories(cat_ids: $cat_ids) {
      id
      title
      description
      author
      image
      updated_at
      categories
    }
  }
`;
