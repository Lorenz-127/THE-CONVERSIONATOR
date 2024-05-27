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
   * Function to open the instructions section.
   */
  function openInstructionSection() {
    const instructionSection = document.getElementById("instructions");
    if (instructionSection) {
      instructionSection.style.display = "grid";
    }
  }
  
  /**
   * Function to add click event listeners to each overlay navigation link.
   */
  function initializeNavLinks() {
    const navLinks = document.querySelectorAll(".overlay-nav-links li");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavLinkClick);
    });
  }
  
  
  // Variable to initialize the modal menu
  let modalMenu = initializeModalMenu();
  // Variable to store the last clicked link
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
  
  
    // Check if the instructions section is open
    const instructionSection = document.getElementById("instructions");
    if (instructionSection && instructionSection.style.display !== "grid") {
      showAllCalculators();
    }
  }
  
