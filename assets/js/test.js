// Function to calculate travel time with km and velocity (t = dkm / v)
function calculateTravelTimeKm(distanceKm, velocity) {
    if (velocity === 0) {
        throw new Error("Velocity cannot be zero.");
    }
    return distanceKm / velocity;
}

// Function to calculate travel time with mi and velocity (t = dmi / v)
function calculateTravelTimeMi(distanceMi, velocity) {
    if (velocity === 0) {
        throw new Error("Velocity cannot be zero.");
    }
    return distanceMi / velocity;
}

// Function to calculate distance in Km with velocity and time (d = v * t)
function calculateDistanceKm(velocity, time) {
    return velocity * time;
}

// Function to calculate distance in Mi with velocity and time (d = v * t)
function calculateDistanceMi(velocity, time) {
    return velocity * time;
}

// Function to calculate velocity with km and time (v = dkm / t)
function calculateVelocityKm(distanceKm, time) {
    if (time === 0) {
        throw new Error("Time cannot be zero.");
    }
    return distanceKm / time;
}

// Function to calculate velocity with mi and time (v = dmi / t)
function calculateVelocityMi(distanceMi, time) {
    if (time === 0) {
        throw new Error("Time cannot be zero.");
    }
    return distanceMi / time;
}

// Function to convert Km to Mi
function kmToMiles(km) {
    return km * 0.621371;
}

// Function to convert Mi to Km
function milesToKm(miles) {
    return miles * 1.60934;
}

// Function to reset all travel time input fields
function resetTravelTimeFields() {
    document.getElementById("velocity-field").value = "0.00";
    document.getElementById("distance-km-field").value = "0.00";
    document.getElementById("travel-time-field").value = "0h 0m";
    document.getElementById("distance-mi-field").value = "0.00";
}

// Event listener for reset button to execute resetTravelTimeFields
document
    .getElementById("reset-btn-time")
    .addEventListener("click", resetTravelTimeFields);

document.addEventListener("DOMContentLoaded", () => {
    const velocityField = document.getElementById("velocity-field");
    const distanceKmField = document.getElementById("distance-km-field");
    const distanceMiField = document.getElementById("distance-mi-field");
    const travelTimeField = document.getElementById("travel-time-field");

    // Function to update fields with the calculated values
    function updateFields(timeInHours, distanceMi, distanceKm) {
        const remainingMinutes = Math.round(
            (timeInHours - Math.floor(timeInHours)) * 60
        );
        document.getElementById("travel-time-field").value = `${Math.floor(
        timeInHours
      )}h ${remainingMinutes}m`;
        if (distanceMi !== undefined)
            document.getElementById("distance-mi-field").value =
            distanceMi.toFixed(2);
        if (distanceKm !== undefined)
            document.getElementById("distance-km-field").value =
            distanceKm.toFixed(2);
    }

    // Function to update values
    function updateCalculations() {
        const velocity = parseFloat(velocityField.value);
        const distanceKm = parseFloat(distanceKmField.value);

        if (isNaN(velocity) || isNaN(distanceKm)) {
            updateFields(0, 0, 0);
            return;
        }

        const time = distance / velocity;
        timeField.value = time.toFixed(2);
    }

    velocityField.addEventListener("input", calculateTimeAndDistance);
    distanceField.addEventListener("input", calculateTimeAndDistance);
});

let originalDistanceKm; // Declare a variable to store the original distance in kilometers

document.getElementById("unit-select").addEventListener("change", function () {
    const unit = this.value;
    const velocityField = document.getElementById("velocity-field");
    const distanceField = document.getElementById("distance-field");
    const velocity = parseFloat(velocityField.value);
    let distance = parseFloat(distanceField.value);
    const conversion = 0.621371; // Conversion factor from kilometers to miles

    if (unit === "mi") {
        // Store the original distance in kilometers
        originalDistanceKm = distance;

        // Convert distance from km to mi
        distance = distance * conversion;
        document.querySelector(".units-vst-v").textContent = "mi/h";
        document.querySelector(".units-vst-d").textContent = "mi";
    } else {
        // Use the original distance in kilometers
        distance = originalDistanceKm;
        document.querySelector(".units-vst-v").textContent = "km/h";
        document.querySelector(".units-vst-d").textContent = "km";
    }

    const time = distance / velocity;

    document.getElementById("time-field").value = time.toFixed(2);
});

/**
 * Function to convert currency
 */
function calculateCurrency() {
    const originCurrency = document.getElementById("currency-origin").value;
    const destinationCurrency = document.getElementById(
        "currency-destination"
    ).value;
    const amount = parseFloat(
        document.getElementById("currency-origin-field").value
    );

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("currency-destination-field").value = "";
        return;
    }

    // Exchange rates hard-coded to not use an api
    const exchangeRates = {
        EUR: {
            USD: 1.1,
            GBP: 0.85,
        },
        USD: {
            EUR: 0.91,
            GBP: 0.77,
        },
        GBP: {
            EUR: 1.18,
            USD: 1.3,
        },
    };

    const rate = exchangeRates[originCurrency][destinationCurrency];
    if (!rate) {
        alert("Conversion rate not available");
        return;
    }

    const convertedAmount = amount * rate;
    document.getElementById("currency-destination-field").value =
        convertedAmount.toFixed(2);
}

/**
 * Function to reset all currency calculator input fields
 */
function resetCurrencyCalculator() {
    document.getElementById("currency-origin").value = "EUR";
    document.getElementById("currency-destination").value = "GBP";
    document.getElementById("currency-origin-field").value = "0.00";
    document.getElementById("currency-destination-field").value = "0.00";
}

// Event listener for reset button to execute resetCurrencyCalculator
document
    .getElementById("reset-btn-currency")
    .addEventListener("click", resetCurrencyCalculator);