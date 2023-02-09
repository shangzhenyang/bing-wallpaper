import { getBingWallpaperUrl } from "./utils";

export const onRequest: PagesFunction = async (context) => {
	return await getBingWallpaperUrl(
		context.request.headers.get("accept-language")
	);
};
