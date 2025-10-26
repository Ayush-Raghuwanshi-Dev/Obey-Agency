function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5
  });

  tl.from(".line1-part1, .line h2", {
    opacity: 0,
    onStart: function() {
      let h5Timer = document.querySelector(".line1-part1 h5");
      let grow = 0;
      let counter = setInterval(() => {
        if (grow <= 100) {
          h5Timer.innerHTML = grow++;
        } else {
          clearInterval(counter);
        }
      }, 35);
    }
  });

  tl.to("#loader", {
    duration: 4
  });

  tl.to("#loader", {
    display: "none"
  });

  tl.from("#page1", {
    opacity: 0,
    y: 200,
    duration: 0.4,
    ease: "power4.out"
  });
  tl.from("#nav",{
    opacity: 0
  })
  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
    y: 100,
    stagger: 0.3,
  })
}

loadingAnimation();


function cursorAnimation() {
  document.addEventListener("DOMContentLoaded", function () {
  // 👇 Custom cursor movement
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
      ease: "power2.out",
    });
  });

  // 👇 Shery magnet effect on nav links
  Shery.makeMagnet("#nav-part2 h4", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
});
Shery.makeMagnet("#nav-part2 h4", {
  ease: "power3.out",
  duration: 0.7,
  strength: 0.3, // optional param in new versions
});
}

cursorAnimation();