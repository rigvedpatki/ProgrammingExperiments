"use strict";

//Bring in model

const Post = use("App/Models/Post");

const { validate } = use("Validator");

class PostController {
  async index({ view }) {
    /*     const posts = [
      { title: "Post 1", body: "This is post 1" },
      { title: "Post 2", body: "This is post 2" },
      { title: "Post 3", body: "This is post 3" },
      { title: "Post 4", body: "This is post 4" },
      { title: "Post 5", body: "This is post 5" }
    ]; */
    const posts = await Post.all();
    return view.render("posts.index", {
      title: "Latest posts",
      listOfPosts: posts.toJSON()
    });
  }

  async details({ params, view }) {
    const post = await Post.find(params.id);
    return view.render("posts.details", {
      post: post
    });
  }

  async add({ view }) {
    return view.render("posts.add");
  }

  async store({ request, response, session }) {
    // Validate input
    const validation = await validate(request.all(), {
      title: "required|min:3|max:255",
      body: "required|min:3"
    });

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    const post = new Post();

    post.title = request.input("title");
    post.body = request.input("body");

    await post.save();

    session.flash({ notification: "Post Added!" });

    return response.redirect("/posts");
  }

  async edit({ params, view }) {
    const post = await Post.find(params.id);
    return view.render("posts.edit", { post: post });
  }

  async update({ params, request, response, session }) {
    // Validate input
    const validation = await validate(request.all(), {
      title: "required|min:3|max:255",
      body: "required|min:3"
    });

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    const post = await Post.find(params.id);

    post.title = request.input("title");
    post.body = request.input("body");

    await post.save();

    session.flash({ notification: "Post Updated!" });

    return response.redirect("/posts");
  }

  async destroy({ params, session, response }) {
    const post = await Post.find(params.id);

    await post.delete();

    session.flash({ notification: "Post Deleted!" });

    return response.redirect("/posts");
  }
}

module.exports = PostController;
