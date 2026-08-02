// 1. Sticky Header Effect
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        });
    });
});

// 3. Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // Clear previous content
        lightboxContent.innerHTML = '';
        
        // Check if item has an image or video
        const img = item.querySelector('img');
        const video = item.querySelector('video');

        if (img) {
            const clonedImg = img.cloneNode();
            clonedImg.style.width = 'auto';
            clonedImg.style.height = 'auto';
            clonedImg.style.maxHeight = '90vh';
            clonedImg.style.maxWidth = '90vw';
            lightboxContent.appendChild(clonedImg);
        } else if (video) {
            const clonedVideo = video.cloneNode(true);
            clonedVideo.style.width = 'auto';
            clonedVideo.style.height = 'auto';
            clonedVideo.style.maxHeight = '90vh';
            clonedVideo.style.maxWidth = '90vw';
            clonedVideo.setAttribute('controls', 'true');
            clonedVideo.play();
            lightboxContent.appendChild(clonedVideo);
        }

        lightbox.classList.add('active');
    });
});

// Close Lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    // Pause video if playing
    const vid = lightboxContent.querySelector('video');
    if(vid) vid.pause();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        const vid = lightboxContent.querySelector('video');
        if(vid) vid.pause();
    }
});
