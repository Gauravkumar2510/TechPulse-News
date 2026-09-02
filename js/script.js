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
        document.querySelector("#newsletterEmail");


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


      /* Keep Formspree protection */

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
        "AI agents are moving beyond simple chat interfaces and becoming useful digital assistants for everyday work. Instead of only answering a question, an AI agent can understand a goal, break it into smaller steps and help complete those tasks. This can include researching information, organizing notes, preparing drafts, summarizing documents and handling repetitive workflows.\n\nFor students and developers, AI agents can save time on routine work and allow more attention to problem-solving and creativity. However, human review is still important because AI systems can make mistakes or produce incorrect information. The best approach is to use AI as a productivity tool while keeping people responsible for important decisions.\n\nAs these tools continue to improve, understanding how to use them effectively may become an important digital skill. The future of AI is not only about smarter chatbots, but also about practical systems that can help people complete real tasks."
    },


    "The web development stack is getting lighter": {

      category: "WEB",

      meta:
        "By Gaurav Kumar · Sep 1, 2026 · 4 min read",

      text:
        "Web development is becoming simpler as modern browsers continue to support more powerful features. Developers can now build many fast and interactive websites using a combination of HTML, CSS and JavaScript without depending on a large collection of libraries.\n\nA lightweight approach can improve website performance, reduce maintenance and make projects easier to understand. It can also be helpful for beginners because learning the fundamentals gives developers a strong foundation before they start using advanced frameworks.\n\nThis does not mean that frameworks are no longer useful. They remain valuable for large applications and complex projects. The important idea is to choose tools based on the actual requirements of a project instead of adding unnecessary complexity."
    },


    "Five habits that make your online accounts safer": {

      category: "SECURITY",

      meta:
        "By Gaurav Kumar · Aug 31, 2026 · 6 min read",

      text:
        "Online security often starts with a few simple habits. One of the most important steps is using strong and unique passwords for different accounts. If the same password is reused everywhere, one compromised account can potentially put other accounts at risk.\n\nMulti-factor authentication adds another layer of protection and should be enabled whenever it is available. Keeping your phone, computer and applications updated is also important because updates can include security fixes.\n\nUsers should also be careful with unexpected links, attachments and messages that ask for passwords, payment details or personal information. Regularly checking account recovery options and active sessions can help identify suspicious activity early.\n\nGood cybersecurity does not require complicated tools. Consistent everyday habits can significantly reduce common digital risks."
    },


    "What to look for in your next smart device": {

      category: "GADGETS",

      meta:
        "By Gaurav Kumar · Aug 29, 2026 · 4 min read",

      text:
        "Choosing a smart device should begin with understanding what you actually need from it. Specifications such as processor speed, camera resolution and display size are useful, but they are not the only things that matter.\n\nSoftware support, battery life, build quality, privacy features and compatibility with your existing devices can have a much bigger impact on the everyday experience. A device that receives regular software updates can also remain useful for longer.\n\nBefore buying a new gadget, it is worth comparing the complete experience instead of focusing on a single specification. Think about how often you will use the device, what problems it should solve and whether it fits into your existing technology setup.\n\nThe best gadget is usually not the one with the biggest numbers. It is the one that provides useful features and reliable performance for your actual needs."
    },


    "Why small AI models matter": {

      category: "AI",

      meta:
        "By Gaurav Kumar · Aug 28, 2026 · 7 min read",

      text:
        "The AI industry often focuses on increasingly large models, but smaller and more efficient models are becoming important as well. Smaller models can require less computing power and may be easier to run on local devices such as phones and laptops.\n\nLocal AI processing can provide faster responses and can reduce the need to send every request to a remote server. It can also be useful in situations where an internet connection is limited or where keeping information on the device is preferred.\n\nFor developers, efficient models can make experimentation more accessible because they may require fewer hardware resources. This opens the possibility of building AI-powered features for a wider range of applications.\n\nThe future of AI will likely include both extremely capable large models and smaller specialized models designed to perform specific tasks efficiently."
    },


    "Designing websites that feel great on mobile": {

      category: "WEB",

      meta:
        "By Gaurav Kumar · Aug 26, 2026 · 5 min read",

      text:
        "A good mobile website is more than a desktop website made smaller. People using phones need readable text, comfortable spacing, clear navigation and buttons that are easy to tap.\n\nResponsive design allows layouts to adapt to different screen sizes. Images should resize correctly, content should remain readable and navigation should work without unnecessary scrolling or zooming.\n\nPerformance is also important on mobile devices. Optimized images, clean CSS and efficient JavaScript can help pages load faster and feel smoother.\n\nThe best responsive websites are designed around the user experience first. Whether someone visits from a phone, tablet or computer, the goal should be a website that feels simple, fast and comfortable to use."
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


  /* =========================
     CLICKABLE ARTICLE CARDS
  ========================= */

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


  /* =========================
     CLOSE MODAL
  ========================= */

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


  /* =========================
     INITIAL FILTER
  ========================= */

  filterArticles();

});
