# Refactor

## Refactor process of the navigation script

At the first attempt, the navigation menu had some errors, was confusing and convoluted.

Since I had already written this code quite early in the project phase, and the first attempt to revise it failed.

So I decided to use the knowledge I had gained in the last few days to distribute the entire code into two separate scripts.
The Script.js now contains the functions related to the calculations for the calculators.

The complete navigation is now created in navigation.js.

### This extra readme is dedicated to this refactoring process.


## The Mess

[The old Navigation](assets/js/old-navigation.js)

One of the reasons for the reorganization was that this was already the second attempt to solve the errors in the navigation.

The modal menu and the navigation links were still causing errors, and so I decided to do the following.

## Completely rebuild the navigation.

### Pseudo-pseudo code

**the modal menu must open**
 - when the menu is open, blur and overlay are active
 - when the menu is open the body should not scroll

**the modal menu must close**
 - when clicking on link
 - on click on icon
 - click on page
 - on key ESC
 - on key back
 - blur must close
 - overlay must close

**mobile the menu must show all links**
 - the links can be selected individually
 - the links open sections individually
 - one link opens all sections
 - but not instructions
 - the links open instructions individually

**desktop the modal menu must only show instructions and all sections links**	
 - one link opens all sections
 - but not instructions
 - a link opens instructions

**on mobile the sections should be displayed individually**
**displaying all sections excludes instructions section**

### List of needed function

#### Main functions:

1. `openModalMenu`
2. `closeModalMenu`
3. `handleMenuLinkClick`
4. `handleMenuIconClick`
5. `handlePageClick`
6. `handleKeyPress`

#### Helper functions:

1. `showBlurEffect`
2. `hideBlurEffect`
3. `disableBodyScroll`
4. `enableBodyScroll`
5. `showOverlay`
6. `hideOverlay`
7. `showSection`
8. `hideSection`
9. `hideAllSections`
10. `showAllSections`
11. `isMobileView`
12. `isDesktopView`
13. `toggleSectionVisibility`
14. `showInstructions`
15. `hideInstructions`

#### Functions for managing the links:

1. `updateNavLinks`
2. `initializeNavLinks`
3. `handleLinkClick`

#### Event Listener Functions:

1. `addMenuEventListeners`
2. `removeMenuEventListeners`

### The real pseudo for the functions

function openModalMenu:
  - Call showBlurEffect
  - Call showOverlay
  - Call disableBodyScroll
  - Set modal menu display to "block"

function closeModalMenu:
  - Call hideBlurEffect
  - Call hideOverlay
  - Call enableBodyScroll
  - Set modal menu display to "none"

function handleMenuLinkClick(event):
  - Get href attribute from the clicked link
  - If href is "#all", call showAllSections
  - Else if href is "#instructions", call showInstructions
  - Else, call showSection with href as parameter
  - Call closeModalMenu

function handleMenuIconClick:
  - Call closeModalMenu

function handlePageClick:
  - Call closeModalMenu

function handleKeyPress(event):
  - If key is ESC or Back, call closeModalMenu

// Helper functions:

function showBlurEffect:
  - Add "active" class to blurContent

function hideBlurEffect:
  - Remove "active" class from blurContent

function disableBodyScroll:
  - Set body overflow to "hidden"

function enableBodyScroll:
  - Set body overflow to "auto"

function showOverlay:
  - Set overlay display to "block"

function hideOverlay:
  - Set overlay display to "none"

function showSection(id):
  - Call hideAllSections
  - Set display of section with id to "grid"

function hideSection(id):
  - Set display of section with id to "none"

function hideAllSections:
  - Set display of all sections to "none"

function showAllSections:
  - Set display of all sections to "grid", except for "instructions"

function isMobileView:
  - Return true if window innerWidth is less than 992, else false

function isDesktopView:
  - Return true if window innerWidth is greater than or equal to 992, else false

function toggleSectionVisibility:
  - If isMobileView, call showSection, else call hideSection

function showInstructions:
  - Set display of "instructions" section to "grid"

function hideInstructions:
  - Set display of "instructions" section to "none"

// Functions for managing the links:

function updateNavLinks:
  - If isDesktopView, only show "instructions" and "all" links in modal menu
  - Else, show all links

function initializeNavLinks:
  - Add click event listener to each link, call handleMenuLinkClick

function handleLinkClick(event):
  - Call handleMenuLinkClick

// Event Listener Functions:

function addMenuEventListeners:
  - Add click event listener to menu icon, call handleMenuIconClick
  - Add click event listener to page, call handlePageClick
  - Add keypress event listener to document, call handleKeyPress

function removeMenuEventListeners:
  - Remove click event listener from menu icon
  - Remove click event listener from page
  - Remove keypress event listener from document

## The New and working navigation

[The new navigation](assets/js/navigation.js)
