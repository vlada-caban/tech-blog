const deletePostHandler = async (e) => {
  e.stopPropagation();

  const post = e.target;
  const post_id = post.dataset.id;

  console.log("Delete post was pressed!");

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

const btns = document.querySelectorAll("#delete-post-btn");

for (i of btns) {
  i.addEventListener("click", deletePostHandler);
}
