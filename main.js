const imgs = [
  {
    id: 1,
    img: "content/frage.png",
    alt: "content/katze.jfif",
  },
  {
    id: 2,
    img: "content/frage.png",
    alt: "content/stitch.png",
  },
  {
    id: 3,
    img: "content/frage.png",
    alt: "content/kitty.png",
  },
];

// rules
let awaytingEndOfMove = false;
let activeElement = null;
let revealedCount = 0;
let elCount = 0;

// creating arcticles
const container = document.getElementById("container");
document.addEventListener("DOMContentLoaded", function () {
  displayImg = imgs.map(function (item) {
    return `<article class="article">
    <img src="${item.img}" alt="${item.alt}" class="img" data-cover="${item.img}" data-revealed="false"/>
    </article>`;
  });
  displayImg = displayImg.concat(displayImg);
  shuffleArray(displayImg);
  elCount = displayImg.length;
  container.innerHTML = displayImg.join("");

  const articleImgs = document.querySelectorAll(".img");
  articleImgs.forEach(function (el) {
    el.addEventListener("click", function () {
      const revealed = el.getAttribute("data-revealed");

      if (awaytingEndOfMove || revealed === "true" || el === activeElement) {
        return;
      }

      const newSrc = el.getAttribute("alt");
      el.setAttribute("src", newSrc);

      console.log(activeElement);
      if (!activeElement) {
        activeElement = el;
        return;
      }

      const activeElementMuch = activeElement.getAttribute("src");
      const elMuch = el.getAttribute("src");
      if (activeElementMuch === elMuch) {
        activeElement.setAttribute("data-revealed", "true");
        el.setAttribute("data-revealed", "true");
        activeElement = null;
        // awaytingEndOfMove = false;
        revealedCount += 2;
        if (revealedCount === elCount) {
          alert("You won this game");
        }
        return;
      } else {
        awaytingEndOfMove = true;

        setTimeout(function () {
          let newSrc = el.getAttribute("data-cover");
          el.setAttribute("src", newSrc);
          activeElement.setAttribute("src", newSrc);
          console.log(activeElement);
          activeElement = null;
          awaytingEndOfMove = false;
        }, 1000);
      }
    });
  });
});
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
