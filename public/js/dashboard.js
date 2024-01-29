// Function created that allows users to delete blog posts on dashboard page and then redirect them to an updated dashboard
const deletePostController = async (event) => {
    event.preventDefault();
  
    // Get the data-id attribute from the clicked button, which represents the blog post ID
    let blogPostId = event.target.getAttribute("data-id");
  
    // Send a DELETE request to the server endpoint for deleting a blog post
    const response = await fetch(`/api/blogPost/${blogPostId}`, {
      method: "DELETE",
    });
  
    // Check if the deletion was successful
    if (response.ok) {
      // Redirect the user to the updated dashboard after successful deletion
      document.location.assign(`/dashboard`);
    } else {
      // Display an alert with the status text if deletion fails
      alert(response.statusText);
    }
  };
  
  // Function created that allows for a user to edit blog posts on dashboard page by redirecting them to the /create/:id page
  const editBlogPost = async (event) => {
    event.preventDefault();
  
     // Get the data-id attribute from the clicked button, which represents the blog post ID
    let blogPostId = event.target.getAttribute("data-id");
  
    // Redirect the user to the edit page for the specified blog post ID
    document.location.assign(`/create/${blogPostId}`);
  };
  
  // Get all elements with the id "editBtn" and add an event listener for edit functionality
  const editButton = document.querySelectorAll("#editBtn");
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", editBlogPost);
  }
  
  // Get all elements with the id "deleteBtn" and add an event listener for delete functionality
  const deleteButton = document.querySelectorAll("#deleteBtn");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePostController);
  }