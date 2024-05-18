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

// Add event listener to initialize calculations when input fields change
document.addEventListener("input", function (event) {
    if (
        event.target.id === "velocity-field" ||
        event.target.id === "distance-km-field" ||
        event.target.id === "time-field" ||
        event.target.id === "distance-mi-field"
    ) {
        // Format the input value before calculating time and distance
        event.target.value = formatNumberForLocale(event.target.value);
        calculateTimeAndDistance();
    } else if (
        event.target.id === "distance-fuel-field" ||
        event.target.id === "distance-consumption-field" ||
        event.target.id === "price-per-unit-field"
    ) {
        calculateFuelCost();
    } else if (
        event.target.id === "transportation-mode" ||
        event.target.id === "fuel-type" ||
        event.target.id === "distance-co2-footprint-field"
    ) {
        calculateCO2Footprint();
    }
});

// Add global function to replace "," with "." for German users
function formatNumberForLocale(number) {
    // Replace "," with "."
    return number.replace(",", ".");
}

// Add event listeners for calculateTimeAndDistance function
document.getElementById('velocity-field').addEventListener('input', calculate);
document.getElementById('distance-km-field').addEventListener('input', calculate);
document.getElementById('time-field').addEventListener('input', calculate);
document.getElementById('distance-mi-field').addEventListener('input', calculate);
document.getElementById('reset-btn-time').addEventListener('click', resetFields);

/**
 * Calculate Time and Distance, Convert distance to miles,
 * Calculate the time required, Format time in hours and minutes
 */
function calculateTimeAndDistance() {
    // Get the values from the input fields and replace "." with "," for German users



    // Calculate time if velocity and distance in km are given

    // Calculate velocity if time and distance in km are given

    // Calculate distance in km if time and velocity are given

    // Calculate velocity if time and distance in miles are given

    // Calculate time if velocity and distance in miles are given

    // Calculate distance in km if velocity and distance in miles are given

    // Validate input

    // Convert distance to miles (1 km = 0.621371 miles)

    // Calculate remaining minutes

    // Format time in hours and minutes

    // Update output fields

    // reset all fields
}