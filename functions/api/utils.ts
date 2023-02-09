import { BingWallpaperJson } from "./types";

export function encodeData(data: object) {
	const array: string[] = [];
	for (const key in data) {
		const value = data[key as keyof typeof data];
		if (value) {
			array.push(key + "=" + encodeURIComponent(value));
		}
	}
	return array.join("&");
}

export function getBingWallpaperJson(lang: string): Promise<BingWallpaperJson> {
	return new Promise((resolve, reject) => {
		fetch("https://www.bing.com/HPImageArchive.aspx?" + encodeData({
			format: "js",
			mkt: lang,
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

export async function getBingWallpaperUrl(
	langHeader: string | null,
	urlModifier?: (url: string) => string
) {
	try {
		const lang = getLangFromHeader(langHeader);
		const json = await getBingWallpaperJson(lang);
		const hostname = lang === "zh-CN" ? "cn.bing.com" : "www.bing.com";

		let url = "https://" + hostname + json.images[0].url;
		if (urlModifier) {
			url = urlModifier(url);
		}

		const headers = new Headers();
		headers.set("Cache-Control", "max-age=3600");
		headers.set("Location", url);
		headers.set("Vary", "Accept-Language");

		return new Response(null, {
			headers: headers,
			status: 302
		});
	} catch {
		return new Response(null, {
			status: 500
		});
	}
}

export function getLangFromHeader(langHeader: string | null) {
	if (/^(yue|zh)(-cn|-hans(-[a-z]+)?)?/i.test(langHeader)) {
		return "zh-CN";
	} else if (langHeader?.startsWith("zh")) {
		return "zh-TW";
	} else {
		return "en-US";
	}
}
