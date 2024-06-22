document.addEventListener("DOMContentLoaded", function () {

    const fadeInElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('fade-in');
            }

        });

    });

    fadeInElements.forEach(element => {

        observer.observe(element);

    });

});


