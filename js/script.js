document.addEventListener("DOMContentLoaded", () => {

  const toast = document.querySelector("#toast");

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }


  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#mainNav");

  menuToggle?.addEventListener("click", () => {

    const isOpen = mainNav?.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  mainNav?.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* =========================
     SEARCH + CATEGORY FILTER
  ========================= */

  const cards = Array.from(
    document.querySelectorAll(".news-card")
  );

  const filters = Array.from(
    document.querySelectorAll(".filter")
  );

  const searchInput =
    document.querySelector("#searchInput");

  const noResults =
    document.querySelector("#noResults");

  let activeCategory = "all";


  function filterArticles() {

    const searchTerm =
      searchInput?.value
        .trim()
        .toLowerCase() || "";

    let visibleCount = 0;


    cards.forEach(card => {

      const category =
        card.dataset.category || "";

      const title =
        card.dataset.title || "";

      const text =
        card.textContent || "";


      const categoryMatch =
        activeCategory === "all" ||
        category === activeCategory;


      const searchMatch =
        !searchTerm ||
        title.toLowerCase().includes(searchTerm) ||
        text.toLowerCase().includes(searchTerm);


      const shouldShow =
        categoryMatch && searchMatch;


      card.style.display =
        shouldShow ? "" : "none";


      if (shouldShow) {
        visibleCount++;
      }

    });


    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }

  }


  filters.forEach(button => {

    button.addEventListener("click", () => {

      filters.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      activeCategory =
        button.dataset.category || "all";

      filterArticles();

    });

  });


  searchInput?.addEventListener(
    "input",
    filterArticles
  );


  /* =========================
     CATEGORY FROM URL
     Example:
     index.html?category=AI
  ========================= */

  const params =
    new URLSearchParams(window.location.search);

  const urlCategory =
    params.get("category");


  if (urlCategory) {

    const matchingFilter =
      filters.find(
        button =>
          button.dataset.category?.toLowerCase() ===
          urlCategory.toLowerCase()
      );


    if (matchingFilter) {

      filters.forEach(item => {
        item.classList.remove("active");
      });

      matchingFilter.classList.add("active");

      activeCategory =
        matchingFilter.dataset.category;

      filterArticles();

    }

  }


  /* =========================
     NEWSLETTER
  ========================= */

  const newsletterForm =
    document.querySelector("#newsletterForm");

  newsletterForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const email =
        document.querySelector(
          "#newsletterEmail"
        );


      if (!email?.checkValidity()) {

        showToast(
          "Please enter a valid email address."
        );

        email?.focus();

        return;
      }


      showToast(
        "Thanks for subscribing to TechPulse!"
      );

      newsletterForm.reset();

    }
  );


  /* =========================
     CONTACT FORM
  ========================= */

  const contactForm =
    document.querySelector("#contactForm");


  contactForm?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const fields =
        Array.from(
          contactForm.querySelectorAll(
            "input, textarea"
          )
        );


      let valid = true;


      fields.forEach(field => {

        field.classList.remove("error");


        if (
          !field.checkValidity() ||
          (
            field.type === "text" &&
            !field.value.trim()
          )
        ) {

          field.classList.add("error");

          valid = false;

        }

      });


      if (!valid) {

        showToast(
          "Please complete all fields correctly."
        );

        fields
          .find(
            field =>
              field.classList.contains("error")
          )
          ?.focus();

        return;

      }


      if (
        contactForm.action.includes(
          "YOUR_FORM_ID"
        )
      ) {

        showToast(
          "Please connect your Formspree form first."
        );

        return;

      }


      const submitButton =
        contactForm.querySelector(
          'button[type="submit"]'
        );


      const oldText =
        submitButton?.textContent;


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Sending...";

      }


      try {

        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",

              body:
                new FormData(contactForm),

              headers: {
                "Accept":
                  "application/json"
              }
            }
          );


        if (!response.ok) {
          throw new Error(
            "Submission failed"
          );
        }


        showToast(
          "Message sent successfully!"
        );

        contactForm.reset();


      } catch (error) {

        showToast(
          "Couldn't send the message. Please try again."
        );


      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            oldText;

        }

      }

    }
  );


  /* =========================
     ARTICLE DATA
  ========================= */

  const articleDetails = {

    "How AI agents are changing everyday work": {

      category: "AI",

      meta:
        "By Gaurav Kumar · Sep 2, 2026 · 5 min read",

      text:
        "AI agents are moving beyond simple chat interfaces. Modern AI systems can help organize research, draft content, summarize information, manage repetitive tasks and support everyday workflows. The important change is that AI is becoming more action-oriented. Instead of only answering questions, an AI agent can help complete a sequence of tasks. For students and developers, this can make research and productivity faster. The goal is not to replace every person or every job, but to provide useful digital assistance for repetitive work."
    },


    "The web development stack is getting lighter": {

      category: "WEB",

      meta:
        "By Gaurav Kumar · Sep 1, 2026 · 4 min read",

      text:
        "Web development continues to become simpler. Modern browsers can handle many features that previously required large libraries or complicated tools. Developers are increasingly focusing on clean HTML, modern CSS, JavaScript and lightweight workflows. A simpler stack can improve performance, reduce maintenance and make projects easier to understand. For beginners, this is especially useful because learning the fundamentals remains more valuable than depending on a large number of tools."
    },


    "Five habits that make your online accounts safer": {

      category: "SECURITY",

      meta:
        "By Gaurav Kumar · Aug 31, 2026 · 6 min read",

      text:
        "Online security starts with small everyday habits. Use strong and unique passwords for important accounts and enable multi-factor authentication whenever it is available. Keep your phone, computer and applications updated. Be careful with unexpected links and messages, especially when they request passwords or personal information. It is also useful to review account recovery options and active sessions from time to time. These simple practices can significantly reduce common digital security risks."
    },


    "What to look for in your next smart device": {

      category: "GADGETS",

      meta:
        "By Gaurav Kumar · Aug 29, 2026 · 4 min read",

      text:
        "Choosing a smart device should start with the problem you want it to solve. Instead of focusing only on processor numbers, camera specifications or display size, consider software support, battery life, privacy, reliability and compatibility with your existing devices. A useful gadget should make everyday tasks easier and continue to receive support for a reasonable period. Looking at the complete experience can help you make a better purchase decision."
    },


    "Why small AI models matter": {

      category: "AI",

      meta:
        "By Gaurav Kumar · Aug 28, 2026 · 7 min read",

      text:
        "Smaller AI models are becoming increasingly useful because they can require fewer computing resources. Efficient models can run closer to the devices where applications are used, including phones and laptops. Local processing can improve response time and reduce the need to send every request to a remote server. For developers, smaller models can also make experimentation more affordable. The future of AI is therefore not only about larger models, but also about efficient models that can perform specific tasks well."
    },


    "Designing websites that feel great on mobile": {

      category: "WEB",

      meta:
        "By Gaurav Kumar · Aug 26, 2026 · 5 min read",

      text:
        "A good mobile website is designed around the needs of people using a small screen. Text should be readable, buttons should be easy to tap and navigation should remain simple. Images and layouts should adapt to different screen sizes without making users zoom or scroll unnecessarily. Responsive design is therefore more than shrinking a desktop layout. It is about creating a comfortable experience across phones, tablets and computers."
    }

  };


  /* =========================
     ARTICLE MODAL
  ========================= */

  const modal =
    document.querySelector("#articleModal");

  const modalClose =
    document.querySelector("#modalClose");

  const modalTitle =
    document.querySelector("#modalTitle");

  const modalCategory =
    document.querySelector("#modalCategory");

  const modalMeta =
    document.querySelector("#modalMeta");

  const modalText =
    document.querySelector("#modalText");


  function openArticle(card) {

    const title =
      card.dataset.title;


    const details =
      articleDetails[title];


    if (!details || !modal) {
      return;
    }


    modalTitle.textContent =
      title;


    modalCategory.textContent =
      details.category;


    modalMeta.textContent =
      details.meta;


    modalText.textContent =
      details.text;


    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "modal-open"
    );


    modalClose?.focus();

  }


  function closeArticle() {

    if (!modal) {
      return;
    }


    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "modal-open"
    );

  }


  /* Make article cards clickable */

  cards.forEach(card => {

    card.setAttribute(
      "tabindex",
      "0"
    );


    card.setAttribute(
      "role",
      "button"
    );


    card.addEventListener(
      "click",
      () => openArticle(card)
    );


    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openArticle(card);

        }

      }
    );

  });


  modalClose?.addEventListener(
    "click",
    closeArticle
  );


  modal
    ?.querySelector(
      "[data-close-modal]"
    )
    ?.addEventListener(
      "click",
      closeArticle
    );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeArticle();

      }

    }
  );


  /* Initial filter */

  filterArticles();

});
