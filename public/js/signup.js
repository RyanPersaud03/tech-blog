// Handler for the signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (name && email && password) {
      // Send a POST request to the API endpoint for user registration
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Check if the registration was successful
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace("/");
      } else {
        // Display an alert with the status text if registration fails
        alert(response.statusText);
      }
    }
  };
  
  // Event Listeners: Attach the form handlers to the respective form submissions
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);