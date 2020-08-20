// imports 
import { PageRender, retrivedData } from '/js/pageRender.js';

// Data file paths
let TEACHING_JSON = "/data/jsons/teaching.json";

/*
	Single instance class to build teaching.html page with dynamic content from JSONS from the server
*/
class Teaching  extends PageRender
{
	constructor()
	{
		Teaching.loadFileFromServer(TEACHING_JSON);
		this.publicationList = PublicationElement.createFromJson(retrivedData);
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
	
	buildBody(filter = "type")
	{
		// sort the list
		this.publicationList = PublicationElement.sortByProperty(this.publicationList, filter);
		try
		{
			if (this.publicationList.length > 0)
			{
				
			}
			else // 
			{
				
			}
			for (var i = 0; 
			
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

class PublicationElement()
{
	constructor(name, description, fileLink, year, topic, type, publisher)
	{
		this.name = name;
		this.description = description;
		this.fileLink = fileLink;
		this.year = year;
		this.topic = topic;
		this.type = type;
		this.publisher = publisher;
	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		var answer = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj["publications"].length; publicationIndex++)
		{
			var jsonElement = jsonObj["publications"][publicationIndex];
			answer.push(new PublicationElement(jsonElement["name"], jsonElement["description"], jsonElement["fileLink"], jsonElement["year"], jsonElement["topic"], jsonElement["type"], jsonElement["publisher"]));
		}
		return answer;
	}
	
	// sort according to some property list of this object
	static sortByProperty(ObjList, property)
	{
		return ObjList.sort(function(a, b)
		{
			var x = a[property + ""]; 
			var y = b[property + ""];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
}

// run the class build on page load
var teaching = Teaching();
teaching.build();