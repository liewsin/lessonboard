document.getElementById("contactForm").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const feedback = document.getElementById("formFeedback");

  // Basic Email Regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || phone === "") {
    e.preventDefault(); // Stop form from sending
    feedback.innerText = "Please fill in all required fields.";
    feedback.style.color = "red";
  } else if (!emailPattern.test(email)) {
    e.preventDefault();
    feedback.innerText = "Please enter a valid email address.";
    feedback.style.color = "red";
  }
});

// Replace this URL with the "Raw" link from your GitHub repository
const jsonUrl =
  "https://raw.githubusercontent.com/liewsin/lessonboard/refs/heads/main/data/availability.json";

async function loadSchedule() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    const container = document.getElementById("schedule-container");

    // Clear existing content
    container.innerHTML = "";

    // Create the 7 rows (Sun-Sat)
    data.schedule.forEach((item) => {
      const row = document.createElement("div");
      row.className = "schedule-row";

      // Format: "Day: Time1, Time2"
      row.innerHTML = `<strong>${item.day}:</strong> ${item.slots.join(", ")}`;

      container.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading schedule:", error);
    document.getElementById("schedule-container").innerText =
      "Could not load schedule. Please contact us via WhatsApp.";
  }
}

// Run the function when the page loads
loadSchedule();
