// Function that handles the submission of new comments to blog posts
async function newCommentHandler(event) {
    event.preventDefault();
  
    console.log("clicked me");
  
     // Get the text from the comment input and trim any leading or trailing whitespace
    const comment_body = document.getElementById("comment").value.trim();
    
    // Get the blog post ID from the URL
    const url = window.location.toString().split("/");
    const blogPost_id = url[url.length - 1];
  
    if (comment_body) {
      // Send a POST request to the API endpoint for creating new comments
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          blogPost_id,
          comment_body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the comment creation was successful
      if (response.ok) {
        // If successful, reload the page to display the new comment
        document.location.reload();
      } else {
        // Display an alert with the status text if comment creation fails
        alert(response.statusText);
      }
    }
  }
  
  // Event Listener: Attach the newCommentHandler function to the form submission event
  console.log("HERE!");
  console.log(document.getElementById("comment-form"));
  document
    .getElementById("comment-form")
    .addEventListener("submit", newCommentHandler);