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

        try {
            const travelTime =
                calculateTravelTimeKm(distanceKm, velocity) ||
                calculateTravelTimeMi(distanceMi, velocity);
            const distanceMi = calculateTravelTimeMi(distanceMi, velocity);
            const distanceKm = calculateDistanceKm(velocity, time);
            const velocity =
                calculateVelocityKm(distanceKm, time) ||
                calculateVelocityMi(distanceMi, time);

            updateFields(travelTime, distanceMi, distanceKm, velocity);
        } catch (error) {
            alert(error.message);
        }
    }

    velocityField.addEventListener("input", updateCalculations);
    distanceKmField.addEventListener("input", updateCalculations);
    distanceMiField.addEventListener("input", updateCalculations);
    travelTimeField.addEventListener("input", updateCalculations);
});



// function to calculate travel time with km and velocity
// t = dkm/v

// function to calculate travel time with mi and velocity
// t = dmi/v

// function to calculate distance in Km with velocity and time
// dkm = v/t

// function to calculate distance in Mi with velocity and time
// dmi = v/t

// function to calculate velocity with km and time
// v = dkm/t

// function to calculate velocity with mi and time
// v = dmi/t

// function to convert Km to Mi
// 1 km = 0.621371 mi

// function to convert Mi to Km
// 1 mi = 1.60934 km

// function to reset all travel time input fields
// set all input fields to 0