const getData = async () => {
  const response = await fetch("./assets/data.json");
  const data = await response.json();
  return data;
};

var webIcon = `<div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div class="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-development-white.svg"
                      alt="development icon" />
                  </div>
                  <div class="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-development-black.svg"
                      alt="development icon" />
                  </div>
                </div>`;

var mobileIcon = `<div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div class="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-mobile-white.svg"
                      alt="Mobile Application icon" />
                  </div>
                  <div class="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-mobile-black.svg"
                      alt="Mobile Application icon" />
                  </div>
                </div>`;

var uiuxIcon = `<div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div class="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-graphics-white.svg"
                      alt="Graphic Design icon" />
                  </div>
                  <div class="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-graphics-black.svg"
                      alt="Graphic Design icon" />
                  </div>
                </div>`;

getData().then((data) => {
  var intro = document.querySelector("#intro");
  var title = document.querySelector("#title");
  var description = document.querySelector("#description");
  var socialsMain = document.querySelector("#socials-main");
  var socials = document.querySelector("#socials");
  var skillsItems = document.querySelector("#skills");
  var portfolioItems = document.querySelector("#portfolio-items");
  var servicesItems = document.querySelector("#services-items");
  var workItems = document.querySelector("#work-items");
  var finishedProjects = document.querySelector("#finished-projects");
  var certifications = document.querySelector("#certifications");

  intro.innerHTML = `Hello I'm ${data.name}!`;
  title.innerHTML = `I'm ${data.name}, a ${data.title}`;
  description.innerHTML = data.description;

  Object.keys(data.social).forEach((social, idx) => {
    socialsMain.innerHTML += `<a href="${data.social[social]}"
                      target="_blank" class="${idx > 0 ? "pl-4" : ""}">
                      <i
                        class="bx bxl-${social} text-2xl text-white hover:text-yellow"></i>
                    </a>`;

    socials.innerHTML += `<a href="${data.social[social]}"
                      target="_blank" class="${idx > 0 ? "pl-4" : ""}">
                      <i
                        class="bx bxl-${social} text-2xl text-primary hover:text-yellow"></i>
                    </a>`;
  });

  finishedProjects.innerHTML = data.statistics.finished_projects;
  certifications.innerHTML = data.statistics.certifications;

  data.skills.forEach((item, idx) => {
    skillsItems.innerHTML += `<div class="${idx > 0 ? "pt-6" : ""}">
                  <div class="flex items-end justify-between">
                    <h4 class="font-body font-semibold uppercase text-black">
                      ${item.name}
                    </h4>
                    <h3
                      class="font-body font-bold text-primary">${
                        item.experience_years
                      } Year${item.experience_years > 1 ? "s" : ""}</h3>
                  </div>
                </div>`;
  });

  data.services.forEach((item) => {
    var icon =
      item.name == "Web Development"
        ? webIcon
        : item.name == "Mobile Development"
        ? mobileIcon
        : uiuxIcon;
    servicesItems.innerHTML += `
    <div class="group rounded px-8 py-12 shadow hover:bg-primary">
                ${icon}
                <div class="text-center">
                  <h3
                    class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                    ${item.name}
                  </h3>
                  <p
                    class="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    ${item.description}
                  </p>
                </div>
              </div>`;
  });

  data.portfolio.forEach((item) => {
    var icon =
      item.type == "Web Development"
        ? webIcon
        : item.type == "Mobile Development"
        ? mobileIcon
        : uiuxIcon;
    portfolioItems.innerHTML += `
        <div class="group rounded px-8 py-12 shadow hover:bg-primary">
            ${icon}
            <div class="text-center">
                <h3
                class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                ${item.name}
                </h3>
                <p
                class="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                ${item.description}
                </p>
            </div>
        </div>
    `;
  });

  data.work_experience.forEach((item) => {
    var startDate = new Date(item.start);
    var endDate = new Date(item.end);

    var diff = new Date(endDate.getTime() - startDate.getTime());
    var diffYear = diff.getUTCFullYear() - 1970;
    var diffMonth = diff.getUTCMonth();

    var diffDate =
      (diffYear > 0 ? diffYear + ` year${diffYear > 1 ? "s" : ""} ` : "") +
      (diffMonth > 0 ? diffMonth + ` month${diffMonth > 1 ? "s" : ""} ` : "");

    workItems.innerHTML += `<div
                class="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div class="md:w-2/5">
                  <div class="flex justify-center md:justify-start">
                    <span
                      class="shrink-0 block font-body font-bold text-grey-10">
                      ${item.company}
                    </span>
                    <div class="relative ml-3 hidden w-full md:block">
                      <span
                        class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                    </div>
                  </div>
                </div>
                <div class="md:w-3/5">
                  <div class="relative flex md:pl-18">
                    <span
                      class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                    <div class="mt-1 flex">
                      <i
                        class="bx bxs-right-arrow hidden text-primary md:block"></i>
                      <div class="md:-mt-1 md:pl-8">
                        <span class="block font-body font-bold text-grey-40">${
                          item.start
                        } - ${item.end} ${
      diffYear > 0 || diffMonth > 0 ? " ·" : ""
    } ${diffDate}</span>
                        <span
                          class="block pt-2 font-header text-xl font-bold uppercase text-primary">${
                            item.position
                          }</span>
                        <div class="pt-2">
                          <span class="block font-body text-black">${
                            item.description
                          }</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  });
});
