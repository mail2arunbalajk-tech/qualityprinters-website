/* Quality Prints and Paper Bags — main.js */

(function(){
  'use strict';

  /* ── Active nav link ── */
  (function setActiveNav(){
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function(a){
      var href = a.getAttribute('href') || '';
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });
  })();

  /* ── Hamburger menu ── */
  var hamburger = document.getElementById('hamburger');
  var overlay   = document.getElementById('navOverlay');
  if(hamburger && overlay){
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Showcase filter ── */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards      = document.querySelectorAll('.product-card[data-category]');
  if(filterBtns.length && cards.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterBtns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.filter;
        cards.forEach(function(card){
          if(cat === 'all' || card.dataset.category === cat){
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── WhatsApp enquiry form ── */
  var enqForm = document.getElementById('enquiryForm');
  if(enqForm){
    enqForm.addEventListener('submit', function(e){
      e.preventDefault();

      var selectedRadio = enqForm.querySelector('input[name="cat"]:checked');
      var category = selectedRadio ? selectedRadio.value : 'General';
      var name     = (enqForm.querySelector('#enqName')  || {}).value || '';
      var phone    = (enqForm.querySelector('#enqPhone') || {}).value || '';
      var message  = (enqForm.querySelector('#enqMsg')   || {}).value || '';

      var text = 'Hi, I am interested in ' + category + ' packaging.';
      if(name)    text += ' My name is ' + name + '.';
      if(phone)   text += ' My contact number is ' + phone + '.';
      if(message) text += ' ' + message;

      var url = 'https://wa.me/919698154825?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ── Product page: individual enquire buttons ── */
  document.querySelectorAll('.btn-wa[data-product]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var product = btn.dataset.product || 'your product';
      var text = 'Hi, I am interested in ' + product + '. Please share pricing and details.';
      var url = 'https://wa.me/919698154825?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ── "Enquire Now" nav CTA and hero button → scroll to enquiry section ── */
  document.querySelectorAll('[data-scroll]').forEach(function(el){
    el.addEventListener('click', function(){
      var target = document.getElementById(el.dataset.scroll);
      if(target){
        target.scrollIntoView({behavior:'smooth',block:'start'});
      } else {
        window.location.href = 'contact.html';
      }
    });
  });

  /* ── Sticky nav shadow on scroll ── */
  var navEl = document.querySelector('nav');
  if(navEl){
    window.addEventListener('scroll', function(){
      navEl.style.boxShadow = window.scrollY > 4 ? '0 2px 8px rgba(0,0,0,.07)' : '';
    }, {passive:true});
  }

})();
