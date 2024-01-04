window.onload = () => {
    if(location.hash !== ""){
        location.href = location.href.replace(/#\w+/, "");
    }
};
// function of show popup
document.querySelectorAll(".card").forEach((e) => {
    e.addEventListener("click", (e) => {
        let card = e.currentTarget;
        let popup = document.createElement("div");
        popup.classList.add("popup", "popup-special", "projectPopup");
        popup.innerHTML=
        `
        <div class="projectPopupBody">
            <div class="projectPopupDescription">
                <h1 class="projectPopupName">مشروع ${card.querySelector(".projectName").innerText}</h1>
                <p class="projectPopupDetails">${card.querySelector(".projectDetails").innerText}</p>
            </div>
            <div class="projectPopupImg">
                ${card.querySelector("img").outerHTML}
                <button class="visitSite">زيارة</button>
            </div>
        </div>
        `;
        popup.addEventListener("click", (e) => {
            if(e.target.nodeName === "IMG"){
                window.open(e.target.getAttribute("src"));
            }
            else if(e.target.classList.contains("visitSite")){
                location.href = card.getAttribute("site");
                e.currentTarget.remove();
            }
            else if(e.target.classList.contains("popup")){
                e.target.remove();
            }
        });
        document.body.appendChild(popup);
    });
});