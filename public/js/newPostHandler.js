// Function that handles the submission of new blog posts
async function newPostHandler(event) {
    event.preventDefault();
  
    // Get the values of the title and description inputs and trim any leading or trailing whitespace
    const title = document.querySelector("#titleInput").value.trim();
    const description = document.querySelector("#bodyInput").value.trim();
  
    if (title && description) {
      // Send a POST request to the API endpoint for creating new blog posts
      const response = await fetch(`/api/blogPost`, {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the blog post creation was successful
      if (response.ok) {
        // If successful, redirect the browser to the user's dashboard
        document.location.replace("/dashboard");
      } else {
        // Display an alert with the status text if blog post creation fails
        alert(response.statusText);
      }
    }
  }
  
  // Event Listener: Attach the newPostHandler function to the form submission event of the blog post creation form
  document
    .querySelector(".createBlogPost")
    .addEventListener("submit", newPostHandler);