import { Element } from '/lecture_website_template/js/components/element.js';
class ResearchTeamMember extends Element
{
	constructor(name, title, websiteLink, googleLink, linkedinLink)
	{
		super();
		this.name = name;
		this.title = title;
		this.websiteLink = websiteLink;
		this.googleLink = googleLink;
		this.linkedinLink = linkedinLink;
	}
	
	// convert the object into HTML
	toHtml()
	{
		// TODO: finish here later
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var answer = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			answer.push(ResearchTeamMember.createFromJson(jsonObj[publicationIndex]));
		}
		return answer;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{	
		return new ResearchTeamMember(jsonObj["name"],
			jsonObj["title"], 
			jsonObj["websiteLink"], 
			jsonObj["googleLink"], 
			jsonObj["linkedinLink"]);

	}
}
export {ResearchTeamMember};