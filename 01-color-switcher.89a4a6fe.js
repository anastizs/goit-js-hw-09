!function(){var t,e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");e.addEventListener("click",(function(){t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),e.setAttribute("disabled",!0),r.removeAttribute("disabled",!0)})),r.addEventListener("click",(function(){clearInterval(t),r.setAttribute("disabled",!0),e.removeAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.89a4a6fe.js.map