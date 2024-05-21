// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to element with ID "curtain-open"
    document.getElementById("curtain-open").addEventListener("click", () => {
        // Display the element with ID "curtain-menu" when clicked
        document.getElementById("curtain-menu").style.display = "block";
        // set blur effect to content behind curtain menu visible
        document.getElementById("blur-content").classList.add("active");
    });
});
// Add event listener to element with ID "curtain-close"
document.getElementById("curtain-close").addEventListener("click", () => {
    // Hide the element with ID "curtain-menu" when clicked
    document.getElementById("curtain-menu").style.display = "none";
    // reset blur effect to content behind curtain menu to hidden
    document.getElementById("blur-content").classList.remove("active");
});

// Select all navigation links in overlay and instruction section
const navLinks = document.querySelectorAll(
    ".overlay-nav-links a, .instructions-wrapper a"
);

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

// Add click event listener to each overlay-nav-link
navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        // Check clicked link href is "index.html"
        if (
            this.getAttribute("href") === "index.html" ||
            this.getAttribute("href") === "#instructions"
        )
            if (this.getAttribute("href") === "index.html") {
                // If it is, reload page for index.html or do nothing for #instructions
                location.reload();
            } else {
                // Prevent default action
                event.preventDefault();

                // Hide all sections
                hideAllSections();

                // Show the selected section
                showSection(this.getAttribute("href"));

                // Hide the curtain menu
                document.getElementById("curtain-menu").style.display = "none";
                // reset blur effect to content behind curtain menu to hidden
                document.getElementById("blur-content").classList.remove("active");
            }
    });
});

/**
 * Function to update the navigation links based on screen size
 */
function updateNavLinks() {
    // Check if screen size is larger then 992px
    if (window.innerWidth >= 992) {
        // If equal or bigger, set href of navigation links to "index.html"
        navLinks.forEach((link) => {
            if (link.getAttribute("href") !== "#instructions") {
                link.setAttribute("href", "index.html");
            }
        });
    } else {
        // If smaller, set href of navigation their original values
        navLinks[0].setAttribute("href", "#instructions");
        navLinks[1].setAttribute("href", "#vst");
        navLinks[2].setAttribute("href", "#fuel-consumption");
        navLinks[3].setAttribute("href", "#currency-calculator");
        navLinks[4].setAttribute("href", "#co2-footprint");
        navLinks[5].setAttribute("href", "index.html");
    }
}

// Call updateNavLinks when the window is resized
window.addEventListener("resize", updateNavLinks);

// Call updateNavLinks on page load
window.addEventListener("load", updateNavLinks);

// Function to reset all travel time input fields
function resetTravelTimeFields() {
    document.getElementById("velocity-field").value = "0.00";
    document.getElementById("distance-field").value = "0.00";
    document.getElementById("time-field").value = "0h 0m";
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
        calculateTimeAndDistance();
    } else if (
        [
            "distance-fuel-field",
            "distance-consumption-field",
            "price-per-unit-field",
        ].includes(inputFieldId)
    ) {
        CalculateTravelCost();
    } else if (
        [
            "currency-origin",
            "currency-origin-field",
            "currency-destination",
        ].includes(inputFieldId)
    ) {
        calculateCurrency();
    } else if (
        [
            "transportation-mode",
            "fuel-type",
            "distance-co2-footprint-field",
        ].includes(inputFieldId)
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
    const timeField = document.getElementById("time-field");

    // Get and parse input values, replacing commas with dots for decimal points
    const getParsedValue = (inputField) => {
        const value = replaceCommaWithDot(
            document.getElementById(inputField).value
        );
        document.getElementById(inputField).value = value; // Update the input field with the replaced value
        return parseFloat(value);
    };

    // Function to update values
    function calculateTimeAndDistance() {
        const velocity = getParsedValue("velocity-field");
        const distance = getParsedValue("distance-field");

        if (isNaN(velocity) || isNaN(distance)) {
            timeField.value = "0h 0m";
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