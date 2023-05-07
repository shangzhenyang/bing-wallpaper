import "./style.css";

function openWallpaper() {
	window.open("https://bing.shangzhenyang.com/api/1080p");
}

window.addEventListener("keydown", (evt) => {
	if ((evt.ctrlKey || evt.metaKey) && evt.key === "s") {
		evt.preventDefault();
		openWallpaper();
	}
});

window.addEventListener("load", async () => {
	const copyright = document.getElementById("copyright");
	if (!copyright) {
		return;
	}
	try {
		const response = await fetch("https://bing.shangzhenyang.com/api/json");
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
