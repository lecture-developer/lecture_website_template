// Data file paths
let PLACE_HOLDER = "{}";
let SEO_JSON = "/data/jsons/seo/[].json";
let MAIN_JSON = "/data/jsons/[].json";

// globals //
let retrivedData = null;
let pageRenderClient;
// code for IE7+, Firefox, Chrome, Opera, Safari
if (window.XMLHttpRequest)
{
	pageRenderClient = new XMLHttpRequest();
}
else // code for IE6, IE5
{
	pageRenderClient = new ActiveXObject("Microsoft.XMLHTTP");
}

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
	
	static loadFileFromServer(filePath, is_json = false)
	{	
		try
		{
			pageRenderClient.open("GET", filePath, false);
			pageRenderClient.onreadystatechange = function(e)
			{
				if (this.readyState == 4 && this.status == 200 && (this.responseText != null || this.response != null))
				{
					if (is_json)
					{
						retrivedData = JSON.parse(this.response);
					}
					else
					{
						retrivedData = this.responseText;	
					}
				}
				else
				{
					console.log("Error at loading file " + filePath + " from server");
					retrivedData = null;
				}
			};
			pageRenderClient.send();
		}
		catch (error)
		{
			console.log("Error at PageRender.loadFileFromServer saying: " + error);
			return null;
		}
	}
}

export {PageRender, retrivedData };