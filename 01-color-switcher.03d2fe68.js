const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){timerId=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.setAttribute("disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(()=>{clearInterval(timerId),e.setAttribute("disabled"),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.03d2fe68.js.map
