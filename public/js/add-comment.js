const addCommentFormHandler = async (e) => {
  e.preventDefault();

  console.log("Add comment was pressed!")

  const comment_text = document.querySelector("#new-comment").value;

  const urlArr = window.location.toString().split("/");
  const post_id = urlArr[urlArr.length - 1];

// TODO: need to get user ID from session somehow

// const user_id = req.session.userid;

// console.log(req.session); 
console.log(comment_text);
console.log(post_id);
// console.log(user_id);

document.location.replace(`/post/${post_id}`);

//   if (comment_text) {
//     const response = await fetch("/comment", {
//       method: "POST",
//       body: JSON.stringify({ comment_text, post_id, user_id }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace(`/post/${post_id}`);
//     } else {
//       alert("Failed to add a comment.");
//     }
//   }
};


document
  .querySelector("#add-comment-btn")
  .addEventListener("click", addCommentFormHandler);
