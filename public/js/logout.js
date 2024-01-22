// Logout user function
const logout = async () => {
  // Send a POST request to the API endpoint for user logout
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    // Check if the logout was successful
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      // Display an alert with the status text if logout fails
      alert(response.statusText);
    }
  };
  
  // Event Listener: Attach the logout function to the click event of the element with the id "logout"
  document.querySelector("#logout").addEventListener("click", logout);