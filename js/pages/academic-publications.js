// imports 
import { PageRender, retrivedData } from '/js/pageRender.js';

// Data file paths
let TEACHING_JSON = "/data/jsons/academic-publications.json";

/*
	Single instance class to build teaching.html page with dynamic content from JSONS from the server
*/
class AcademicPublications  extends PageRender
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
		// perpare ds //
		// sort the list
		this.publicationList = PublicationElement.sortByProperty(this.publicationList, filter);
		
		// split into the right sets
		var publicSets = PublicationElement.splitByProperty(this.publicationList, filter);
		
		// build the UI //
		try
		{
			if (this.publicationList.length > 0)
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

class PublicationElement()
{
	constructor(name, authors, description, fileLink, year, topic, type, publisher)
	{
		this.name = name;
		this.authors = authors;
		this.description = description;
		this.fileLink = fileLink;
		this.year = year;
		this.topic = topic;
		this.type = type;
		this.publisher = publisher;
	}
	
	// convert the object into HTML
	toHtml()
	{
		var answer = '<div class="academic-papers-panel"><h3>' 
		+ this.name + '</h3><p>'
		+ this.description + '</p><ul><li>' 
		+ this.authors + '</li><li>' 
		+ this.publisher + '</li><li>' 
		+ this.year + '</li><li>'
		+ this.type + '</li></ul><div class="space-between"><a class="download-btn" href="' 
		+ this.link + '">Download Work</a><a class="cite-btn" onclick="'
		+ this.name + '">Cite this publication</a></div></div>';
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
	
	// split list into list of lists according to some property
	static splitByProperty(ObjList, property)
	{
		var answer = {};
		var spliter = ObjList[0][property + ""];
		var subGroup = [ObjList[0]];
		for (var publicationIndex = 1; publicationIndex < ObjList.length; publicationIndex++)
		{
			if (ObjList[publicationIndex][property + ""] != spliter)
			{
				answer[spliter] = [...subGroup];
				spliter = ObjList[publicationIndex][property + ""];
				subGroup = [ObjList[publicationIndex]];
			}
			else
			{
				subGroup.push(ObjList[0]);
			}
		}
		answer[spliter] = [...subGroup];
		return answer;
	}
}

// run the class build on page load
var academicPublications = AcademicPublications();
academicPublications.build();