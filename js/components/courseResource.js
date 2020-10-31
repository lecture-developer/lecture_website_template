import { Element } from '/lecture_website_template/js/components/element.js';

class CourseResource extends Element
{
	constructor(name, link, description, is_requried)
	{
		super();
		this.name = name;
		this.link = link;
		this.description = description;
		this.is_requried = is_requried;
	}
	
	// convert the object into HTML
	toHtml()
	{
		let required = this.is_requried ? 'Required' : 'Optinal'; 
		let html = '<div class="resource"><ul class="resource-list"><li class="content-subtitle"><h5 class="resource-list-item-title">' + required +
				 '</h5><div class="resource-content"><a href="'+ this.link + '" class="resource-link"><img src="./img/mdi_insert_drive_file.png" class="resource-img"/>'
				  + this.name + '</a><p class="resource-description">' + this._descriptionTrim(this.description) + '</p></div></li></ul></div>';

		return html;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listStudent.push(CourseResource.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{

		return new CourseResource(jsonObj["name"],
		jsonObj["link"], 
		jsonObj["description"], 
        jsonObj["is_requried"]);

	}

	_descriptionTrim(desc) {
		if(desc.length > 200) {
			return desc.slice(0, 200) + '... <a href="' + this.link + '" class="resource-link"> Read more </a>';
		}

		return desc;
	}
}
export {CourseResource};