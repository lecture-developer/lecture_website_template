import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Course } from '/lecture_website_template/js/components/course.js';
import { Tabs } from '/lecture_website_template/js/components/tabs.js';
import { addCollapseFunction } from '/lecture_website_template/js/descriptionSlicer.js';

// Data file paths
let TEACHING_JSON = "/lecture_website_template/data/jsons/teaching.json";
// consts //
let PRE_COOKIE_KEY = "course_";
let SECTIONS = ["General", "Updates", "Modules"];
// end - consts //

class CoursePage extends PageRender
{
    constructor()
	{
        super();
        // load the data from the JSON file
		CoursePage.loadFileFromServer(TEACHING_JSON, true);

		this.data = null;

		// try to find which course page we got
		this.course_code = null;
		try
		{
			var getParms = PageRender.readGetPrams();
			this.course_code = getParms.get("course_id");
		}
		catch (error)
		{
			// no course ID, we cannot work with this - return to teaching page so the user pick another course page
			this._redirectBack();
			return;
		}

		// find when the user last enter this page for the "new" tags
		this.last_visit = null;
		try
		{
			this.last_visit = new Date(getCookie(PRE_COOKIE_KEY + this.course_code));
		}
		catch (error)
		{
			// no cookie - first time this computer is on this page
			this.last_visit = new Date(2000, 1, 1, 0, 0, 0, 0); // very old data
		}
		
		// check if we wish to open some spesific tab 
		this.section_open = null;
		try
		{
			var getParms = PageRender.readGetPrams();
			this.section_open = getParms.get("section");
			if (this.section_open == null)
			{
				this.section_open = SECTIONS[0];
			}
		}
		catch (error)
		{
			this.section_open = SECTIONS[0];
		}
		
		// remember the full data
		var json_full_data = retrivedData["coureses"];
		var found_course = false;
		for (var course_index = 0; course_index < json_full_data.length; course_index++)
		{
			if (json_full_data[course_index]["code"] == this.course_code)
			{
				this.data = Course.createFromJson(json_full_data[course_index]);
				found_course = true;
				break; // we find, don't run on the following
			}
		}
		if (!found_course) // if no one of the courses is the one we needed - this is an error, go to the teaching page
		{
			this._redirectBack();
		}
		
		// remove alert as they not in use and can make problems
		removeAlertsPanels();
    }

    build(){
		// this.buildBreadcrumb();
		this.createDetailsCourse();

		let course = this.data.toHtml(this.last_visit);
		document.getElementById('main-body-page').innerHTML = course;

		this.createTabsSection();
		this.pickTab();

		addCollapseFunction();
		
		// for the "new" tags, put new cookie with current date so we can check the needed tags next run of the page
		setCookie(PRE_COOKIE_KEY + this.course_code, new Date().toString(), 365);
    }

    //create html of Breadcrumb
    buildBreadcrumb()
	{
		try
		{
			var html='<ul><li><a href="/lecture_website_template/">Home</a></li><li><a href="/lecture_website_template/teaching.html">Courses</a></li><li>' + this.data.name + '</li></ul>';
			document.getElementById("breadcrumb_section").innerHTML = html;
		}
		catch (error)
		{
			console.log("Error at Course.createSectionData, saying: " + error);
		}
    }

	/* helper function */

	createDetailsCourse() {
		try{
			var html='<div class="main-header-page"><h1>'
			+ this.data.name + '</h1><div class="header-detail"><div class="item-detail"><img class="course-detail-img" src="/lecture_website_template/img/mdi_school.png"><p>'
			+ this.data.code + '</p></div><div class="item-detail"><img class="course-detail-img" src="/lecture_website_template/img/mdi_access_time.png"><p>Semester '
			+ this.data.semester + '</p></div><div class="item-detail"><img class="course-detail-img" src="/lecture_website_template/img/mdi_place.png"><div class=".personal-coloum"><p>'
			+ this.data.university + '</p><p>'
			+ this.data.location_class + '</p></div></div></div></div><div class="personal-row"><a class="sylabus-link" href='
			+ this.data.syllabus +' ><img class="course-sylabus-img" src="/lecture_website_template/img/save_alt.png" alt="">Syllabus</a></div>';
			document.getElementById("icons_section").innerHTML = html;

		}catch(error){
			console.log("Error at Course.BuildHeader, saying:" + error);
		}
	}

	createTabsSection() {
		Tabs.createTabsSection();
		Tabs.addTab('general');
		Tabs.addTab('updates', false ,this._pick_flag());
		Tabs.addTab('modules', true);
		
	}
	
	pickTab()
	{
		for (var sectionIndex = 0; sectionIndex < SECTIONS.length; sectionIndex++)
		{
			if (this.section_open == SECTIONS[sectionIndex])
			{
				Tabs.activateDefault(sectionIndex);
				return;
			}
		}
		Tabs.activateDefault(0); // default case;
	}
	
	// help functions //

	// pick the needed flag icon
	_pick_flag()
	{
		if (this.data.newCounter == 0)
		{

		}
		else if (this.data.newCounter < 10)
		{
			return "/lecture_website_template/img/flags/flag" +  this.data.newCounter + ".png";
		}
		else
		{
			return "/lecture_website_template/img/flags/flag+.png";
		}
	}

    // check if we need the new icon or not, if we do - just give the HTML
    _addNewTagIfNeeded(resourceDate)
	{
		if (resourceDate > this.last_visit)
		{
			return '<img src="./img/new-resource.png" class="new-resource-icon" />';
		}
		return ""; // if we don't need to - just return empty string into the html
    }

    // redicrect to the teaching page
    _redirectBack()
	{
		window.location.replace(window.location.hostname + "/teaching.html");
	}

	// end - help functions //
}

// run the class build on page load
document.coursePage = new CoursePage();
document.coursePage.build();

export { CoursePage }