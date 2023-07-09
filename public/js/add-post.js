const addPostFormHandler = async (e) => {
  e.preventDefault();

  console.log("Add post was pressed!");

  const post_title = document.querySelector("#post_title").value;
  const post_body = document.querySelector("#post_body").value;

  // TODO: need to get user ID from session somehow

  // const user_id = req.session.userid;

  // console.log(req.session);
  console.log(post_title);
  console.log(post_body);
  // console.log(user_id);

  document.location.replace(`/`);

  //   if (comment_text) {
  //     const response = await fetch("/post", {
  //       method: "POST",
  //       body: JSON.stringify({ post_title, post_body, user_id }),
  //       headers: { "Content-Type": "application/json" },
  //     });
// TODO: how can return post id?
  //     if (response.ok) {
  //       document.location.replace(`/post/${post_id}`);
  //     } else {
  //       alert("Failed to add a comment.");
  //     }
  //   }
};

document
  .querySelector("#add-post-btn")
  .addEventListener("click", addPostFormHandler);

  // document
  //   .querySelector("#add-post-btn")
  //   .addEventListener("click", addPostRequestHandler);