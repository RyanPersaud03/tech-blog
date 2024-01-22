// Extract the blog post ID from the current URL
let blogPost = window.location.pathname.split("/");

// Function that handles the submission of edited blog posts
const submitEdit = async (event) => {
  event.preventDefault();

  // Get the values of the title and description inputs
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("bodyInput").value;

  if (title && description) {
     // Send a PUT request to the API endpoint for updating the specified blog post
    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

     // Check if the blog post update was successful
    console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the user's dashboard
      document.location.assign("/dashboard");
    } else {
      // Display an alert with the status text if the update fails
      alert(response.statusText);
    }
  }
};

// Get the submit button by its ID
const submitButton = document.getElementById("submitEdit");

// Event Listener: Attach the submitEdit function to the form submission event
submitButton.addEventListener("submit", submitEdit);