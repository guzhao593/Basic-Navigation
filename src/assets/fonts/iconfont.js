/* eslint-disable */ // 禁用eslint
(function (window) { var svgSprite = '<svg><symbol id="icon-yuangongzizhuzhankai" viewBox="0 0 1024 1024"><path d="M143.5 248.3h739.2c24.5 0 44.4-19.7 44.4-44s-19.9-44-44.4-44H143.5c-24.5 0-44.4 19.7-44.4 44s19.9 44 44.4 44z m0 307.8H587c24.5 0 44.4-19.7 44.4-44s-19.9-44-44.4-44H143.5c-24.5 0-44.4 19.7-44.4 44s19.9 44 44.4 44z m618.4-187.2c-1.4-1.2-3-1.8-4.9-1.8-4.1 0-7.4 3.3-7.4 7.3v275.2c0 1.7 0.6 3.5 1.8 4.9 2.7 3 7.4 3.4 10.4 0.7l152.5-131.9c0.5-0.5 1-0.9 1.4-1.4 5.4-6.1 4.7-15.4-1.4-20.7L761.9 368.9zM882.6 776H143.5c-24.5 0-44.4 19.7-44.4 44s19.9 44 44.4 44h739.2c24.5 0 44.4-19.7 44.4-44-0.1-24.3-20-44-44.5-44z" fill="#A8A8C3" ></path></symbol><symbol id="icon-yuangongzizhushouqi" viewBox="0 0 1024 1024"><path d="M141.1 247.2h742.3c24.6 0 44.5-19.8 44.5-44.2s-19.9-44.2-44.5-44.2H141.1c-24.6 0-44.5 19.8-44.5 44.2s20 44.2 44.5 44.2z m742.4 220.9H438.1c-24.6 0-44.5 19.8-44.5 44.2 0 24.4 19.9 44.2 44.5 44.2h445.4c24.6 0 44.5-19.8 44.5-44.2 0-24.4-20-44.2-44.5-44.2z m-621.1-99.8L109.2 501.1c-6.2 5.3-6.8 14.6-1.4 20.8 0.5 0.5 0.9 1 1.4 1.4l153.2 132.5c3.1 2.7 7.8 2.4 10.5-0.7 1.2-1.4 1.9-3 1.9-4.9V373.8c0-4-3.3-7.4-7.4-7.4-1.8 0.1-3.6 0.7-5 1.9z m621.1 408.9H141.1c-24.6 0-44.5 19.8-44.5 44.2 0 24.4 19.9 44.2 44.5 44.2h742.3c24.6 0 44.5-19.8 44.5-44.2 0.1-24.4-19.9-44.2-44.4-44.2z" fill="#A8A8C3" ></path></symbol></svg>'; var script = (function () { var scripts = document.getElementsByTagName('script'); return scripts[scripts.length - 1] }()); var shouldInjectCss = script.getAttribute('data-injectcss'); var ready = function (fn) { if (document.addEventListener) { if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) { setTimeout(fn, 0) } else { var loadFn = function () { document.removeEventListener('DOMContentLoaded', loadFn, false); fn() }; document.addEventListener('DOMContentLoaded', loadFn, false) } } else if (document.attachEvent) { IEContentLoaded(window, fn) } function IEContentLoaded (w, fn) { var d = w.document, done = false, init = function () { if (!done) { done = true; fn() } }; var polling = function () { try { d.documentElement.doScroll('left') } catch (e) { setTimeout(polling, 50); return }init() }; polling(); d.onreadystatechange = function () { if (d.readyState === 'complete') { d.onreadystatechange = null; init() } } } }; var before = function (el, target) { target.parentNode.insertBefore(el, target) }; var prepend = function (el, target) { if (target.firstChild) { before(el, target.firstChild) } else { target.appendChild(el) } }; function appendSvg () { var div, svg; div = document.createElement('div'); div.innerHTML = svgSprite; svgSprite = null; svg = div.getElementsByTagName('svg')[0]; if (svg) { svg.setAttribute('aria-hidden', 'true'); svg.style.position = 'absolute'; svg.style.width = 0; svg.style.height = 0; svg.style.overflow = 'hidden'; prepend(svg, document.body) } } if (shouldInjectCss && !window.__iconfont__svg__cssinject__) { window.__iconfont__svg__cssinject__ = true; try { document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>') } catch (e) { console && console.log(e) } }ready(appendSvg) })(window)
