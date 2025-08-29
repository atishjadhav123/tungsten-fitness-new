/**
* Template Name: NiceSchool
* Template URL: https://bootstrapmade.com/nice-school-bootstrap-education-template/
* Updated: May 10 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();

/**
 * Contact form send email
 */

function closeForm() {
  document.getElementById("contactForm").style.display = "none"
}
function openForm() {
  document.getElementById("contactForm").style.display = "block"
  window.scrollTo(0, document.getElementById("contactForm").offsetTop)
}
function showSuccessMessage(event) {
  event.preventDefault()

  const form = event.target

  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  })
    .then(response => {
      if (response.ok) {
        form.style.display = "none"
        document.getElementById("successMessage").style.display = "block"
      } else {
        alert("There was an error. Please try again.")
      }
    })
    .catch(() => alert("Something went wrong."))

  return false
}


function showSuccessMessage(event) {
  event.preventDefault();

  const form = event.target;
  const successDiv = document.getElementById('successMessage');

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      successDiv.classList.remove('d-none');
      form.reset();
      setTimeout(() => {
        successDiv.classList.add('d-none');
        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
      }, 3000);
    }
  });

  return false;
}




document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.video-carousel .card');
  document.getElementById('totalSlides').textContent = slides.length;
});

function scrollCarousel(direction) {
  const carousel = document.getElementById("videoCarousel");
  const scrollAmount = carousel.offsetWidth * 0.8;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });

  // Update slide counter
  const currentPosition = carousel.scrollLeft;
  const slideWidth = carousel.firstElementChild.offsetWidth + 16; // width + gap
  const currentSlide = Math.round(currentPosition / slideWidth) + 1;
  document.getElementById('currentSlide').textContent = currentSlide;
}

function openVideoModal(videoUrl) {
  const modalVideo = document.getElementById("modalVideo");
  const source = modalVideo.querySelector("source");
  source.src = videoUrl;
  modalVideo.load();

  const modal = new bootstrap.Modal(document.getElementById("videoModal"));
  modal.show();

  // Play the video when modal opens
  modalVideo.onloadeddata = function () {
    modalVideo.play();
  };

  // Reset video when modal closes
  document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  });
}
AOS.init()

// testimonial-masonry
document.addEventListener("DOMContentLoaded", function () {
  const masonry = document.querySelector(".testimonial-masonry");
  const items = document.querySelectorAll(".testimonial-item");
  const indexEl = document.getElementById("testimonial-index");
  const totalEl = document.getElementById("testimonial-total");

  totalEl.textContent = items.length;

  // Function to detect the visible item
  function updateVisibleIndex() {
    let closestIndex = 0;
    let closestOffset = Infinity;

    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const offset = Math.abs(rect.left);

      if (offset < closestOffset) {
        closestOffset = offset;
        closestIndex = i;
      }
    });

    indexEl.textContent = closestIndex + 1;
  }

  // Add scroll listener
  masonry.addEventListener("scroll", () => {
    requestAnimationFrame(updateVisibleIndex);
  });

  // Initial call
  updateVisibleIndex();
});


// firebase config
window.saveForm = async function (event) {
  event.preventDefault();

  const form = event.target;

  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
  const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js");

  const firebaseConfig = {
    apiKey: "AIzaSyAG5VgFrw7dpTVCu0OtE00HQht2HN9O2rE",
    authDomain: "tungsten-user-management.firebaseapp.com",
    projectId: "tungsten-user-management",
    storageBucket: "tungsten-user-management.firebasestorage.app",
    messagingSenderId: "81220252865",
    appId: "1:81220252865:web:693895e1d91306f1ba5040",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const formData = {
    page_name: form.page_name.value,
    name: form.name.value,
    email: form.email.value,
    whatsapp: form.whatsapp.value,
    message: form.message.value,
    whatsappConsent: form.whatsapp_consent.checked,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "contacts"), formData);

    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: (() => {
        const fd = new FormData(form);
        fd.append("access_key", "7287b7ba-cfb9-4332-8d51-5754b68a67c2");
        return fd;
      })()
    });

    if (web3Response.ok) {
      document.getElementById("successMessage").classList.remove("d-none");
      form.reset();
      setTimeout(() => {
        document.getElementById("successMessage").classList.add("d-none");
        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
      }, 3000);
    } else {
      alert("Email send failed.");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
}

// lazy-load-video
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video.lazy-video");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector("source");
        source.src = source.dataset.src;  // Load actual video
        video.load();
        video.play(); // Autoplay when visible
        obs.unobserve(video);
      }
    });
  }, { threshold: 0.25 }); // 25% visible

  videos.forEach(video => observer.observe(video));
});


document.querySelectorAll('#servicesDropdown').forEach(link => {
  link.addEventListener('click', function (e) {
    window.location.href = this.getAttribute('href');
  });
});



const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', function () {
    if (window.innerWidth > 992) { // only desktop
      this.querySelector('.dropdown-menu').classList.add('show');
    }
  });
  dropdown.addEventListener('mouseleave', function () {
    if (window.innerWidth > 992) {
      this.querySelector('.dropdown-menu').classList.remove('show');
    }
  });
});





