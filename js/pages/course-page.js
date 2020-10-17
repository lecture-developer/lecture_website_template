import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Course } from '/lecture_website_template/js/components/course.js';

// Data file paths
let TAECHING_JSON = "/lecture_website_template/data/jsons/teaching.json";
// consts //
let PRE_COOKIE_KEY = "course_";
// end - consts //

class CoursePage extends PageRender
{
    constructor() 
	{
        super();
        // load the data from the JSON file
		CoursePage.loadFileFromServer(TAECHING_JSON, true);
		
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
			this.last_visit = new Date(new getCookie(PRE_COOKIE_KEY + this.course_code));
		}
		catch (error)
		{
			// no cookie - first time this computer is on this page
			this.last_visit = new Date(2000, 1, 1, 0, 0, 0, 0); // very old data
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
    }
    
    build(){
        this.createBreadcrumb();
		this.createSectionData();
		this.createResourceList();
		
		// for the "new" tags, put new cookie with current date so we can check the needed tags next run of the page
		setCookie(PRE_COOKIE_KEY + this.course_code, new Date().toString(), 365);
    }

    //create html of Breadcrumb
    createBreadcrumb()
	{
        var html='<ul><li><a href="/">Home</a></li><li><a href="/teaching.html">Courses</a></li><li>' + this.data.name + '</li></ul>';
        document.getElementById("breadcrumb_section").innerHTML = html;
    }
    
    //create html for the body sections
    createSectionData(title, subTitle, text)
	{
        var html = '<div class="main-body-page"><h3>'
        + title + '</h3><hr><h2>'
        + subTitle + '</h2><p>'
        + text + '</p><div class="person-row"><span class="main-dot"></span><span class="main-dot"></span><span class="main-dot"></span></div></div>';
        document.getElementById("body-section").innerHTML = html;
    }
	
	createResourceList()
	{
		
	}
	
	// help functions //
	
	createResourceList()
	{
		
	}
    
    // check if we need the new icon or not, if we do - just give the HTML
    _addNewTagIfNeeded(resourceDate){
		if (resourceDate > this.last_visit)
		{
			return '<img src="/img/new-resource.png" class="new-resource-icon" />';
		}
		return ""; // if we don't need to - just return empty string into the html 
    }
    
    // redicrect to the teaching page
    _redirectBack(){
		window.location.replace(window.location.hostname + "/teaching.html");
    }
	
	// end - help functions //

}
// run the class build on page load
document.coursePage = new CoursePage();
document.coursePage.build();

export { CoursePage }
