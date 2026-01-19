document.addEventListener("DOMContentLoaded", function () {
  // --- 1. AVAILABILITY SECTION ---
  const jsonUrl =
    "https://raw.githubusercontent.com/liewsin/lessonboard/refs/heads/main/data/availability.json";

  async function loadSchedule() {
    try {
      const response = await fetch(jsonUrl);
      const data = await response.json();
      const container = document.getElementById("schedule-container");

      if (container) {
        container.innerHTML = "";
        data.schedule.forEach((item) => {
          const row = document.createElement("div");
          row.className = "schedule-row";
          row.innerHTML = `<strong>${item.day}:</strong> ${item.slots.join(", ")}`;
          container.appendChild(row);
        });
      }
    } catch (error) {
      console.error("Error loading schedule:", error);
      const container = document.getElementById("schedule-container");
      if (container) {
        container.innerText =
          "Could not load schedule. Please contact us via WhatsApp.";
      }
    }
  }

  loadSchedule(); // Run the schedule loader

  // --- 2. CONTACT FORM VALIDATION ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const feedback = document.getElementById("formFeedback");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name === "" || email === "" || phone === "") {
        e.preventDefault();
        feedback.innerText = "Please fill in all required fields.";
        feedback.style.color = "red";
      } else if (!emailPattern.test(email)) {
        e.preventDefault();
        feedback.innerText = "Please enter a valid email address.";
        feedback.style.color = "red";
      }
    });
  }
});
