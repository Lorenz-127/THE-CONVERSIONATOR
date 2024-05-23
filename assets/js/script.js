// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to element with ID "open-modal-menu"
    document.getElementById("open-modal-menu").addEventListener("click", () => {
        // Display the element with ID "modal-menu" when clicked
        document.getElementById("modal-menu").style.display = "block";
        // Set blur effect to content behind modal menu visible
        document.getElementById("blur-content").classList.add("active");
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    });

    // Add event listener to element with ID "close-modal"
    document.getElementById("close-modal").addEventListener("click", () => {
        // Hide the element with ID "modal-menu" when clicked
        document.getElementById("modal-menu").style.display = "none";
        // Reset blur effect to content behind modal menu to hidden
        document.getElementById("blur-content").classList.remove("active");
        // Enable body scroll
        document.body.style.overflow = 'auto';
    });
});

// Add even listener to ID "open-instructions"
const infoBtn = document.getElementById("open-instructions");
// Add even listener to links in overlay section
const overlayNavLinks = document.querySelectorAll(".overlay-nav-links a");
// Add even listener to links in instructions section
const instructionsNavLinks = document.querySelectorAll(".instructions-wrapper a");
// Add even listener to links in both overlay-nav-link and instructions-wrapper sections 
const navLinks = document.querySelectorAll(".overlay-nav-links a, .instructions-wrapper a");


// Add even listener to element with ID "open-instructions"
infoBtn.addEventListener("click", function () {
    // Hide all sections
    hideAllSections();

    // Show instructions section
    openInstructionSection();
})

/**
 * Function to open the Instructions via circle-question icon
 */
function openInstructionSection() {
    const instructionSection = document.getElementById("instructions");
    instructionSection.style.display = "grid";
}

/**
 * Function to hide all sections
 */
function hideAllSections() {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        section.style.display = "none";
    });
}

/**
 * Function to show selected section
 */
function showSection(id) {
    const section = document.querySelector(id);
    if (section) {
        section.style.display = "grid";
    }
}

/**
 * Function to update the navigation links based on screen size
 */
function updateNavLinks() {
    // Check if screen size is larger then 992px
    if (window.innerWidth >= 992) {
        // If equal or bigger, show only "instructions" and "index" links
        overlayNavLinks.forEach((link) => {
            const showLinks = link.getAttribute("href");
            if (showLinks === "#instructions" || showLinks === "index.html") {
                link.style.display = "block";
            } else {
                link.style.display = "none";
            }
        });
    } else {
        // If smaller, set href of navigation their original values
        navLinks.forEach((link) => {
            link.style.display = "block";
        });
    }
}

// Add click event listener to each overlay-nav-link
navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        const href = this.getAttribute("href");
        // Check if the clicked link href is "index.html" or "#instructions"
        if (href === "index.html" || href === "#instructions") {
            if (href === "index.html") {
                // If it is, reload page for index.html
                location.reload();
            } else {
                // Prevent default action for "#instructions"
                event.preventDefault();

                // Hide all sections
                hideAllSections();

                // Show the selected section
                showSection(href);

                // Hide the modal menu
                document.getElementById("modal-menu").style.display = "none";

                // Reset blur effect to content behind modal menu to hidden
                document.getElementById("blur-content").classList.remove("active");
            }
        }
    });
});

// Call updateNavLinks when the window is resized
window.addEventListener("resize", updateNavLinks);

// Call updateNavLinks on page load
window.addEventListener("load", updateNavLinks);

/** 
 * Function to reset all travel time input fields
 */
function resetTravelTimeFields() {
    document.getElementById("velocity-field").value = "1.00";
    document.getElementById("distance-field").value = "1.00";
    document.getElementById("time-field").value = "1h 0m";
}

/**
 * Replace "," with "." for German users
 */
function replaceCommaWithDot(number) {
    return String(number).replace(",", ".");
}

// Add event listener to initialize calculations on input change
document.addEventListener("input", function (event) {
    const inputFieldId = event.target.id;

    // Replace commas with dots
    if (event.target.value.includes(",")) {
        event.target.value = replaceCommaWithDot(event.target.value);
    }
    // Determine which calculation to trigger based on the input field ID
    if (
        ["velocity-field", "distance-field", "time-field"].includes(inputFieldId)
    ) {
        calculateTimeForDistance();
    } else if (
        ["distance-fuel-field", "distance-consumption-field", "price-per-unit-field", ].includes(inputFieldId)
    ) {
        CalculateTravelCost();
    } else if (
        ["currency-origin", "currency-origin-field", "currency-destination", ].includes(inputFieldId)
    ) {
        calculateCurrency();
    } else if (
        ["transportation-mode", "fuel-type", "distance-co2-footprint-field", ].includes(inputFieldId)
    ) {
        calculateCO2Footprint();
    }
});

// Event listener for reset button to execute resetTravelTimeFields
document
    .getElementById("reset-btn-time")
    .addEventListener("click", resetTravelTimeFields);

document.addEventListener("DOMContentLoaded", () => {
    const velocityField = document.getElementById("velocity-field");
    const distanceField = document.getElementById("distance-field");


    velocityField.addEventListener("input", calculateTimeForDistance);
    distanceField.addEventListener("input", calculateTimeForDistance);
});

// Get and parse input values, replacing commas with dots for decimal points
const getParsedValue = (inputField) => {
    const dotForComma = replaceCommaWithDot(
        document.getElementById(inputField).value
    );
    document.getElementById(inputField).value = dotForComma; // Update the input field with the replaced value
    return parseFloat(dotForComma);
};

/**
 * Format time in hours and remaining minutes.
 */
function formatHoursAndMinutes(timeInHours) {
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);
    return `${hours}h ${minutes}m`;
}

/** 
 * Function to calculate time needed for distance
 */
function calculateTimeForDistance() {
    const velocity = getParsedValue("velocity-field");
    const distance = getParsedValue("distance-field");
    const timeField = document.getElementById("time-field");

    if (isNaN(velocity) || isNaN(distance)) {
        timeField.value = "0h 0m";
        return;
    }

    const time = distance / velocity;
    timeField.value = formatHoursAndMinutes(time);
}

let originalDistanceKm; // Declare a variable to store the original distance in kilometers

document.getElementById("unit-select").addEventListener("change", function () {
    const unit = this.value;
    const velocityField = document.getElementById("velocity-field");
    const distanceField = document.getElementById("distance-field");
    const timeField = document.getElementById("time-field");
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
    timeField.value = formatHoursAndMinutes(time);
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


// Emission factors in kg CO2 per km
const emissionFactors = {
    train: {
        electricity: 0.022,
        diesel: 0.045,
    },
    bus: {
        electricity: 0.032,
        diesel: 0.09,
        gasoline: 0.11,
    },
    car: {
        electricity: 0.025,
        diesel: 0.15,
        gasoline: 0.17,
    },
};

/**
 * Function to calculate CO₂ footprint for your travel
 */
function calculateCO2Footprint() {
    const transportationMode = document.getElementById(
        "transportation-mode"
    ).value;
    const fuelType = document.getElementById("fuel-type").value;
    const distanceCo2 = getParsedValue("distance-co2-footprint-field");
    const co2Field = document.getElementById("co2-footprint-field");

    // Check if distance is a number
    if (isNaN(distanceCo2)) {
        co2Field.value = "0.00";
        return;
    }

    // Get the emission factor for the selected mode and fuel type
    const emissionFactor = emissionFactors[transportationMode][fuelType];
    // Calculate the CO2 footprint
    const co2Footprint = distanceCo2 * emissionFactor;
    // Display the CO2 footprint in the output field
    co2Field.value = co2Footprint.toFixed(2);
}

let originalDistanceCo2; // Declare a variable to store the original distance in kilometers

// Event listener for units-Co2 select dropdown
document
    .getElementById("unit-select-co2")
    .addEventListener("change", function () {
        const co2Unit = this.value;
        const distanceCo2Field = document.getElementById(
            "distance-co2-footprint-field"
        );
        let distanceCo2 = parseFloat(distanceCo2Field.value);

        // Conversion from miles to kilometers for Co2 footprint calculation
        const conversionMiCo2 = 1.60934;

        if (co2Unit === "mi") {
            // Store the original distance in kilometers for conversion
            originalDistanceCo2 = distanceCo2;

            // Convert distance from km to mi
            distanceCo2 = distanceCo2 / conversionMiCo2;
            document.querySelector(".units-co2-d").textContent = "mi";
            document.querySelector(".units-co2-g").textContent = "kgCO₂/mi";
        } else {
            // Use the original distance in kilometers
            distanceCo2 = originalDistanceCo2;
            document.querySelector(".units-co2-d").textContent = "km";
            document.querySelector(".units-co2-g").textContent = "kgCO₂/km";
        }

        distanceCo2Field.value = distanceCo2.toFixed(2);
        calculateCO2Footprint(); // Recalculate the CO2 footprint after unit change
    });

// Event listener for reset button to execute resetCo2Fields
document.getElementById("reset-btn-footprint").addEventListener("click", resetCo2Fields);

/**
 * Function to reset the CO2 footprint calculation fields
 */
function resetCo2Fields() {
    document.getElementById("transportation-mode").value = "train";
    document.getElementById("fuel-type").value = "electricity";
    document.getElementById("unit-select-co2").value = "km";
    document.getElementById("distance-co2-footprint-field").value = "0.00";
    document.getElementById("co2-footprint-field").value = "0.00";
}