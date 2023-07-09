const deletePostHandler = async (e) => {
  e.preventDefault();

  console.log("Delete post was pressed!");

  const post = document.querySelector("#delete-post-btn");
  const post_id = post.dataset.id;

  const response = await fetch(`/post/${post_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Failed to delete a post.");
  }
};

document
  .querySelector("#delete-post-btn")
  .addEventListener("click", deletePostHandler);
