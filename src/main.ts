import "./style.css";

function openWallpaper() {
	window.open("https://bing.shangzhenyang.com/api/1080p");
}

window.addEventListener("click", () => {
	document.getElementById("bg-img")?.classList.toggle("blur");
});

window.addEventListener("keydown", (evt) => {
	if ((evt.ctrlKey || evt.metaKey) && evt.key === "s") {
		evt.preventDefault();
		openWallpaper();
	}
});

window.addEventListener("load", () => {
	fetch("https://bing.shangzhenyang.com/api/json")
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(response.statusText);
			}
		})
		.then((data) => {
			if (data) {
				const image = data.images[0];
				const copyright = document.getElementById("copyright");
				if (copyright) {
					copyright.textContent = image.copyright;
				}
			}
		});
});

document.getElementById("footer")?.addEventListener("click", () => {
	openWallpaper();
});
