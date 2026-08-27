const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('img');
const closeBtn = document.getElementById('closeModal');

function openModal(img) {
    modalImg.src = img.src;
    modalImg.alt = img.alt || 'Zoomed screenshot';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    modalImg.removeAttribute('src');
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('#carousel img').forEach(img => {
    img.addEventListener('click', () => openModal(img));
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

function scrollCarousel(direction) {
    const container = document.getElementById('carousel');
    const scrollAmount = 300;

    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
