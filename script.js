
/* =========================================================
   VISION STUDIOS
   Main JavaScript
   ========================================================= */


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
