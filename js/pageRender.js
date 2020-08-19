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
	
	static loadFileFromServer(filePath)
	{	
		client.onreadystatechange  = function(){
			if (this.readyState == 4 && this.status == 200 && this.responseText != null)
			{
				return this.responseText;
			}
			else
			{
				console.debug("Error at loading file " + filePath + " from server");
			}
		};
		client.open("GET", filePath, false);
		client.send();
	}
}