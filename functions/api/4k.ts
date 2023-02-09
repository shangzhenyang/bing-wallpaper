import { getBingWallpaperUrl } from "./utils";

export const onRequest: PagesFunction = async (context) => {
	return await getBingWallpaperUrl(
		context.request.headers.get("accept-language"),
		(url) => {
			return url.replace("1920x1080", "UHD");
		}
	);
};
