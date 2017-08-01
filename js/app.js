(function() {

  var baseStyle =
'#content-wrapper { \n'+
'  position: absolute;\n' +
'  width: 100%;\n' +
'  height: 100%;\n' +
'  background-color: #babaca;\n' +
'}';

  var cssEditor = ace.edit('css-content');
  cssEditor.setTheme('ace/theme/monokai');
  cssEditor.getSession().setMode('ace/mode/css');


  var htmlEditor = ace.edit('html-content');
  htmlEditor.setTheme('ace/theme/monokai');
  htmlEditor.getSession().setMode('ace/mode/html');

  var previewElement = document.getElementById('preview');
  var shadowElement = previewElement.createShadowRoot();
  var debounceTime = 1000;
  var css = localStorage.getItem('css') || '';
  var html = localStorage.getItem('html') || '';

  cssEditor.getSession().on('change', debounce(updateCss, debounceTime));
  htmlEditor.getSession().on('change', debounce(updateHtml, debounceTime));

  function updateCss(e) {
    css = cssEditor.getValue();
    localStorage.setItem('css', css);
    render();
  }

  function updateHtml(e) {
    html = htmlEditor.getValue();
    localStorage.setItem('html', html);
    render();
  }

  function render() {
    shadowElement.innerHTML = '<style>' + baseStyle + '\n\n' + css + '</style><div id="content-wrapper">' + html + '</div>';
  }

  render();
  cssEditor.setValue(css);
  htmlEditor.setValue(html);


  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
}());
