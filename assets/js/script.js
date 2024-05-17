// Add event listener to element with ID "curtain-open"
document.getElementById("curtain-open").addEventListener("click", () => {
    // Display the element with ID "curtain-menu" when clicked
    document.getElementById("curtain-menu").style.display = "block";
    // set blur effect to content behind curtain menu visible
    document.getElementById("blur-content").classList.add("active");
});

// Add event listener to element with ID "curtain-close"
document.getElementById("curtain-close").addEventListener("click", () => {
    // Hide the element with ID "curtain-menu" when clicked
    document.getElementById("curtain-menu").style.display = "none";
    // reset blur effect to content behind curtain menu to hidden
    document.getElementById("blur-content").classList.remove("active");
});