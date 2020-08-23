// imports 
import { PageRender, retrivedData } from '/js/pageRender.js';

// Data file paths
let TEACHING_JSON = "/data/jsons/academic-publications.json";

/*
	Single instance class to build teaching.html page with dynamic content from JSONS from the server
*/
class AcademicPublications extends PageRender
{
	constructor()
	{
		Teaching.loadFileFromServer(TEACHING_JSON);
		this.publicationList = PublicationCard.createListFromJson(retrivedData);
	}
	
	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		this.buildHeader();
		this.buildBody();
	}
	
	/* build section functions */
	
	buildHeader()
	{
		try
		{
			// build the year filter //
			
			// build the type filter //
			
			// build the topic filter //
			
		}
		catch (error)
		{
			console.log("Error at Teaching.buildHeader saying: " + error);
		}
	}
	
	buildBody(sorter = "type", filter = null)
	{
		// perpare ds //
		// sort the list
		var buildPublicationList = PublicationCard.sortByProperty(this.publicationList, sorter);
		
		// if filter needed
		if (filter != null)
		{
			buildPublicationList = PublicationCard.filterList(buildPublicationList, sorter, filter);
		}
		
		// split into the right sets
		var publicSets = PublicationCard.splitByProperty(buildPublicationList, sorter);
		
		// build the UI //
		try
		{
			if (buildPublicationList.length > 0)
			{
				var ansewrHtml = "";
				for (var spliterKey in publicSets)
				{
					// add spliter 
					ansewrHtml += "<h3>" + spliterKey + "</h3>";
					// add elements inside the list
					for (var elementIndex = 0; elementIndex < publicSets[spliterKey].length; elementIndex++)
					{
						ansewrHtml += publicSets[spliterKey][elementIndex].toHtml();
					}
				}
				document.getElementById("").innerHTML = ansewrHtml;
			}
			else // show error message
			{
				document.getElementById("").innerHTML = "<h3>Error message</h3?";
			}
		}
		catch (error)
		{
			console.log("Error at Teaching.buildBody saying: " + error);
		}
	}
	
	/* end -  build sections functions */
	
	/* filtering and reorder of publication list functions */
	
	/* end - filtering and reorder of publication list functions */
}

// run the class build on page load
var academicPublications = AcademicPublications();
academicPublications.build();