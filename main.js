document.addEventListener("DOMContentLoaded", function () {
  const newDiv = document.createElement("div");
  newDiv.id = "infoBox";
  document.body.appendChild(newDiv);

  const infoBox = document.getElementById("infoBox");

  const paths = document.querySelectorAll("path");

  paths.forEach((path) => {
    path.addEventListener("mouseover", function (event) {
      displayRegionInfo(event, this);
    });

    path.addEventListener("mouseout", function () {
      hideRegionInfo();
    });
  });

  function displayRegionInfo(event, element) {
    const regionName = element.getAttribute("name");
    const regionInfo = element.getAttribute("name_en"); // تغییر در اینجا بر اساس نیاز
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    infoBox.style.left = mouseX + "px";
    infoBox.style.top = mouseY + "px";
    infoBox.innerHTML = `${regionName}<br>${regionInfo}`;

    setTimeout(() => {
      infoBox.classList.add("show");
    }, 700);
  }

  function hideRegionInfo() {
    setTimeout(() => {
      infoBox.classList.remove("show");
    }, 200);
  }
});