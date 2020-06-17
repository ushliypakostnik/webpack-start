import ScreenHelper from './utils/_screen-helper';

// Основной пересчёт/перерисовка
const redraw = () => {
  // console.log('redraw!!!');
};

(() => {
  // console.log('Ок!!!');

  document.addEventListener('DOMContentLoaded', () => {
    // console.log('event: DOM ready');

    // Click on block controls
    /* const controls = document.querySelectorAll('.step__control, .step__control--mobile');

    Array.from(controls).forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const block = e.target.parentElement;
        if (block.classList.contains("step--open")) block.classList.remove("step--open");
        else block.classList.add("step--open");
      });
    }); */

    redraw();
  });

  window.addEventListener("load", (event) => {
    // console.log('event: window load');

    redraw();
  });

  window.addEventListener("resize", (event) => {
    // console.log('event: window resize');

    redraw();
  });
})();
