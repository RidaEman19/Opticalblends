 
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    next.addEventListener('click', () => {
      const items = document.querySelectorAll('.item');
      slide.appendChild(items[0]); // move first item to the end
    });

    prev.addEventListener('click', () => {
      const items = document.querySelectorAll('.item');
      slide.prepend(items[items.length - 1]); // move last item to the front
    });
