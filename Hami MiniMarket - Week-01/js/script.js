// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.onscroll = () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Simple Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
  } else {
    alert("Thank you for contacting us, " + name + "!");
    this.reset();
  }
});
