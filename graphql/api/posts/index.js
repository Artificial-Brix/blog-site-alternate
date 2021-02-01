const db = require("../../database/mysql");
const { errorHandler } = require("../utils");
const intersection = require("lodash/intersection");
module.exports = {
  getPost: async (id) =>
    await db.select("*").from("blog_posts").where({ id }).catch(errorHandler),
  getPosts: async (type, category_ids) => {
    let qry = db
      .select(
        "blog_posts.id",
        "blog_posts.description",
        "blog_posts.author_id",
        "title",
        "image",
        "created_at",
        "updated_at",
        db.raw("GROUP_CONCAT(label) as categories"),
        db.raw("GROUP_CONCAT(blog_categories.id) as cat_ids")
      )
      .from("blog_posts")
      .leftJoin(
        "blog_post_categories",
        "blog_posts.id",
        "blog_post_categories.post_id"
      )
      .leftJoin(
        "blog_categories",
        "blog_categories.id",
        "blog_post_categories.category_id"
      )
      .where({ active: 1 })
      .groupBy("blog_posts.id");

    qry = {
      trending: () =>
        qry
          .select(db.raw("COUNT(blog_post_likes.author_id) as likes"))
          .leftJoin(
            "blog_post_likes",
            "blog_post_likes.post_id",
            "blog_posts.id"
          )
          .groupBy("blog_posts.id")
          .orderBy("likes", "desc")
          .limit(5),

      featured: () => qry.whereIn("blog_posts.id", [(1, 2, 3, 4)]),

      recent: () => qry.orderBy("updated_at", "desc").limit(5),

      default: () => qry,
    }[type || "default"]();

    return qry
      .then((data) => {
        if (category_ids) {
          let filter = data.filter(
            (post) =>
              // let statement = post.cat_ids
              //   .split(",")
              //   .includes(category_id.toString());
              // if (statement) {
              //   return post;
              // }

              post.cat_ids &&
              intersection(post.cat_ids.split(",").map(parseInt), category_ids)
                .length
          );
          return filter;
        }
        return data;
      })
      .catch(errorHandler);
  },

  getPostLikeCount: async (id) =>
    await db
      .select("COUNT(author_id) as likes", "post_id")
      .from("blog_post_likes")
      .where({ post_id: id })
      .groupBy("post_id")
      .catch(errorHandler),

  getPostComments: async (id) =>
    await db
      .select("*")
      .from("blog_post_comments")
      .where("post_id", id)
      .catch(errorHandler),

  getPostsAuthors: async (ids) =>
    await db.select("*").from("users").whereIn("id", ids).catch(errorHandler),
};
