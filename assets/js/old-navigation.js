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

// Add variable for event listener to ID "open-instructions"
const infoBtn = document.getElementById("open-instructions");
// Add variable for event listener to links in overlay section
const overlayNavLinks = document.querySelectorAll(".overlay-nav-links a");
// Add variable for event listener to links in both overlay-nav-link and instructions-wrapper sections 
const navLinks = document.querySelectorAll(".overlay-nav-links a, .instructions-wrapper a");


// Add even listener to element with ID "open-instructions"
infoBtn.addEventListener("click", function () {
    // Hide all sections
    hideAllSections();

    // Show instructions section
    openInstructionSection();
});

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