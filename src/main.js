document.addEventListener('DOMContentLoaded', () => {
  const scrollEl = document.querySelector('.best-sellers-scroll');
  const trackEl = document.querySelector('.scrollbar-track');
  const thumbEl = document.querySelector('.scrollbar-thumb');

  if (!scrollEl || !trackEl || !thumbEl) return;

  function updateThumb() {
    const scrollWidth = scrollEl.scrollWidth;
    const clientWidth = scrollEl.clientWidth;
    const scrollLeft = scrollEl.scrollLeft;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      thumbEl.style.width = '0';
      thumbEl.style.transform = 'translateX(0)';
      return;
    }

    const trackWidth = trackEl.offsetWidth;
    const thumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 24);
    const thumbMax = trackWidth - thumbWidth;
    const thumbPos = (scrollLeft / maxScroll) * thumbMax;

    thumbEl.style.width = `${thumbWidth}px`;
    thumbEl.style.transform = `translateX(${thumbPos}px)`;
  }

  scrollEl.addEventListener('scroll', updateThumb);
  window.addEventListener('resize', updateThumb);
  updateThumb();

  // Drag thumb
  let isDragging = false;
  let startX, startScrollLeft;

  thumbEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = scrollEl.scrollLeft;
    thumbEl.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const trackWidth = trackEl.offsetWidth;
    const thumbWidth = thumbEl.offsetWidth;
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    const scale = maxScroll / (trackWidth - thumbWidth);
    scrollEl.scrollLeft = startScrollLeft + dx * scale;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    thumbEl.style.cursor = 'grab';
  });

  // Click track to jump
  trackEl.addEventListener('click', (e) => {
    if (e.target === thumbEl) return;
    const rect = trackEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const trackWidth = trackEl.offsetWidth;
    const thumbWidth = thumbEl.offsetWidth;
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    const thumbMax = trackWidth - thumbWidth;
    const ratio = Math.max(0, Math.min(1, (x - thumbWidth / 2) / thumbMax));
    scrollEl.scrollLeft = ratio * maxScroll;
  });


  // Show More button: reveal hidden product cards
  const showMoreBtn = document.getElementById('show-more-btn');
  const hiddenItems = document.querySelectorAll('.best-sellers-list .mobile-product-hidden');
  if(hiddenItems.length <= 4) {
    showMoreBtn.style.display = 'none';
  } 

  if (showMoreBtn && hiddenItems.length) {
    showMoreBtn.addEventListener('click', () => {
      hiddenItems.forEach((li) => li.classList.remove('mobile-product-hidden'));
      showMoreBtn.style.display = 'none';
    });
  }
});