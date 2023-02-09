import { BingWallpaperJson } from "./types";

function encodeData(data: object) {
	const array: string[] = [];
	for (const key in data) {
		const value = data[key as keyof typeof data];
		if (value) {
			array.push(key + "=" + encodeURIComponent(value));
		}
	}
	return array.join("&");
}

export function getBingWallpaperJson(mkt: string): Promise<BingWallpaperJson> {
	return new Promise((resolve, reject) => {
		fetch("https://www.bing.com/HPImageArchive.aspx?" + encodeData({
			format: "js",
			mkt: mkt,
			n: "1"
		}))
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					reject(response);
				}
			})
			.then(resolve)
			.catch(reject);
	});
}
