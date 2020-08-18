// Data file paths
SEO_JSON = "/data/jsons/seo/index.html"
UPDATES_TEXT = "/data/notifications.txt"

// run the class build on page load
Index.build();

class Index extends PageRender
{
	constructor()
	{
		
	}
	
	static build()
	{
		buildSeo();
		buildStracturedData();
		buildeNotifications();
		buildePersonalPanel();
		buildeFeaturedPublications();
		buildeCurrentProjects();
	}
	
	/* build section functions */
	
	static buildSeo()
	{
		
	}
	
	static buildStracturedData()
	{
		
	}
	
	static buildeNotifications()
	{
		
	}
	
	static buildePersonalPanel()
	{
		
	}
	
	static buildeFeaturedPublications()
	{
		
	}
	
	static buildeCurrentProjects()
	{
		
	}
	
	/* end -  build sections functions */
	
	/* GUI functions */
	
	bioReadMore()
	{
		document.getElementById("biography-read-more").style.display = "";
		document.getElementById("biography-read-more-btn").style.display = "none";
		return false;
	}
	
	bioReadLess()
	{
		document.getElementById("biography-read-more").style.display = "none";
		document.getElementById("biography-read-more-btn").style.display = "";
		return false;
	}
	
	/* end - GUI functions */
}