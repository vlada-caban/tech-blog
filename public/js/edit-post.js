const editPostFormHandler = async (e) => {
  e.preventDefault();

  console.log("Edit post was pressed!");

  const post_title = document.querySelector("#post_title").value;
  const post_body = document.querySelector("#post_body").value;

  const urlArr = window.location.toString().split("/");
  const post_id = urlArr[urlArr.length - 1];

  if (post_title && post_body) {
    const response = await fetch(`/post/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ post_title, post_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Failed to add a post.");
    }
  }
};

document
  .querySelector("#edit-post-btn")
  .addEventListener("click", editPostFormHandler);
