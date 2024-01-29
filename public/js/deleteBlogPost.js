// Function created that handles the deletion of a blog post from the individual blog post page
const deletePostHandler = async (event) => {
    event.preventDefault();
  
    // Extract the blog post ID from the current URL
    let blogPost = window.location.pathname.split("/");
  
    // Send a DELETE request to the server endpoint for deleting the current blog post
    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
      method: "DELETE",
    });
  
    // Check if the deletion was successful
    if (response.ok) {
      // Redirect the user to the dashboard after successful deletion
      document.location.assign(`/dashboard`);
    } else {
      // Display an alert with the status text if deletion fails
      alert(response.statusText);
    }
  };
  
  // Get all elements with the id "deleteBtn" and add an event listener for delete functionality
  const deleteButton = document.querySelectorAll("#deleteBtn");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePostHandler);
  }