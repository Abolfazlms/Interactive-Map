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
    const regionInfo = element.getAttribute("code"); // تغییر در اینجا بر اساس نیاز
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const apiUrl = "https://prayer.aviny.com/api/prayertimes/" + regionInfo;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // استفاده از اطلاعات دریافتی از API به عنوان regionInfo
        const regionInfo = `مرکز استان: ${data.CityName}<br>تاریخ شمسی: ${data.Today}<br>تاریخ قمری: ${data.TodayQamari}<br>
        اذان صبح: ${data.Imsaak}<br>طلوع آفتاب: ${data.Sunrise}<br>اذان ظهر: ${data.Noon}<br>
        غروب آفتاب: ${data.Sunset}<br>اذان مغرب: ${data.Maghreb}<br>نیمه شب شرعی: ${data.Midnight}
        <br>منطقه زمانی: ${data.TimeZone}`;

        infoBox.style.left = mouseX + "px";
        infoBox.style.top = mouseY + "px";
        infoBox.innerHTML = `${regionName}<br><br>${regionInfo}`;

        setTimeout(() => {
          infoBox.classList.add("show");
        }, 700);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  function hideRegionInfo() {
    setTimeout(() => {
      infoBox.classList.remove("show");
    }, 300); // Delay of 300 milliseconds
  }
});

// $(document).ready(function () {
//   $.ajax({
//     url: "https://prayer.aviny.com/api/prayertimes/1",
//     dataType: "json",
//     type: "GET",
//     success: function (data) {
//       $("#div_test").append("نام شهر: " + data.CityName + "<br/>");
//       $("#div_test").append("نام کشور: " + data.CountryName + "<br/>");
//       $("#div_test").append("امروز: " + data.Today + "<br/>");
//       $("#div_test").append("" + data.TodayQamari + "<br/>");
//       $("#div_test").append("اذان صبح: " + data.Imsaak + "<br/>");
//       $("#div_test").append("طلوع آفتاب: " + data.Sunrise + "<br/>");
//       $("#div_test").append("اذان ظهر: " + data.Noon + "<br/>");
//       $("#div_test").append("غروب خورشید: " + data.Sunset + "<br/>");
//       $("#div_test").append("اذان مغرب: " + data.Maghreb + "<br/>");
//       $("#div_test").append("نیمه شب شرعی: " + data.Midnight + "<br/>");
//       $("#div_test").append("نام شهر: " + data.CityLName + "<br/>");
//       $("#div_test").append("نام کشور: " + data.CountryLName + "<br/>");
//       $("#div_test").append("وقت محلی: " + data.TimeZone + "<br/>");
//     },
//   });
// });
