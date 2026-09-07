document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const backToTop = document.getElementById("backToTop");


    // =========================
    // Mobile Menu
    // =========================

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });


    // =========================
    // Smooth Scrolling
    // =========================

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Close mobile menu
                navLinks.classList.remove("active");
            }
        });

    });


    // =========================
    // Active Navigation Link
    // =========================

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        links.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });
    


    // =========================
    // Back to Top Button
    // =========================

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    // =========================
    // Back to Top Click
    // =========================

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =========================
    // Navbar Shadow on Scroll
    // =========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

});