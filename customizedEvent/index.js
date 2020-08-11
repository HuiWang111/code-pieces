let ev = document.querySelector("#ev");
let eve = new Event("test");
ev.addEventListener("test", function () {
    console.log("test dispatch");
});
setTimeout(() => {
    ev.dispatchEvent(eve);
}, 5000);