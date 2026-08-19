/* =========================================================
   VISION STUDIOS
   Main JavaScript
   ========================================================= */

/*For alerting about Nav-bar due to wrong size*/
alert("You can zoom out for easier navigation");
alert("Currencies can be changed from ₹ to $,€, and £ in navigation bar")
/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  // Close mobile menu after clicking a navigation link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });
}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  // Fallback for very old browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  window.addEventListener("pointermove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });

  function animateCursorGlow() {

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursorGlow);
  }

  animateCursorGlow();
}


/* =========================================================
   WEBSITE COST CALCULATOR
   ========================================================= */

const calculator = {

  type: "landing",

  basePrices: {
    landing: 10000,
    small: 15000,
    business: 20000,
    custom: 35000
  }

};


/* Calculator elements */

const typeButtons =
  document.querySelectorAll(".choice");

const pageRange =
  document.querySelector("#pages");

const pageValue =
  document.querySelector("#pagesValue");

const estimate =
  document.querySelector("#estimate");

const estimateBar =
  document.querySelector("#estimateBar");

const featureInputs =
  document.querySelectorAll(
    ".feature-choices input"
  );


/* Calculate total price */

function calculateEstimate() {

  if (!pageRange || !estimate) {
    return;
  }

  let total =
    calculator.basePrices[calculator.type] || 10000;

  const pages =
    Number(pageRange.value);


  /* -----------------------------------------
     Additional page pricing
     ----------------------------------------- */

  switch (calculator.type) {

    case "landing":

      total +=
        Math.max(0, pages - 1) * 1200;

      break;


    case "small":

      total +=
        Math.max(0, pages - 3) * 1500;

      break;


    case "business":

      total +=
        Math.max(0, pages - 5) * 2000;

      break;


    case "custom":

      total +=
        Math.max(0, pages - 5) * 3500;

      break;

  }


  /* -----------------------------------------
     Feature pricing
     ----------------------------------------- */

  featureInputs.forEach((input) => {

    if (input.checked) {

      const featurePrice =
        Number(input.dataset.price || 0);

      total += featurePrice;

    }

  });


  /* Round to nearest ₹100 */

  total =
    Math.round(total / 100) * 100;


  /* Display price */

  estimate.textContent =
    `₹${total.toLocaleString("en-IN")}`;


  /* Display page count */

  if (pageValue) {

    pageValue.textContent =
      `${pages} ${pages === 1 ? "page" : "pages"}`;

  }


  /* -----------------------------------------
     Price progress bar
     ----------------------------------------- */

  if (estimateBar) {

    const maximumVisualPrice = 30000;

    const percentage =
      Math.min(
        100,
        Math.max(
          12,
          (total / maximumVisualPrice) * 100
        )
      );

    estimateBar.style.width =
      `${percentage}%`;

  }

}


/* -----------------------------------------
   Website type buttons
   ----------------------------------------- */

typeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    typeButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    calculator.type =
      button.dataset.value;

    calculateEstimate();

  });

});


/* -----------------------------------------
   Page range
   ----------------------------------------- */

if (pageRange) {

  pageRange.addEventListener(
    "input",
    calculateEstimate
  );

}


/* -----------------------------------------
   Feature checkboxes
   ----------------------------------------- */

featureInputs.forEach((input) => {

  input.addEventListener(
    "change",
    calculateEstimate
  );

});


/* Initial calculator calculation */

calculateEstimate();


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqItems =
  document.querySelectorAll(
    ".faq-list details"
  );

faqItems.forEach((item) => {

  item.addEventListener("toggle", () => {

    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.removeAttribute("open");

      }

    });

  });

});


/* =========================================================
   CONTACT FORM
   ========================================================= */

/*const contactForm =
  document.querySelector("#contactForm");

const formStatus =
  document.querySelector("#formStatus");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();*/


      /* HTML5 validation */

      /*if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;

      }


      const formData =
        new FormData(contactForm);


      const name =
        String(
          formData.get("name") || ""
        ).trim();


      const email =
        String(
          formData.get("email") || ""
        ).trim();


      const description =
        String(
          formData.get("description") || ""
        ).trim();


      if (!name || !email || !description) {

        if (formStatus) {

          formStatus.textContent =
            "Please complete the required fields.";

        }

        return;

      }*/


      /*
        IMPORTANT:

        This frontend form does NOT pretend
        to send an email.

        A real backend/form service must
        be connected before production.
      */


      /*if (formStatus) {

        formStatus.textContent =
          "Request prepared successfully. Connect this form to your email or backend service before production.";

      }

    }
  );

}*/


/* =========================================================
   ACTIVE NAVIGATION STATE
   ========================================================= */

const pageSections =
  document.querySelectorAll(
    "main section[id]"
  );

const navigationLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


if (
  pageSections.length &&
  navigationLinks.length &&
  "IntersectionObserver" in window
) {

  const activeSectionObserver =
    new IntersectionObserver(
      (entries) => {

        const visibleSections =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );


        if (!visibleSections.length) {
          return;
        }


        const currentSection =
          visibleSections[0].target;


        navigationLinks.forEach((link) => {

          const target =
            link.getAttribute("href");


          if (
            target ===
            `#${currentSection.id}`
          ) {

            link.classList.add("active");

          } else {

            link.classList.remove("active");

          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold: [
          0,
          0.2,
          0.5
        ]
      }
    );


  pageSections.forEach((section) => {

    activeSectionObserver.observe(section);

  });

}


/* =========================================================
   SMOOTH SCROLL FALLBACK
   ========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        const navigationHeight =
          document.querySelector(".nav")
            ?.offsetHeight || 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          navigationHeight -
          20;


        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      }
    );

  });


/* =========================================================
   BUTTON MICRO-INTERACTION
   ========================================================= */

const buttons =
  document.querySelectorAll(
    ".button, .nav-cta"
  );


buttons.forEach((button) => {

  button.addEventListener(
    "pointerdown",
    () => {

      button.style.transform =
        "translateY(1px)";

    }
  );


  button.addEventListener(
    "pointerup",
    () => {

      button.style.transform =
        "";

    }
  );


  button.addEventListener(
    "pointerleave",
    () => {

      button.style.transform =
        "";

    }
  );

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElements =
  document.querySelectorAll(
    "[data-current-year]"
  );


yearElements.forEach((element) => {

  element.textContent =
    new Date().getFullYear();

});


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);
/* =========================================================
    CURRENCY EXCHANGE ENGINE
   ========================================================= */
const currencySymbols = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

async function updateAllSitePrices() {
  const selectedCurrency = document.getElementById('currency-select').value;
  const symbol = currencySymbols[selectedCurrency] || '$';

  // 1. Target ALL price tags on the page
  const priceElements = document.querySelectorAll('.price-tag');

  priceElements.forEach(el => {
    // Check if custom regional price exists (e.g. data-usd="250")
    const customPrice = el.getAttribute(`data-${selectedCurrency.toLowerCase()}`);

    if (customPrice) {
      // Use exact business price set in HTML
      const formatted = parseInt(customPrice).toLocaleString();
      const hasPlus = el.innerHTML.includes('+');
      el.innerHTML = `${symbol}${formatted}${hasPlus ? '<span>+</span>' : ''}`;
    }
  });

  // 2. Also update the Estimator
  updateEstimatorPrice();
}
// Global function to calculate and update the estimator output
function updateEstimatorPrice() {
  const selectedCurrency = document.getElementById('currency-select').value;
  const symbol = currencySymbols[selectedCurrency] || '$';
  
  // 1. Calculate your base estimator total in INR (Replace with your slider/checkbox logic)
  let baseEstimateINR = 9000; // Example base starting price

  // Multiply based on selected estimator options (e.g., page count, features)
  const pagesInput = document.getElementById('pages-slider'); // example input
  if (pagesInput) {
    baseEstimateINR += parseInt(pagesInput.value) * 1500;
  }

  // 2. Define custom estimated starting rates per currency
  const estimatorMultipliers = {
    INR: 1,
    USD: 0.015, // Custom multiplier so 9,000 INR = ~$135 -> $150
    EUR: 0.014,
    GBP: 0.012
  };

  const multiplier = estimatorMultipliers[selectedCurrency] || 1;
  let finalEstimate = Math.round(baseEstimateINR * multiplier);

  // Round output to clean numbers (e.g., nearest 10)
  if (selectedCurrency !== 'INR') {
    finalEstimate = Math.ceil(finalEstimate / 10) * 10;
  }

  // 3. Render output element (e.g. <strong>₹9,000</strong>)
  const estimatorOutput = document.querySelector('#calculator output, .estimator-total');
  if (estimatorOutput) {
    estimatorOutput.innerText = `${symbol}${finalEstimate.toLocaleString()}`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const currencyDropdown = document.getElementById('currency-select');

  if (currencyDropdown) {
    // Update everything whenever dropdown value changes
    currencyDropdown.addEventListener('change', updateAllSitePrices);
  }

  // Initial calculation on page load
  updateAllSitePrices();
});
// --- CALCULATOR CONFIGURATION ---

// Base price in INR for each website type
const websiteTypePrices = {
  landing: 10000,
  small: 15000,
  business: 20000,
  custom: 25000
};

// Conversion config for currency dropdown
const calculatorCurrencies = {
  INR: { symbol: '₹', rate: 1, roundTo: 100 },
  USD: { symbol: '$', rate: 0.0125, roundTo: 5 }, // e.g. ₹10,000 -> $125
  EUR: { symbol: '€', rate: 0.0115, roundTo: 5 },
  GBP: { symbol: '£', rate: 0.0098, roundTo: 5 }
};

function updateCalculator() {
  // 1. Get Base Price from Active Website Type
  const activeTypeBtn = document.querySelector('.choice-grid .choice.active');
  const typeValue = activeTypeBtn ? activeTypeBtn.getAttribute('data-value') : 'small';
  let totalINR = websiteTypePrices[typeValue] || 9000;

  // 2. Handle Pages Slider & Label
  const pagesInput = document.getElementById('pages');
  const pagesOutput = document.getElementById('pagesValue');
  const pageCount = pagesInput ? parseInt(pagesInput.value, 10) : 3;

  if (pagesOutput) {
    pagesOutput.innerText = `${pageCount} page${pageCount > 1 ? 's' : ''}`;
  }

  // Calculate extra cost per page beyond 1 (₹1,000 per extra page)
  const extraPages = Math.max(0, pageCount - 1);
  totalINR += extraPages * 1000;

  // 3. Sum Selected Feature Checkboxes
  const selectedFeatures = document.querySelectorAll('.feature-choices input[type="checkbox"]:checked');
  selectedFeatures.forEach(checkbox => {
    const featurePrice = parseFloat(checkbox.getAttribute('data-price')) || 0;
    totalINR += featurePrice;
  });

  // 4. Convert Total to Selected Currency
  const currencySelect = document.getElementById('currency-select');
  const selectedCurrency = currencySelect ? currencySelect.value : 'INR';
  const config = calculatorCurrencies[selectedCurrency] || calculatorCurrencies['INR'];

  let convertedTotal = totalINR * config.rate;

  if (config.roundTo > 1) {
    convertedTotal = Math.ceil(convertedTotal / config.roundTo) * config.roundTo;
  } else {
    convertedTotal = Math.round(convertedTotal);
  }

  // 5. Update HTML Output
  const estimateEl = document.getElementById('estimate');
  if (estimateEl) {
    estimateEl.innerText = `${config.symbol}${convertedTotal.toLocaleString()}`;
  }

  // 6. Update Visual Progress Bar (based on a max threshold of ₹50,000)
  const estimateBar = document.getElementById('estimateBar');
  if (estimateBar) {
    const maxThreshold = 50000;
    const fillPercent = Math.min(100, Math.round((totalINR / maxThreshold) * 100));
    estimateBar.style.width = `${fillPercent}%`;
  }
}

// --- ATTACH EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
  // 1. Handle Website Type Button Clicks
  const choiceButtons = document.querySelectorAll('.choice-grid .choice');
  choiceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all buttons in grid
      choiceButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');

      // Auto-set slider to typical page count based on selection
      const pagesInput = document.getElementById('pages');
      const selectedType = button.getAttribute('data-value');
    
      updateCalculator();
    });
  });

  // 2. Handle Page Range Slider Inputs
  const pagesSlider = document.getElementById('pages');
  if (pagesSlider) {
    pagesSlider.addEventListener('input', updateCalculator);
    pagesSlider.addEventListener('change', updateCalculator);
  }

  // 3. Handle Feature Checkbox Toggles
  const featureCheckboxes = document.querySelectorAll('.feature-choices input[type="checkbox"]');
  featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCalculator);
  });

  // 4. Listen to Currency Selector Dropdown
  const currencyDropdown = document.getElementById('currency-select');
  if (currencyDropdown) {
    currencyDropdown.addEventListener('change', updateCalculator);
  }

  // Initial Calculation on Page Load
  updateCalculator();
});
