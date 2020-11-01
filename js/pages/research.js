// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { ResearchProject } from '/lecture_website_template/js/components/researchProject.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';

// Data file paths
let RESEARCH_JSON = "/lecture_website_template/data/jsons/research.json";
let SECTIONS = ["ongoing", "previous", "workwithme"];

/*
	Single instance class to build about page with dynamic content from JSONS from the server
*/
class Research extends PageRender
{
	constructor()
	{
		this.section_open = null;
		this.scrollToSection;
		try
		{
			var getParms = PageRender.readGetPrams();
			this.section_open = getParms.get("section");	
			this.scrollToSection = true;
		}
		catch (error)
		{
			this.section = SECTIONS[0];
			this.scrollToSection = false;
		}
		
		Research.loadFileFromServer(RESEARCH_JSON, true);
		this.jsonData = retrivedData;
		
		
		// get now date to split ongoing and previous projects
		var nowDate = new Date();
		
		this.ongoingProjects = [];
		this.previousProjects = [];
		for (var index = 0; index < this.jsonData["projects"]; index++)
		{
			var newProject = ResearchProject.createFromJson(this.jsonData["projects"][index]);
			if (newProject.end_year <= nowDate.getFullYear() && newProject.end_month <= nowDate..getMonth() + 1)
			{
				this.ongoingProjects.push(newProject);
			}
			else
			{
				this.previousProjects.push(newProject);
			}
		}
	}

	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		Research.buildInfo();
		Research.buildOngoing();
		Research.buildPrevious();
		Research.buildWorkwithme();
		Research.updateSection(this.section, this.scrollToSection);
	}
	
	/* build the overall contact info section */
	buildInfo()
	{
		
		// setting titles
		document.getElementById("lecturer_name").innerHTML = lecturerObj.name;
		document.getElementById("lecturer_position").innerHTML = lecturerObj.position;

		//contacts
		About.buildContact(lecturerObj);
		//locations
		if(lecturerObj.addresses.length != 0)
		{
			About.buildLocations(lecturerObj.addresses);
		}
	}

	
	buildOngoing()
	{
		// TODO: finish here
	}
	
	buildPrevious()
	{
		// TODO: finish here
	}
	
	buildWorkwithme()
	{
		// TODO: finish here
	}
	
	/* show the first page which is open in the section */
	updateSection(sectionName, scrollToSection)
	{
		// TODO: finish here
	}
}


document.researchPage = new Research();
document.researchPage.build();
