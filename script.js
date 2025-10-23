
let tl = gsap.timeline();

tl.from(".line h1", {
    y:150,
    stagger : 0.25,
    duration : 0.6,
    delay : 0.5
})

tl.from(".line1-part1, .line h2",{
    opacity : 0,
    onStart : function(){
        let h5Timer = document.querySelector(".line1-part1 h5");
let grow = 0;
setInterval(function(){
    if(grow <= 100){
        h5Timer.innerHTML = grow++
    }
},35)

    }
})

tl.to("#loader",{
    opacity : 0,
    duration : 0.4,
    delay : 4
})
tl.from("#page1", {
    opacity : 0,
    delay : 0.2,
    y: 1200,
    ease: power4
})
tl.to("#loader",{
    display: "none"
})