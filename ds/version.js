/* Deux versions du même site, selon l'adresse :
   - https://antonymorla.github.io/marie-antony-2027/        → religieux seul (samedi + brunch)
   - https://antonymorla.github.io/marie-antony-2027/?civil  → civil (jeudi), welcome dinner (vendredi) et religieux
   Rien n'est retenu sur le téléphone : c'est l'adresse qui décide. Les liens entre les pages gardent « ?civil ». */
(function () {
  'use strict';
  var civil = /[?&]civil(?:[=&#]|$)/.test(location.search);
  window.MA_CIVIL = civil;
  if (!civil) return;
  document.documentElement.classList.add('v-civil');

  var PAGES = /^(index|hebergements|taxis|cagnotte)\.html$/;
  function fix(root) {
    [].forEach.call((root || document).querySelectorAll('a[href]'), function (a) {
      var h = a.getAttribute('href'), m = h.match(/^([^?#]+)(\?[^#]*)?(#.*)?$/);
      if (m && PAGES.test(m[1]) && !/[?&]civil\b/.test(m[2] || '')) {
        a.setAttribute('href', m[1] + (m[2] ? m[2] + '&civil' : '?civil') + (m[3] || ''));
      }
      /* onglet « Les jours d'avant » (jeudi et vendredi) juste avant « Le jour J » dans le menu */
      if (/#jourj$/.test(h) && a.closest('.nav2__menu') && !(a.previousElementSibling && a.previousElementSibling.hasAttribute('data-avant'))) {
        var av = a.cloneNode(false);
        av.setAttribute('href', a.getAttribute('href').replace(/#jourj$/, '#joursavant'));
        av.setAttribute('data-avant', '');
        av.textContent = "Les jours d'avant";
        a.parentNode.insertBefore(av, a);
      }
    });
  }
  window.MA_FIX_LINKS = fix;
  document.addEventListener('DOMContentLoaded', function () { fix(document); });
})();
