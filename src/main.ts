import "@/style.css";

const API_BASE_URL = "https://bing.shangzhenyang.com/api";

function openWallpaper() {
	window.open(API_BASE_URL + "/1080p");
}

window.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key === "s") {
		event.preventDefault();
		openWallpaper();
	}
});

window.addEventListener("load", async () => {
	const copyright = document.getElementById("copyright");
	if (!copyright) {
		return;
	}
	try {
		const response = await fetch(API_BASE_URL + "/json");
		if (!response.ok) {
			throw new Error(response.status.toString());
		}
		const data = await response.json();
		if (data) {
			const image = data.images[0];
			copyright.textContent = image.copyright;
		}
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			copyright.textContent = `Error: ${error.message}`;
		}
	}
});

document.getElementById("bg-img")?.addEventListener("click", function () {
	this.classList.toggle("blur");
});

document.getElementById("footer")?.addEventListener("click", openWallpaper);
