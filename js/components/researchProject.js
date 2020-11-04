import { Element } from '/lecture_website_template/js/components/element.js';
import { ResearchTeamMember } from '/lecture_website_template/js/components/researchTeamMember.js';
import { CourseResource } from '/lecture_website_template/js/components/courseResource.js';

class ResearchProject extends Element
{
	constructor(name, participents, description, start_month, start_year, end_month, end_year, team_members, relevant_resources)
	{
		super();
		this.name = name;
		this.participents = participents;
		this.start_month = start_month;
		this.start_year = start_year;
		this.end_month = end_month;
		this.end_year = end_year;
		this.team_members = team_members;
		this.relevant_resources = relevant_resources;
	}
	
	// convert the object into HTML
	toHtml()
	{
		// TODO: finish here later
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			ResearchProject.push(Course.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{	
		return new ResearchProject(jsonObj["name"],
			ResearchTeamMember.createListFromJson(jsonObj["participents"]),
			jsonObj["participents"], 
			jsonObj["start_month"], 
			jsonObj["start_year"], 
			jsonObj["end_month"],
			jsonObj["end_year"],
			CourseResource.createListFromJson(jsonObj["relevant_resources"]));

	}
}
export {ResearchProject};