(function () {
  // ── Topic registry ──────────────────────────────────────────────
  var TOPICS = [
    { id: 1,  title: 'EDA & Statistics',     file: 'eda.html',               badge: '01', color: '#3b82f6', prev: null,                    prevLabel: null,                  next: 'linear-regression.html',  nextLabel: 'Linear Regression' },
    { id: 2,  title: 'Linear Regression',    file: 'linear-regression.html', badge: '02', color: '#4f90f8', prev: 'eda.html',               prevLabel: 'EDA & Statistics',    next: 'logistic-regression.html', nextLabel: 'Logistic Regression' },
    { id: 3,  title: 'Logistic Regression',  file: 'logistic-regression.html', badge: '03', color: '#6366f1', prev: 'linear-regression.html', prevLabel: 'Linear Regression',  next: 'regularization.html',     nextLabel: 'Regularization' },
    { id: 4,  title: 'Regularization',       file: 'regularization.html',    badge: '04', color: '#7c3aed', prev: 'logistic-regression.html', prevLabel: 'Logistic Regression', next: 'advanced-regression.html', nextLabel: 'Advanced Regression' },
    { id: 5,  title: 'Advanced Regression',  file: 'advanced-regression.html', badge: '05', color: '#8b5cf6', prev: 'regularization.html',   prevLabel: 'Regularization',     next: 'decision-trees.html',     nextLabel: 'Decision Trees' },
    { id: 6,  title: 'Decision Trees',       file: 'decision-trees.html',    badge: '06', color: '#f59e0b', prev: 'advanced-regression.html', prevLabel: 'Advanced Regression', next: 'random-forest.html',     nextLabel: 'Random Forest' },
    { id: 7,  title: 'Random Forest',        file: 'random-forest.html',     badge: '07', color: '#f97316', prev: 'decision-trees.html',    prevLabel: 'Decision Trees',     next: 'boosting.html',           nextLabel: 'Boosting' },
    { id: 8,  title: 'Boosting',             file: 'boosting.html',          badge: '08', color: '#a78bfa', prev: 'random-forest.html',     prevLabel: 'Random Forest',      next: 'svm.html',                nextLabel: 'SVM' },
    { id: 9,  title: 'SVM',                  file: 'svm.html',               badge: '09', color: '#fb7185', prev: 'boosting.html',          prevLabel: 'Boosting',           next: 'naive-bayes.html',        nextLabel: 'Naive Bayes' },
    { id: 10, title: 'Naive Bayes',          file: 'naive-bayes.html',       badge: '10', color: '#06b6d4', prev: 'svm.html',               prevLabel: 'SVM',                next: 'clustering.html',         nextLabel: 'Clustering' },
    { id: 11, title: 'Clustering',           file: 'clustering.html',        badge: '11', color: '#14b8a6', prev: 'naive-bayes.html',       prevLabel: 'Naive Bayes',        next: 'pca.html',                nextLabel: 'PCA' },
    { id: 12, title: 'PCA',                  file: 'pca.html',               badge: '12', color: '#10b981', prev: 'clustering.html',        prevLabel: 'Clustering',         next: 'model-selection.html',    nextLabel: 'Model Selection' },
    { id: 13, title: 'Model Selection',      file: 'model-selection.html',   badge: '13', color: '#84cc16', prev: 'pca.html',               prevLabel: 'PCA',                next: 'neural-networks.html',    nextLabel: 'Neural Networks' },
    { id: 14, title: 'Neural Networks',      file: 'neural-networks.html',   badge: '14', color: '#3b82f6', prev: 'model-selection.html',   prevLabel: 'Model Selection',    next: 'cnn.html',                nextLabel: 'CNN' },
    { id: 15, title: 'CNN',                  file: 'cnn.html',               badge: '15', color: '#6366f1', prev: 'neural-networks.html',   prevLabel: 'Neural Networks',    next: null,                      nextLabel: null }
  ];

  // ── Read topic id from meta tag ──────────────────────────────────
  var meta = document.querySelector('meta[name="topic-id"]');
  if (!meta) return; // hub page — do nothing
  var topicId = parseInt(meta.getAttribute('content'), 10);
  var topic = TOPICS.find(function (t) { return t.id === topicId; });
  if (!topic) return;

  // ── Inject topbar ────────────────────────────────────────────────
  var nav = document.createElement('nav');
  nav.id = 'site-topbar';

  var hubLink = document.createElement('a');
  hubLink.href = 'index.html';
  hubLink.textContent = '← Hub';
  nav.appendChild(hubLink);

  var center = document.createElement('div');
  center.className = 'topbar-center';

  var badge = document.createElement('span');
  badge.className = 'topbar-badge';
  badge.textContent = topic.badge;
  badge.style.background = topic.color;
  center.appendChild(badge);

  var titleEl = document.createElement('span');
  titleEl.className = 'topbar-title';
  titleEl.textContent = topic.title;
  center.appendChild(titleEl);
  nav.appendChild(center);

  var rightGroup = document.createElement('div');
  rightGroup.style.cssText = 'display:flex;align-items:center;gap:12px;flex-shrink:0;';

  if (topic.prev) {
    var prevLink = document.createElement('a');
    prevLink.href = topic.prev;
    prevLink.textContent = '←';
    prevLink.title = topic.prevLabel;
    rightGroup.appendChild(prevLink);
  }
  if (topic.next) {
    var nextLink = document.createElement('a');
    nextLink.href = topic.next;
    nextLink.textContent = '→';
    nextLink.title = topic.nextLabel;
    rightGroup.appendChild(nextLink);
  }
  nav.appendChild(rightGroup);

  document.body.insertBefore(nav, document.body.firstChild);

  // ── Touch → mouse event translation ─────────────────────────────
  function addTouchSupport(canvas) {
    function getPos(touch) {
      var r = canvas.getBoundingClientRect();
      return {
        clientX: touch.clientX,
        clientY: touch.clientY,
        offsetX: touch.clientX - r.left,
        offsetY: touch.clientY - r.top
      };
    }
    function relay(touchEvt, mouseType) {
      touchEvt.preventDefault();
      var t = touchEvt.changedTouches[0];
      var pos = getPos(t);
      var evt = new MouseEvent(mouseType, {
        bubbles: true, cancelable: true,
        clientX: pos.clientX, clientY: pos.clientY
      });
      // Patch offsetX/offsetY (read-only on real MouseEvent)
      Object.defineProperty(evt, 'offsetX', { value: pos.offsetX });
      Object.defineProperty(evt, 'offsetY', { value: pos.offsetY });
      canvas.dispatchEvent(evt);
    }
    canvas.addEventListener('touchstart',  function (e) { relay(e, 'mousedown'); }, { passive: false });
    canvas.addEventListener('touchmove',   function (e) { relay(e, 'mousemove'); }, { passive: false });
    canvas.addEventListener('touchend',    function (e) { relay(e, 'mouseup');   }, { passive: false });
    canvas.addEventListener('touchcancel', function (e) { relay(e, 'mouseup');   }, { passive: false });
  }

  // ── Responsive canvas resize ─────────────────────────────────────
  function setupCanvasResize(canvas) {
    var naturalW = canvas.width;
    var naturalH = canvas.height;
    var ratio = naturalH / naturalW;

    function resize() {
      var containerW = canvas.parentElement
        ? canvas.parentElement.getBoundingClientRect().width
        : window.innerWidth;
      if (containerW <= 0) return;
      var newW = Math.floor(Math.min(containerW, naturalW));
      if (newW === canvas.width) return;
      canvas.width  = newW;
      canvas.height = Math.floor(newW * ratio);
      // Call page's own redraw function if present
      if (typeof window.redraw === 'function') window.redraw();
      else if (typeof window.draw === 'function') window.draw();
    }

    var ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || document.body);
    resize();
  }

  // ── Apply to all canvases on page ────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('canvas').forEach(function (c) {
      addTouchSupport(c);
      setupCanvasResize(c);
    });
  });

  // Also run immediately for canvases already in DOM at script exec time
  document.querySelectorAll('canvas').forEach(function (c) {
    addTouchSupport(c);
    setupCanvasResize(c);
  });

})();
