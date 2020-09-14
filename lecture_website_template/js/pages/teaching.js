// imports 
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { projectPanel } from '/lecture_website_template/js/components/projectPanel.js';

// Data file paths
let PUBLICATIONS_JSON = "/lecture_website_template/data/jsons/teaching.json";

// consts 
let default_filter = "all";

/*
	Single instance class to build teaching.html page with dynamic content from JSONS from the server
*/
class Teaching extends PageRender
{
	constructor()
	{
		super();
		Teaching.loadFileFromServer(PUBLICATIONS_JSON, true);
		this.projectList = projectPanel.createListFromJson(retrivedData["projects"]);
	}
	
	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		// get the data from the GET HTTP from the URL and build the page
		var getParms = PageRender.readGetPrams();
		var sorter;
		if (getParms.get("sort") != null)
		{
			this.sorter = getParms.get("sort");
		}
		else
		{
			this.sorter = default_sorter;
			console.log("AcademicPublications.build did not find sorter, using default");
		}
		
		var filter;
		if (getParms.get("filter") != null)
		{
			filter = getParms.get("filter");
		}
		else
		{
			filter = default_filter;
			console.log("AcademicPublications.build did not find filter, using default");
		}
		
		// build the page itself
		this.buildHeader(this.sorter, filter);
		this.buildBody(this.sorter, filter);
	}