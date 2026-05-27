(function() {
    var links = document.querySelectorAll('.hero-meta a[data-section]');
    var header = document.querySelector('.site-header');
    var main = document.querySelector('main');

    var headerH = function() {
        return header ? header.offsetHeight : 0;
    };

    function syncPadding() {
        if (main) main.style.paddingTop = headerH() + 'px';
    }
    syncPadding();
    window.addEventListener('resize', syncPadding);

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var id = this.getAttribute('data-section');
            var target = document.getElementById(id);
            if (!target) return;

            var top = target.getBoundingClientRect().top + window.pageYOffset - headerH();
            window.scrollTo({ top: top, behavior: 'smooth' });

            links.forEach(function(l) { l.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    // highlight active section on scroll
    var sections = document.querySelectorAll('.section-block');
    function onScroll() {
        var offset = headerH() + 100;
        var current = '';
        sections.forEach(function(sec) {
            if (sec.getBoundingClientRect().top <= offset) {
                current = sec.id;
            }
        });
        links.forEach(function(l) {
            l.classList.toggle('active', l.getAttribute('data-section') === current);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
