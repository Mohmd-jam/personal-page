document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch("Back/back.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.className = "success";
                    form.reset();
                } else {
                    formStatus.textContent = data.message || "An error occurred. Please try again.";
                    formStatus.className = "error";
                }
            })
            .catch(error => {
                formStatus.textContent = "An error occurred. Please try again.";
                formStatus.className = "error";
            });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight navigation links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
