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
