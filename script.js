const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('img');
const closeBtn = document.getElementById('closeModal');

document.querySelectorAll('#carousel img').forEach(img => {
    img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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