// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get event listeners
  initializeModalMenu();
  initializeInstructionButton();
  initializeNavLinks();
  handleInstructionLinkClicks();
  updateNavLinks();
  window.addEventListener("resize", updateNavLinks);
  window.addEventListener("load", updateNavLinks);
});

/**
 * Function to add event listeners to open and close the modal menu.
 */
function initializeModalMenu() {
  const openButton = document.getElementById("open-modal-menu");
  const closeButton = document.getElementById("close-modal-menu");
  const modal = document.getElementById("modal-menu");
  const blurContent = document.getElementById("blur-content");

  if (openButton && closeButton && modal && blurContent) {
    openButton.addEventListener("click", () => openModal(modal, blurContent));
    closeButton.addEventListener("click", () => closeModal(modal, blurContent));
  }
  return { modal, blurContent };
}

/**
 * Function to open the modal menu.
 */
function openModal(modal, blurContent) {
  modal.style.display = "block";
  blurContent.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Function to close the modal menu.
 */
function closeModal(modal, blurContent) {
  modal.style.display = "none";
  blurContent.classList.remove("active");
  document.body.style.overflow = "auto";
}

/**
 * Function to add event listener to the "open-instructions" button.
 */
function initializeInstructionButton() {
  const infoBtn = document.getElementById("open-instructions");
  if (infoBtn) {
    infoBtn.addEventListener("click", function () {
      hideAllSections();
      openInstructionSection();
    });
  }
}

/**
 * Function to hide all sections.
 */
function hideAllSections() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

/**
 * Function to opens the instructions section.
 */
function openInstructionSection() {
  const instructionSection = document.getElementById("instructions");
  if (instructionSection) {
    instructionSection.style.display = "grid";
  }
}

/**
 * Function to add event listener to each overlay navigation link.
 */
function initializeNavLinks() {
  const navLinks = document.querySelectorAll(".overlay-nav-links li");
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });
}

/**
 * Function to show selected section
 */
function showSection(href) {
  const targetSection = document.querySelector(href);
  if (targetSection) {
    targetSection.style.display = "grid";
  }
}

/**
 * Function to show all calculator sections
 */
function showAllCalculators() {
  const calculators = [
    "#vst",
    "#fuel-consumption",
    "#currency-calculator",
    "#co2-footprint",
  ];
  calculators.forEach((calculator) => {
    const section = document.querySelector(calculator);
    if (section) {
      section.style.display = "grid";
    }
  });
}

// variable to initialize the modal menu
let modalMenu = initializeModalMenu();
// variable to store the last clicked link
let lastClickedLink = null;

/**
 * Function to handle the click event on the navigation links
 */
function handleNavLinkClick(event) {
  const href = this.querySelector("a").getAttribute("href");
  lastClickedLink = href;
  if (href === "index.html" || href === "#instructions") {
    if (href === "index.html") {
      location.reload();
    } else {
      event.preventDefault();
      hideAllSections();
      showSection(href);
    }
  }
  closeModal(modalMenu.modal, modalMenu.blurContent);
  updateNavLinks();
}

/**
 * Function to update the navigation links based on screen size
 */
function updateNavLinks() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 992) {
    handleLargeScreen();
  } else {
    handleSmallScreen();
  }
}

/**
 * Function to handle instruction section links
 */
function handleInstructionLinks() {
  const navLinks = document.querySelectorAll(".overlay-nav-links li");

  navLinks.forEach((link) => {
    const href = link.querySelector("a").getAttribute("href");
    if (href === "#instructions") {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });
}

/**
 * Function to handle navigation on large screens
 */
function handleLargeScreen() {
  handleInstructionLinks();
  const navLinks = document.querySelectorAll(".overlay-nav-links li");
  navLinks.forEach((link) => {
    const href = link.querySelector("a").getAttribute("href");
    if (href !== "index.html" && href !== "#instructions") {
      link.style.display = "none";
    } else {
      link.style.display = "block";
    }
  });

  // Check if the instructions section is open
  const instructionSection = document.getElementById("instructions");
  if (instructionSection && instructionSection.style.display !== "grid") {
    showAllCalculators();
  }
}

/**
 * Function to handle navigation on small screens
 */
function handleSmallScreen() {
  const navLinks = document.querySelectorAll(".overlay-nav-links li");

  navLinks.forEach((link) => {
    link.style.display = "block";
  });

  if (lastClickedLink) {
    hideAllSections();
    showSection(lastClickedLink);
  }
}

/**
 * Function to handle clicks on instruction links
 */
function handleInstructionLinkClicks() {
  const instructionLinks = document.querySelectorAll(".instructions-wrapper a");
  instructionLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const href = link.getAttribute("href");
      if (window.innerWidth < 992) {
        hideAllSections();
        showSection(href);
      } else {
        // Close the instructions section
        const instructionSection = document.getElementById("instructions");
        if (instructionSection) {
          instructionSection.style.display = "none";
        }
        showAllCalculators();
      }
    });
  });
}
 