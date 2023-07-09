const addCommentFormHandler = async (e) => {
  e.preventDefault();

  console.log("Add comment was pressed!");

  const comment_text = document.querySelector("#new-comment").value;

  const urlArr = window.location.toString().split("/");
  const post_id = urlArr[urlArr.length - 1];

  if (comment_text) {
    const response = await fetch("/comment", {
      method: "POST",
      body: JSON.stringify({ comment_text, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to add a comment.");
    }
  }
};

document
  .querySelector("#add-comment-btn")
  .addEventListener("click", addCommentFormHandler);
