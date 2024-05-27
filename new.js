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
  
  
    // Check if the instructions section is open
    const instructionSection = document.getElementById("instructions");
    if (instructionSection && instructionSection.style.display !== "grid") {
      showAllCalculators();
    }
  }
  
