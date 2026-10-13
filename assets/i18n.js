(function(){
  var html = document.documentElement;
  var STORAGE_KEY = 'beto-lang';
  var buttons = document.querySelectorAll('[data-set-lang]');

  function applyLang(lang){
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    buttons.forEach(function(btn){
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      applyLang(btn.getAttribute('data-set-lang'));
    });
  });

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch(e){}
  var preferred = saved || 'pt';
  applyLang(preferred);

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
