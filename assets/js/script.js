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

// Add global function to replace "," with "." for German users
function formatNumberForLocale(number) {
    // Replace "," with "."
    return number.replace(",", ".");
}

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
document.getElementById('velocity-field').addEventListener('input', calculateTimeAndDistance);
document.getElementById('distance-km-field').addEventListener('input', calculateTimeAndDistance);
document.getElementById('time-field').addEventListener('input', calculateTimeAndDistance);
document.getElementById('distance-mi-field').addEventListener('input', calculateTimeAndDistance);
document.getElementById('reset-btn-time').addEventListener('click', resetTravelTimeFields);

/**
 * Calculate Time and Distance, Convert distance to miles,
 * Calculate the time required, Format time in hours and minutes
 */
function calculateTimeAndDistance() {
    // Retrieve DOM elements from input fields
    const velocityField = document.getElementById("velocity-field");
    const distanceKmField = document.getElementById("distance-km-field");
    const timeField = document.getElementById("time-field");
    const distanceMiField = document.getElementById("distance-mi-field");

    // Get the values from the input fields and replace ","  with "." for German users
    const velocity = parseFloat(
        formatNumberForLocale(document.getElementById("velocity-field").value)
    );
    const distanceKm = parseFloat(
        formatNumberForLocale(document.getElementById("distance-km-field").value)
    );
    const travelTime = parseFloat(
        formatNumberForLocale(document.getElementById("time-field").value)
    );
    const distanceMi = parseFloat(
        formatNumberForLocale(document.getElementById("distance-mi-field").value)
    );

    if (!isNaN(velocity) && velocity > 0 && !isNaN(distanceKm)) {
        // Calculate time if velocity and distance in km are given
        const calculatedTime = distanceKm / velocity;
        const calculatedDistanceMi = distanceKm * 0.621371;

        // Calculate remaining minutes
        const remainingMinutes = Math.round(
            (calculatedTime - Math.floor(calculatedTime)) * 60
        );

        // Format time in hours and minutes
        const formattedTime =
            Math.floor(calculatedTime) + "h " + remainingMinutes + "min";

        timeField.value = formattedTime;
        distanceMiField.value = calculatedDistanceMi.toFixed(2) + " miles";

    } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(distanceKm)) {
        // Calculate velocity if time and distance in km are given
        const calculatedVelocity = distanceKm / travelTime;
        const calculatedDistanceMi = distanceKm * 0.621371;

        velocityField.value = calculatedVelocity.toFixed(2) + " km/h";
        distanceMiField.value = calculatedDistanceMi.toFixed(2) + " miles";

    } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(velocity)) {
        // Calculate distance in km if time and velocity are given
        const calculatedDistanceKm = velocity * travelTime;
        const calculatedDistanceMi = calculatedDistanceKm * 0.621371;

        distanceKmField.value = calculatedDistanceKm.toFixed(2) + " km";
        distanceMiField.value = calculatedDistanceMi.toFixed(2) + " miles";

    } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(distanceMi)) {
        // Calculate velocity if time and distance in miles are given
        const calculatedDistanceKm = distanceMi / 0.621371;
        const calculatedVelocity = calculatedDistanceKm / travelTime;

        velocityField.value = calculatedVelocity.toFixed(2) + " km/h";
        distanceKmField.value = calculatedDistanceKm.toFixed(2) + " km";
    } else if (!isNaN(velocity) && velocity > 0 && !isNaN(distanceMi)) {
        // Calculate time if velocity and distance in miles are given
        const calculatedDistanceKm = distanceMi / 0.621371;
        const calculatedTime = calculatedDistanceKm / velocity;

        // Calculate remaining minutes
        const remainingMinutes = Math.round(
            (calculatedTime - Math.floor(calculatedTime)) * 60
        );

        // Format time in hours and minutes
        const formattedTime =
            Math.floor(calculatedTime) + "h " + remainingMinutes + "min";

        timeField.value = formattedTime;
        distanceKmField.value = calculatedDistanceKm.toFixed(2) + " km";
    } else if (!isNaN(distanceMi) && distanceMi > 0 && !isNaN(velocity)) {
        // Calculate distance in km if velocity and distance in miles are given
        const calculatedTime = distanceMi / velocity;
        const calculatedDistanceKm = distanceMi / 0.621371;

        // Calculate remaining minutes
        const remainingMinutes = Math.round(
            (calculatedTime - Math.floor(calculatedTime)) * 60
        );

        // Format time in hours and minutes
        const formattedTime =
            Math.floor(calculatedTime) + "h " + remainingMinutes + "min";

        timeField.value = formattedTime;
        distanceKmField.value = calculatedDistanceKm.toFixed(2) + " km";
    } else {
        // Validate input
        alert("Please enter valid numerical values for at least two fields.");
    }
}

// Function to reset all input fields
function resetTravelTimeFields() {
    document.getElementById('velocity-field').value = '';
    document.getElementById('distance-km-field').value = '';
    document.getElementById('time-field').value = '';
    document.getElementById('distance-mi-field').value = '';
}