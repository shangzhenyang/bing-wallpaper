import "./style.css";

window.addEventListener("load", () => {
	fetch("/api/json")
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
				const footer = document.getElementById("footer");
				if (footer) {
					footer.textContent = image.copyright;
				}
			}
		});
});
