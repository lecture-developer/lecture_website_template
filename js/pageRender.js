// Data file paths
PLACE_HOLDER = "{}"
SEO_JSON = "/data/jsons/seo/[].json"
MAIN_JSON = "/data/jsons/[].json"

class PageRender
{
	constructor()
	{
		
	}
	
	static build()
	{
		throw new NotImplemented("Build");
	}
	
	static guessDataLocation()
	{
		var pageName = location.pathname.split("/").slice(-1)[0];
		if (pageName == "")
		{
			pageName = "index";
		}
		
		return {"seo": SEO_JSON.replace(PLACE_HOLDER, pageName),
				"main": MAIN_JSON.replace(PLACE_HOLDER, pageName)}
	}
}