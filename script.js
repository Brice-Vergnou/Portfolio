// Select sections and navigation links
const sections = document.querySelectorAll(".section");
const navbarLinks = document.querySelectorAll("#navbar a");

let currentSection = 0; // Active section

// Function to scroll to the next or previous section
function scrollToSection(direction) {
    // Calculate the new section based on the direction
    if (direction === 'down' && currentSection < sections.length - 1) {
        currentSection++;
    } else if (direction === 'up' && currentSection > 0) {
        currentSection--;
    }
    // Scroll to the new section
    sections[currentSection].scrollIntoView({ behavior: "smooth" });
    activateNavbarLink();
}

// Detect mouse scroll to change section
window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        scrollToSection('down');
    } else {
        scrollToSection('up');
    }
});

// Activate the corresponding navbar link
function activateNavbarLink() {
    navbarLinks.forEach((link, index) => {
        link.classList.toggle("active", index === currentSection);
    });
}

// Add a visible class to each section as it appears
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            activateNavbarLink();
        }
    });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

// Navigation through the fixed menu
navbarLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        currentSection = index;
        sections[currentSection].scrollIntoView({ behavior: "smooth" });
        activateNavbarLink();
    });
});
