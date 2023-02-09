import { getBingWallpaperJson } from "./utils";

export const onRequest: PagesFunction = async (context) => {
	const json = await getBingWallpaperJson("en-US");
	return new Response(JSON.stringify(json));
};
