const sections = document.querySelectorAll('main.content section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function onScrollSpy(){
      const y = window.pageYOffset;
      let currentId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (y >= top) currentId = sec.getAttribute('id');
      });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === ('#' + currentId)) a.classList.add('active');
      });
    }
    window.addEventListener('scroll', onScrollSpy);
    onScrollSpy();

    (function(){
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
      link.addEventListener('click', function(){
        const target = this.dataset.tab;
        // toggle active classes
        tabLinks.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        const el = document.getElementById(target);
        if (el) el.classList.add('active');
        // re-highlight all prism blocks (ensures code is formatted)
        if (window.Prism) Prism.highlightAll();
        // scroll into view a bit for UX
        el && el.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    // Optional: support keyboard left/right to navigate tabs
    document.addEventListener('keydown', (e) => {
      const activeIndex = Array.from(tabLinks).findIndex(b => b.classList.contains('active'));
      if (e.key === 'ArrowRight') {
        const next = (activeIndex + 1) % tabLinks.length;
        tabLinks[next].click();
      } else if (e.key === 'ArrowLeft') {
        const prev = (activeIndex - 1 + tabLinks.length) % tabLinks.length;
        tabLinks[prev].click();
      }
    });
    })();