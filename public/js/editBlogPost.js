// Extract the blog post ID from the current URL
let blogPost = window.location.pathname.split("/");

// Function created that handles the redirection to the edit page from the individual blog post page
const editPost = async (event) => {
  event.preventDefault();

  // Get the value of the "editBtn" input and trim any whitespace
  const comment_body = document.getElementById("editBtn").value.trim();

  // Redirect the user to the edit page for the specified blog post ID
  document.location.assign(`/create/${blogPost[2]}`);
};

// Get all elements with the id "editBtn" and add an event listener for edit functionality
const editButton = document.querySelectorAll("#editBtn");
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}