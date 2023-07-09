const addPostFormHandler = async (e) => {
  e.preventDefault();

  console.log("Add post was pressed!");

  const post_title = document.querySelector("#post_title").value;
  const post_body = document.querySelector("#post_body").value;

  console.log(post_title);
  console.log(post_body);

  if (post_title && post_body) {
    const response = await fetch("/post", {
      method: "POST",
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
  .querySelector("#add-post-btn")
  .addEventListener("click", addPostFormHandler);
