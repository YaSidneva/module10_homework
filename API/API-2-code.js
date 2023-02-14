const btn = document.querySelector(".j-btn-test");

btn.addEventListener("click", function () {
  alert(
    `Размер экрана: ширина - ${window.screen.width}px, высота - ${window.screen.height}px`
  );
});
