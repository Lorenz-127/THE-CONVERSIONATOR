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

// Function to hide all sections
function hideAllSections() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

// Function to show selected section
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

// Function to update the navigation links based on screen size
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

// Replace "," with "." for German users
function formatNumberForLocale(number) {
  return String(number).replace(/,/g, ".");
}

// Add event listener to initialize calculations on input change
document.addEventListener("input", function (event) {
  const id = event.target.id;
  if (event.target.value.includes(",")) {
    event.target.value = formatNumberForLocale(event.target.value);
  }
  if (
    [
      "velocity-field",
      "distance-km-field",
      "time-field",
      "distance-mi-field",
    ].includes(id)
  ) {
    calculateTimeAndDistance();
  } else if (
    [
      "distance-fuel-field",
      "distance-consumption-field",
      "price-per-unit-field",
    ].includes(id)
  ) {
  } else if (
    [
      "currency-origin",
      "currency-origin-field",
      "currency-destination",
      "currency-destination-field",
    ].includes(id)
  ) {
    calculateCurrency();
  } else if (
    [
      "transportation-mode",
      "fuel-type",
      "distance-co2-footprint-field",
    ].includes(id)
  ) {
    calculateCO2Footprint();
  }
});

// Calculate Time and Distance
function calculateTimeAndDistance() {
  const conversion = 0.621371;
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
    updateFields(distanceKm / velocity, distanceKm * conversion);
  } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(distanceKm)) {
    document.getElementById("velocity-field").value = (
      distanceKm / travelTime
    ).toFixed(2);
    document.getElementById("distance-mi-field").value = (
      distanceKm * conversion
    ).toFixed(2);
  } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(velocity)) {
    updateFields(
      travelTime,
      velocity * travelTime * conversion,
      velocity * travelTime
    );
  } else if (!isNaN(travelTime) && travelTime > 0 && !isNaN(distanceMi)) {
    const distanceKm = distanceMi / conversion;
    document.getElementById("velocity-field").value = (
      distanceKm / travelTime
    ).toFixed(2);
    document.getElementById("distance-km-field").value = distanceKm.toFixed(2);
  } else if (!isNaN(velocity) && velocity > 0 && !isNaN(distanceMi)) {
    const distanceKm = distanceMi / conversion;
    updateFields(distanceKm / velocity, distanceMi, distanceKm);
  } else if (!isNaN(distanceMi) && distanceMi > 0 && !isNaN(velocity)) {
    const time = distanceMi / velocity;
    updateFields(time, distanceMi, distanceMi / conversion);
  } else {
    alert("Please enter valid numerical values for at least two fields.");
  }
}

// Update fields with calculated values
function updateFields(timeInHours, distanceMi, distanceKm) {
  const remainingMinutes = Math.round(
    (timeInHours - Math.floor(timeInHours)) * 60
  );
  document.getElementById("time-field").value = `${Math.floor(
    timeInHours
  )}h ${remainingMinutes}m`;
  if (distanceMi !== undefined)
    document.getElementById("distance-mi-field").value = distanceMi.toFixed(2);
  if (distanceKm !== undefined)
    document.getElementById("distance-km-field").value = distanceKm.toFixed(2);
}

// Function to reset all input fields
function resetTravelTimeFields() {
  document
    .querySelectorAll(
      "#velocity-field, #distance-km-field, #time-field, #distance-mi-field"
    )
    .forEach((field) => (field.value = "0"));
}

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

// Reset button for currency calculator
document.getElementById("reset-btn-currency").addEventListener("click", () => {
  document.getElementById("currency-origin").value = "EUR";
  document.getElementById("currency-destination").value = "GBP";
  document.getElementById("currency-origin-field").value = "0.00";
  document.getElementById("currency-destination-field").value = "0.00";
});

// Event listener for reset button for Travel Time section
document
  .getElementById("reset-btn-time")
  .addEventListener("click", resetTravelTimeFields);
