// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    loadingAnimation();
    cursorAnimation();
});

function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 1,
        class: 'is-revealed'
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", { // ✅ FIXED: Changed from ".smooth-scroll" to ".main"
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    return locoScroll;
}

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
                    h5Timer.innerHTML = grow < 10 ? `0${grow}` : grow;
                    grow++;
                } else {
                    clearInterval(counter);
                }
            }, 35);
        }
    });

    tl.to("#loader", {
        opacity: 0,
        duration: 5,
        ease: "power2.inOut"
    });

    tl.to("#loader", {
        display: "none"
    });

    // Initialize locomotive scroll after loading animation
    tl.call(locomotiveAnimation); // ✅ FIXED: Initialize locomotive after loading

    tl.from("#page1", {
        opacity: 0,
        y: 200,
        duration: 0.4,
        ease: "power4.out"
    }, "-=0.5");

    tl.from("#nav", {
        opacity: 0
    }, "-=0.3");

    tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
        y: 100,
        opacity: 0,
        stagger: 0.3,
    }, "-=0.2");
}

function cursorAnimation() {
    // 👇 Custom cursor movement
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y,
            ease: "power2.out",
            duration: 0.1
        });
    });

    const videoContainer = document.querySelector("#video-container");
const videoCursor = document.querySelector("#video-cursor");

if (videoContainer && videoCursor) {
  videoContainer.addEventListener("mouseenter", () => {
    gsap.to(videoCursor, {
      scale: 1.1,
      opacity: 1,
      duration: 0.3,
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(videoCursor, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
    });
  });

  videoContainer.addEventListener("mousemove", (e) => {
    const rect = videoContainer.getBoundingClientRect();

    // Get relative mouse position
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Offset cursor a bit to the left side (-40px here, adjust as you like)
    x -= 40;

    // Prevent cursor from going outside the container
    const cursorWidth = videoCursor.offsetWidth / 2;
    const cursorHeight = videoCursor.offsetHeight / 2;

    x = Math.max(cursorWidth, Math.min(x, rect.width - cursorWidth));
    y = Math.max(cursorHeight, Math.min(y, rect.height - cursorHeight));

    gsap.to(videoCursor, {
      x: x - cursorWidth,
      y: y - cursorHeight,
      duration: 0.2,
      ease: "power3.out",
    });
  });
}


    // 👇 Shery magnet effect on nav links
    if (typeof Shery !== 'undefined') {
        Shery.makeMagnet("#nav-part2 h4", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });
    }
}

// Handle window resize
window.addEventListener("resize", function() {
    // Refresh ScrollTrigger on resize
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Handle page visibility to prevent animation issues when tab is not active
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        // Refresh animations when page becomes visible again
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }
});

function sheryAnimation() {
  Shery.imageEffect(".image-div",{
    style: 5,
    config: {"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.49,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.34,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    gooey: true
  })
}
sheryAnimation();


const hero3 = document.querySelector("#hero3");
const flag = document.querySelector("#flag");

// Move the flag smoothly with the cursor
document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
        left: dets.x,
        top: dets.y,
        ease: "power2.out",
        duration: 0.2
    });
});

// Show flag when hovering hero3
hero3.addEventListener("mouseenter", function () {
    gsap.to(flag, {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3
    });
});

// Hide flag when leaving hero3
hero3.addEventListener("mouseleave", function () {
    gsap.to(flag, {
        opacity: 0,
        ease: "power2.out",
        duration: 0.3
    });
});
