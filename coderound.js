document.addEventListener("click", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = Math.floor(Math.random() * 91) + 10; // Random radius between 10 and 100

    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.width = `${2 * radius}px`;
    circle.style.height = `${2 * radius}px`;
    circle.style.left = `${mouseX  - radius}px`;
    circle.style.top = `${mouseY - radius}px`;

    document.body.appendChild(circle);

});

