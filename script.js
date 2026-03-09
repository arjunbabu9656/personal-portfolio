document.addEventListener("DOMContentLoaded", () => {
    // 1. Typewriter Logic
    const words = ["Web Developer", "Full-Stack Developer", "Frontend Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 1000;
    const target = document.getElementById("typewriter");

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            target.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            speed = pauseTime; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500; 
        }

        setTimeout(type, speed);
    }

    type();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

// Wait until the entire HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1️⃣ SELECT IMPORTANT ELEMENTS FROM HTML
  ========================================================== */

  // Select the grid that contains all project cards
  const grid = document.querySelector(".projects_grid");

  // Select all filter buttons (All, Clone, Ecommerce, Dynamic)
  const buttons = document.querySelectorAll(".filter_btn");

  // Select all project cards
  const cards = document.querySelectorAll(".project_card");


  /* =========================================================
     2️⃣ DEFAULT STATE WHEN PAGE LOADS
     - Hide all "coming soon" cards
     - Prevent flashing of all categories
  ========================================================== */

  cards.forEach(card => {

    // Check if this card has data-coming="true"
    if (card.dataset.coming === "true") {

      // Add class "hide" (CSS makes it display: none)
      card.classList.add("hide");
    }

  });

  // After setup is done, show the grid
  // (This prevents flash of unwanted cards)
  grid.classList.add("ready");



  /* =========================================================
     3️⃣ FILTER BUTTON SYSTEM
     - Show cards based on selected category
  ========================================================== */

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      // Remove active style from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Add active style to clicked button
      button.classList.add("active");

      // Get category name from clicked button
      const filterValue = button.dataset.filter;

      // Loop through all cards
      cards.forEach(card => {

        const cardCategory = card.dataset.category;
        const isComing = card.dataset.coming === "true";

        // If user selects "All"
        if (filterValue === "all") {

          // Show only real projects
          if (!isComing) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }

        }
        // If user selects specific category
        else {

          // Show only matching category
          if (cardCategory === filterValue) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }

        }

      });

    });

  });



  /* =========================================================
     4️⃣ SCROLL REVEAL ANIMATION
     - When element enters screen → add "show" class
  ========================================================== */

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      // If element is visible on screen
      if (entry.isIntersecting) {

        // Add class "show" (CSS animation runs)
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.15 // Trigger when 15% visible
  });

  // Apply observer to all elements with class "reveal"
  document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
  });



  /* =========================================================
     5️⃣ MODAL (PORTAL) SYSTEM
     - When clicking project card → open popup
     - Load multiple images dynamically
  ========================================================== */

  const modal = document.querySelector(".project_modal");
  const modalBody = document.querySelector(".modal_body");
  const closeButton = document.querySelector(".modal_close");
  const overlay = document.querySelector(".modal_overlay");


  // Loop through all project cards
  cards.forEach(card => {

    // Skip "coming soon" cards
    if (card.dataset.coming === "true") return;

    // When user clicks a card
    card.addEventListener("click", () => {

      // Get data from card attributes
      const title = card.dataset.title;
      const description = card.dataset.description;

      // Convert image string into array
      const imageList = card.dataset.images.split(",");

      // Create image gallery HTML
      const galleryHTML = imageList.map(image => {
        return `<img src="${image.trim()}" alt="">`;
      }).join("");

      // Insert content inside modal
      modalBody.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="modal_gallery">
          ${galleryHTML}
        </div>
      `;

      // Show modal
      modal.classList.add("active");

      // Stop background scrolling
      document.body.style.overflow = "hidden";
    });

  });



  /* =========================================================
     6️⃣ CLOSE MODAL FUNCTION
  ========================================================== */

  function closeModal() {

    // Hide modal
    modal.classList.remove("active");

    // Enable page scrolling again
    document.body.style.overflow = "auto";
  }

  // Close when clicking X button
  closeButton.addEventListener("click", closeModal);

  // Close when clicking dark overlay
  overlay.addEventListener("click", closeModal);

});
//==========================================================================================================//
/* ======================================
   SCROLL REVEAL FOR CAREER SECTION
====================================== */

const careerSection = document.querySelector(".career_statement_section");
const highlightItems = document.querySelectorAll(".highlight_item");

const careerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            // Show main section
            entry.target.classList.add("show");

            // Stagger animation for highlight items
            highlightItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("show");
                }, index * 150);
            });

        }

    });
}, { threshold: 0.2 });

if (careerSection) {
    careerObserver.observe(careerSection);
}
document.addEventListener("DOMContentLoaded", () => {

  const skillCards = document.querySelectorAll(".reveal_skill");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){

        entry.target.classList.add("show");

        // Animate progress bar
        const progress = entry.target.querySelector(".skill_progress");
        const percent = entry.target.querySelector(".skill_percent");

        if(progress && !progress.dataset.done){
          progress.dataset.done = "true";

          const value = progress.dataset.progress;
          progress.style.width = value + "%";

          // Counter animation
          let count = 0;
          const target = parseInt(percent.dataset.count);
          const interval = setInterval(()=>{
            count++;
            percent.innerText = count + "%";
            if(count >= target){
              clearInterval(interval);
            }
          }, 15);
        }

      }
    });
  },{threshold:0.3});

  skillCards.forEach(card=>{
    observer.observe(card);
  });

});
document.addEventListener("DOMContentLoaded", () => {

  /* Scroll reveal */
  const contactEls = document.querySelectorAll(".reveal_contact");
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  },{threshold:0.2});

  contactEls.forEach(el=>obs.observe(el));

  /* Simple UX validation + loader */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if(!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, msg){
    const err = field.parentElement.querySelector(".err");
    if(err) err.textContent = msg;
    field.style.borderColor = msg ? "rgba(255,107,107,.9)" : "rgba(255,255,255,.12)";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector(".send_btn");
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const subject = form.querySelector("#subject");
    const message = form.querySelector("#message");

    let ok = true;

    // Name
    if(name.value.trim().length < 2){
      setError(name, "Please enter your name.");
      ok = false;
    } else setError(name, "");

    // Email
    if(!emailPattern.test(email.value.trim())){
      setError(email, "Please enter a valid email.");
      ok = false;
    } else setError(email, "");

    // Subject
    if(subject.value.trim().length < 3){
      setError(subject, "Please enter a subject.");
      ok = false;
    } else setError(subject, "");

    // Message
    if(message.value.trim().length < 10){
      setError(message, "Message should be at least 10 characters.");
      ok = false;
    } else setError(message, "");

    if(!ok){
      note.textContent = "Please fix the highlighted fields.";
      return;
    }

    // Fake loading animation (connect EmailJS / Formspree later)
    btn.classList.add("loading");
    note.textContent = "Sending message...";

    setTimeout(()=>{
      btn.classList.remove("loading");
      note.textContent = "Message ready ✅ (Connect EmailJS / Formspree to send it live).";
      form.reset();
      [name,email,subject,message].forEach(f=>setError(f,""));
    }, 1200);
  });

});