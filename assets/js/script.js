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
        event.target.id === "distance-km-field"
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