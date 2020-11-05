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
		let html = '<div class="member-card">';

		html += '<img class="member-link-icon" src="/lecture_website_template/img/research/person-image.png" alt="personal-image">'

		html += '<div class="member-icons"><a href="' + this.websiteLink + '"><img class="member-link-icon" src="/lecture_website_template/img/research/website.png" alt="personal website"></a>'+
				'<a href="' + this.linkedinLink + '"><img class="member-link-icon" src="/lecture_website_template/img/research/google-scholar.png" alt="googel scholar link"></a>' +
				'<a href="' + this.googleLink + '"><img class="member-link-icon" src="/lecture_website_template/img/research/linkedin.png" alt="linkedin link"><a/></div>';

		html += '</div>';

		return html;
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