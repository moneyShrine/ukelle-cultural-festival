
const text = document.querySelector('.scrolling-text');

text.addEventListener('animationend', () => {
    // Remove and re-add class to restart animation
    text.classList.remove('scrolling-text');
    void text.offsetWidth; // Trigger reflow
    text.classList.add('scrolling-text');
});
