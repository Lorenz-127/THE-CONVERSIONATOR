## THE-CONVERSIONATOR

## Introduction

### The live link can be found here - [THE-CONVERSIONATOR](https://lorenz-127.github.io/THE-CONVERSIONATOR/)

![Responsive Mockup](assets/feature-img/responsive-large.png)

Link to [responsive Mockup](https://ui.dev/amiresponsive?url=https://lorenz-127.github.io/THE-CONVERSIONATOR/index.html)
---
## CONTENTS

* [User Experience](#user-experience)
  * [User Stories](#user-stories)

* [Design](#design)
  * [Colour Scheme](#colour-scheme)
  * [Typography](#typography)
  * [Wireframes](#wireframes)

* [Features](#features)
  * [Existing Features](#existing-features)
  * [Features Left to Implement](#features-left-to-implement)
  * [Accessibility](#accessibility)

* [Technologies Used](#technologies-used)
  * [Languages Used](#languages-used)
  * [Programs Used](#programs-used)

* [Deployment & Local Development](#deployment-and-local-development)
  * [Deployment](#deployment)
  * [Local Development](#local-development)
    * [How to Fork](#how-to-fork)
    * [How to Clone](#how-to-clone)

* [Testing](#testing)

* [Credits](#credits)
  * [Content](#content)
  * [Acknowledgments](#acknowledgements)

## User Experience

### Main Idea

### Project Goal

### Target Audience

### User Goals

### Site Owner Goals

### User stories

- #### First-Time Visitor Goals

- #### Returning Visitor Goals

- #### Frequent User Goals

### Owner Goals
- #### First-Time Visitor Goals

- #### Returning Visitor Goals

- #### Frequent User Goals

[Top](#contents)

## Design  

### Colour Scheme
- The idea for this colour scheme was to choose a bright theme this time. There are also some additional colours, e.g. for shadows, borders and other indicators that are not in the main palette. 

![colour palette](assets/feature-img/colour-palette-light.png)

### Typography
- The fonts for this project are from google fonts.
  - The title font is "Alfa Slab One" serif

  ![Alfa Slab One](assets/feature-img/font-title.png)

  - The content font is "Lato" sans-serif

  ![Lato](assets/feature-img/font-text.png)

[Top](#contents)

### Wireframes 

#### Lofi Design

#### Home

- Desktop
  - Screensize 992px and larger

![Wireframe-Destop](assets/feature-img/wf-desktop-pp2.png)

- Tablet
  - Screensize 768px

![wire-tablet](assets/feature-img/wf-tablet-pp2.png)

- Mobile
 - Screensize 375px 

![wire-mobile](assets/feature-img/wf-mobile-pp2.png)

[Top](#contents)

## Features

### Header

![header](assets/feature-img/header-large.png)

### Footer

![footer](assets/feature-img/footer-large.png)

### Home

![home](assets/feature-img/home.png)

### Instructions

![instructions](assets/feature-img/instructions.png)

### Overlay Desktop

![overlay](assets/feature-img/overlay-large.png)

### Mobile

![overlay](assets/feature-img/mobile.png)

### Overlay Mobile

![overlay](assets/feature-img/mobile-overlay.png)

[Top](#contents)

---

### Existing Features

### Travel Time
  - Calculates your estimated traveling time by entering your speed and the desired distance.

![Travel Time](assets/feature-img/travel-time.png)

### Currency Calculator
  - Calculates your foreign currency for euros, pounds sterling and US dollars.

![Currency Calculator](assets/feature-img/currency-calc.png)

### Travel Cost
  - Calculates the cost of your journey by entering the distance, fuel consumption and fuel costs.

![Travel Cost](assets/feature-img/travel-cost.png)

### CO₂ Footprint
  - Calculates how big the ecological footprint of the journey will be. 

![CO₂ Footprint](assets/feature-img/co2-calc.png)

### Menu Icons
- The classic burger menu opens the modal with the navigation.

![Menu Icons](assets/feature-img/menu-icons.png)

### Reset Buttons
- The Reset button resets the input of the fields.

![Reset Buttons](assets/feature-img/reset-btn.png)



[Top](#contents)

### Accessibility

- I used alt="", aria-labels and semantic elements like as much as possible to make the site easy to navigate and understand by keyboard and/or screen reader users.

- The overlay menu closes by click, with ESC, or backspace key, all fields can be accessed using the tab key.

- The fields update themselves automatically as soon as the required parameters are entered. Therefore, an additional action such as pressing the enter key or clicking a calculate button is not necessary.

### Features Left to Implement

- API access for the currency calculator

- Google map integration for traffic forecast

- Weather app to forecast the conditions for your journey.

- Theme toggle that the user can switch between dark and light mode.


[Top](#contents)

## Testing

- ### [Link to testing.md](testing.md)


### Bug Fixes in the Production Process

#### Navigation

- M-Issue-01: The links to the individual calculators do not work in the mobile view. The blur effect shifts when clicking on the links.
- M-Issue-02: The links in the instruction section do not work in the mobile view.

![M-Issue-01](assets/feature-img/M-Issue-01.png)

  - Solution: The navigation for smaller screens was not functional.\
  For this reason, I separated the code for the navigation from the main code for the calculators and completely rewrote it.\
  I have documented this process separately [here]. 
  The visual solution for the user can be seen in the following image.

![M-Issue-01-solution](assets/feature-img/M-Issue-01-solution.png)

#### Script

- S-Issue-01: The input field allow to typed letter into any of the calculators.
- S-Issue-02: Minus numbers are possible to input into the calculators.

  - Solution: Add an alternative method for field validation in JavaScript, as the usual method is not possible due to the needed form input element type=‘text’.\
  This is the case because the function to replace the comma in the output field with a dot, relies on a type=‘text’ attribute instead of an input type=‘number’.

![S-Issue-01](assets/feature-img/s-issue-1~2-solution.png)

- S-Issue-04: Function to calculate travel cost is not working

![S-Issue-04](assets/feature-img/error-travel-cost.png)

  - Solution: Add correct syntax for function name in camelCase

![S-Issue-04-solution](assets/feature-img/error-travel-cost-solution.png)

### Bug Fixes through/after validation

- **Error-1** Duplicate attribute 

![Duplicate attribute](assets/feature-img/duplicate-attribute.png)

  - Solution: Move attribute "instructions-btn" inside existing class element and delete duplicated class element.

![Duplicate attribute](assets/feature-img/duplicate-attribute-solution.png)

- **Error-2+3** End tag section wrong indentation but there were open div element.

![End tag section](assets/feature-img/end-tag-section.png)

![End tag section](assets/feature-img/unclosed-element-div.png)

  - Solution: Add forgotten end tag of DIV element. Correct indentation for section element.

![forgotten end tag](assets/feature-img/end-tag-section-solution-0.png)

![Correct indentation](assets/feature-img/end-tag-section-solution-1.png)

- **Error-4~17** Element p not allowed as child of ul in this context.

![p not allowed as child](assets/feature-img/element-p-not-allowed-as-child-of-ul.png)

  - Solution: Change HTML Structure set div for ul and h5 for li elements see [Commit-File](https://github.com/Lorenz-127/THE-CONVERSIONATOR/commit/be44a4a6154b03abdf156646860f13987f858a76#diff-0eb547304658805aad788d320f10bf1f292797b5e6d745a3bf617584da017051L269-R325)

![set div and h5](assets/feature-img/error-4to17-solution-small.png)

### Bug Fixes caused through changes after validation

**Error-V1** Attribute step not allowed on element input

- This new error arose after the attempt to resolve the error S-Issue-1 + S-Issue-01.

![Attribute step not allowed](assets/feature-img/attribut-not-allowed.png)

  - Solution: Remove the attributes no longer required for input validation.

![Attribute step not allowed solution](assets/feature-img/attribute-not-allowed-solution.png)

[Top](#contents)

### Unfixed Bugs

#### Calculators

##### Travel Time


- S-Issue-03: Time in hours seems top be a little glitchy when adding a value, then converting from miles -> km -> miles. It says it takes 37 mins to go 1m at 1 mph

![S-Issue-03](assets/feature-img/S-Issue-03.png)

  - Solution:

## Technologies Used

**Github** - Used for storage of my site and for publishing online.\
**Gitpod** - The IDE used for editing my site and pushing changes.\
**Python** - Used python 3 via terminal to preview my site using a local http server.\
**HTML** - The core of the site was built with HTML version 5.\
**CSS** - CSS was used to style the website and define fonts and layout.\
**JavaScript** - JavaScript was used for the logic elements on the website.\
**Font Awesome** - icons are from Font Awesome.\
**Cloudflare** - I use Cloudflare as a library-host for the Font Awesome.\
**Google Chrome** - The website was tested in google Chrome dev tools.\
**Favicon Generator Website** - The favicon was made by favicon.io\


### Languages Used

- **HTML**
- **CSS**
- **JavaScript**

### Programs Used

- **Github**   - I GitHub for the storage of my site and Gitpages to publish my website.
- **Balsamiq** - Balsamiq was the choice for the wireframes.
- **MS-Paint** - MS-Paint for some of my image resizing.
- **VS-Code**  - VS-Code Desktop for various testing on a save playground.
- **Slack**    - Slack to communicate with my Mentor, Peers and get some help and infos.

[Top](#contents)

# Deployment and Local Development

## Deployment

The site is deployed using GitHub Pages - [THE-CONVERSIONATOR](https://lorenz-127.github.io/THE-CONVERSIONATOR/)

To Deploy the site using GitHub Pages by following these steps:

1. Login (or signup) to Github.
2. Go to the repository for this project, [lorenz-127/THE-CONVERSIONATOR](https://github.com/Lorenz-127/THE-CONVERSIONATOR).
3. Click the settings button.
4. Select pages in the left hand navigation menu.
5. From the source dropdown select main branch and press save.
6. The site has now been deployed, please note that this process may take a few minutes before the site goes live.

## Local Development

### How to Fork

To fork the repository:

1. Log in (or sign up) to Github.
2. Go to the repository for this project, [lorenz-127/THE-CONVERSIONATOR](https://github.com/Lorenz-127/THE-CONVERSIONATOR)
3. Click the Fork button in the top right corner.

### How to Clone

To clone the the repository:

1. Log into your account on github
2. Go to the repository of this project [lorenz-127/THE-CONVERSIONATOR](https://github.com/Lorenz-127/THE-CONVERSIONATOR)
3. Click on the code button, and copy your preferred clone link.
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
5. Type 'git clone' into the terminal, paste the link you copied in step 3 and press enter.

[Top](#contents)

# Credits

### Styles, Icons, Images

### JavaScript

- Some of the functions are adaptations of the various lessons taught by CI's own LMS.
- Most of my JavaScript questions was answered by [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- For harder coding questions, I used Co-Pilot as an assistant, which is provided by the CI GitHub Student Pack.

[Top](#contents)

### Content
- The text on the website is written entirely by me. However, I have used [deepl.com](https://www.deepl.com/translator) for some parts of the translation.
- The inspiration for the Modal Overlay Menu I got from [W3schools](https://www.w3schools.com/howto/howto_js_curtain_menu.asp)

### Acknowledgements

- My Peers in various Code Institute's Slack channels for their feedback and support.
- All the great videos that are periodically posted by slack-bot in the various channels (**You're a legend!**).
- Erik_4P_Lead for his advice and tips in early production process. [LinkedIn](https://www.linkedin.com/in/erikas-ramanauskas-full-stack-developer/) [GitHub](https://github.com/Erikas-Ramanauskas)
- Tomáš_Kubánčik_Alumni_lead For additional advice on solving JavaScript bugs. [LinkedIn](https://www.linkedin.com/in/tomas-kubancik/) [GitHub](https://github.com/tomik-z-cech)

### Honourable mentions

- I would like to thank my mentor Luke Buchanan, for great feedback and advice.

- Vernell for his valuable and patient advice and tips to find the right path for solution. [LinkedIn](https://www.linkedin.com/in/vernellclark/) [GitHub](https://github.com/VCGithubCode)

[Top](#contents)

