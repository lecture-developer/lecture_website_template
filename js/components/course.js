import { Element } from '/lecture_website_template/js/components/element.js';
import { CourseResource } from '/lecture_website_template/js/components/courseResource.js';
import { CourseUpdate } from '/lecture_website_template/js/components/courseUpdate.js';
import { CourseModule } from '/lecture_website_template/js/components/courseModule.js';

class Course extends Element
{
	constructor(name, description, code, year, semester, university, department, location_class, syllabus, grade_parts, resources, updates, modules)
	{
		super();
		this.name = name;
		this.description = description;
		this.code = code;
		this.year = year;
		this.semester = semester;
		this.university = university;
		this.department = department;
		this.location_class = location_class;
		this.syllabus = syllabus;
		this.grade_parts = grade_parts;
		this.resources = resources;
		this.updates = updates;
		this.modules = modules;
	}
	
	// convert the object into HTML
	toHtml()
	{
		let html = '';

		html += this.createGeneralData();
		html += this.createUpdateData();

		return html;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listStudent.push(Course.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{	
		return new Course(jsonObj["name"],
			jsonObj["description"], 
			jsonObj["code"], 
			jsonObj["year"], 
			jsonObj["semester"],
			jsonObj["university"],
			jsonObj["department"],
			jsonObj["location_class"],
			jsonObj["syllabus"],
			jsonObj["grade_parts"],
			CourseResource.createListFromJson(jsonObj["resources"]),
			CourseUpdate.createListFromJson(jsonObj["updates"]),
			CourseModule.createListFromJson(jsonObj["modules"]));

	}

    //create html for the general section
    createGeneralData()
	{
		try
		{
			let html = '<div class="body-section">';
			html += this.createSummary();
			html += this.createResourceList();
			html += "</div>";

			return html;
		}
		catch (error)
		{
			console.log("Error at Course.createSectionData, saying: " + error);
		}
	}
	
	// summary section inside the general tab of the course
	createSummary() {
		let text = this.description;
		let grades = this.grade_parts;
		let html = '<div class="summary-section"><h3 class="content-title">'
		+ "Summary" + '</h3><hr class="blue-hr"><h2 class="content-subtitle">Final grade: ';

		let subTitle = '';
		for(let i = 0; i < grades.length; i++) {
			subTitle += grades[i]['name'] + " ";
			if(i == grades.length - 1) {
				subTitle += grades[i]["percent"] + "%";
			} else {
				subTitle += grades[i]['percent'] + "%, ";
			}
		}
		html += subTitle + '</h2><p class="content-text">' + text + '</p><div class="section-seperator"><div class="main-dot"></div><div class="main-dot"></div><div class="main-dot"></div></div></div>';
		return html;
	}
	
	// resources section inside the general tab of the course
	createResourceList()
	{
		let html = '<div class="resources-section"><h3 class="content-title">Resources</h3><hr class="blue-hr">';

		this.resources.forEach(resource => {
			html += CourseResource.createFromJson(resource).toHtml();
		});

		html += '</div>';

		return html;
	}

	// update section inside the updates tab of the course
	createUpdateData() {
		try
		{
			let html = '<div class="body-section">';
			
			for(let i = 0; i < this.updates.length; i++) {
				html += this.updates[i].toHtml();

				if(i != this.updates.length - 1) {
					html += '<div class="section-seperator"><div class="main-dot"></div><div class="main-dot"></div><div class="main-dot"></div></div>';
				}
			}

			html += "</div>";

			return html;
		}
		catch (error)
		{
			console.log("Error at Course.createUpdateData, saying: " + error);
		}
	}

	// module section inside the modules tab of the course
	createModuleData() {
		try
		{
			let html = '<div class="body-section">';
			
			for(let i = 0; i < this.updates.length; i++) {
				html += this.modules[i].toHtml();

				if(i != this.modules.length - 1) {
					html += '<div class="section-seperator"><div class="main-dot"></div><div class="main-dot"></div><div class="main-dot"></div></div>';
				}
			}

			html += "</div>";

			return html;
		}
		catch (error)
		{
			console.log("Error at Course.createModuleData, saying: " + error);
		}
	}

	static descriptionTrim(desc) {
		if(desc.length > 200) {
			return desc.slice(0, 200) + '... <a href="' + this.link + '" class="resource-link"> Read more </a>';
		}

		return desc;
	}
}
export {Course};