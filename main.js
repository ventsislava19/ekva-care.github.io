// Menu button
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {

    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }

    // console.log(visibility);
    console.log(navToggle.getAttribute('aria-expanded'));

    }
)

document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            item.classList.toggle("active"); // Toggle active state
        });
    });
});

// Thank you - contact form




// Cal:
document.addEventListener("DOMContentLoaded", function () {
    let selectedDate = null;
    let selectedTime = null;

    // Initialize FullCalendar
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let calendarEl = document.getElementById("calendar");
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        selectable: true,
        validRange: { start: todayStr },   // <-- disallow past days
        dateClick: function (info) {
        selectedDate = info.dateStr;
        document.getElementById("time-slot-container").style.display = "block";
        generateTimeSlots(selectedDate);
        document.getElementById("book-now").style.display = "none";
        },
    });
    calendar.render();

    // Function to generate available time slots
    function generateTimeSlots(date) {
        const timeSlotsContainer = document.getElementById("time-slots");
        timeSlotsContainer.innerHTML = ""; // Clear previous slots

        const availableTimes = [
            // "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
            // "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
            "10:00 AM", "11:30 AM", "13:00 AM", "14:30 PM",
            "16:00 PM", "17:30 PM"
        ];

        availableTimes.forEach(time => {
            let button = document.createElement("button");
            button.textContent = time;
            button.classList.add("time-slot");

            button.addEventListener("click", function() {
                document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
                button.classList.add("selected");
                selectedTime = time;

                // Show "Book Now" button when time is selected
                document.getElementById("book-now").style.display = "block";
            });

            timeSlotsContainer.appendChild(button);
        });

        // Hide "Book Now" button until a time is selected
        document.getElementById("book-now").style.display = "none";
    }

    // Handle booking confirmation
    document.getElementById("book-now").addEventListener("click", function() {
        if (selectedDate && selectedTime) {
            alert(`Your appointment is booked for ${selectedDate} at ${selectedTime}`);
        }
    });
});

// For the nav bar on mobile to make is disapp when click outside

function closeNav() {
  nav.setAttribute('data-visible', 'false');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

document.addEventListener('click', (e) => {
  const isClickInside = nav.contains(e.target) || navToggle.contains(e.target);
  const isNavOpen = nav.getAttribute('data-visible') === 'true';

  if (!isClickInside && isNavOpen) {
    closeNav();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.getAttribute('data-visible') === 'true') {
    closeNav();
  }
});

