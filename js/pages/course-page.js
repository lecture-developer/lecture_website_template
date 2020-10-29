import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Course } from '/lecture_website_template/js/components/course.js';

// Data file paths
let TEACHING_JSON = "/lecture_website_template/data/jsons/teaching.json";
// consts //
let PRE_COOKIE_KEY = "course_";
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
		this.buildBreadcrumb();
		this.buildHeader();
		this.createSectionData();
		this.createResourceList();
		
		// for the "new" tags, put new cookie with current date so we can check the needed tags next run of the page
		setCookie(PRE_COOKIE_KEY + this.course_code, new Date().toString(), 365);
    }

	buildHeader(){
		this.createDetailsCourse();
	}

    //create html of Breadcrumb
    buildBreadcrumb()
	{
		try
		{
			var html='<ul><li><a href="/">Home</a></li><li><a href="/teaching.html">Courses</a></li><li>' + this.data.name + '</li></ul>';
			document.getElementById("breadcrumb_section").innerHTML = html;	
		}
		catch (error)
		{
			console.log("Error at Course.createSectionData, saying: " + error);
		}
    }
	
	/* helper function */

	createDetailsCourse(){
		try{
			var html='<div class="main-header-page"><h1>' 
			+ this.data.name + '</h1><div class="header-detail"><div class="item-detail"><img class="course-detail-img" src="./img/mdi_school.png"><p>'
			+ this.data.code + '</p></div><div class="item-detail"><img class="course-detail-img" src="./img/mdi_access_time.png"><p>Semester '
			+ this.data.semester + '</p></div><div class="item-detail"><img class="course-detail-img" src="./img/mdi_place.png"><div class=".personal-coloum"><p>'
			+ this.data.university + '</p><p>'
			+ this.data.location_class + '</p></div></div></div></div><div class=".personal-row"><a class="sylabus-link" href='
			+ this.data.syllabus +' ><img class="course-sylabus-img" src="./img/save_alt.png" alt="">Syllabus</a></div>';
			document.getElementById("icons_section").innerHTML = html;	

		}catch(error){
			console.log("Error at Course.BiuldHeader, saying:" + error);
		}
	}


	createTabsSection() {
		
	}

    //create html for the body sections
    createSectionData(title, subTitle, text)
	{
		try
		{
			var html = '<div class="body-section"><h3>'
			+ title + '</h3><hr><h2>'
			+ subTitle + '</h2><p>'
			+ text + '</p><div class="person-row"><span class="main-dot"></span><span class="main-dot"></span><span class="main-dot"></span></div></div>';
			document.getElementById("main-body-page").innerHTML = html;	
		}
		catch (error)
		{
			console.log("Error at Course.createSectionData, saying: " + error);
		}
    }
	
	createResourceList()
	{
		
	}
	
	// help functions //

    // check if we need the new icon or not, if we do - just give the HTML
    _addNewTagIfNeeded(resourceDate){
		if (resourceDate > this.last_visit)
		{
			return '<img src="./img/new-resource.png" class="new-resource-icon" />';
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

// add toggle to the tabs
function onPageLoad() {
	const tabs = document.getElementsByClassName('tab');
	for(let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', function (event) {
			if(!event.target.classList.contains('active-tab')) {
				// get the current active tab
				let currentActive = document.getElementsByClassName('active-tab')[0];

				// toggle the active class of the current active element
				toggleActiveTab(currentActive);

				// toggle the active class of the clicked tab
				toggleActiveTab(event.target);
			}
		});
	}
	// by default toggle the first tab
	toggleActiveTab(tabs[0]);
}

// toggle the activeness of the given item and label
function toggleActiveTab(target) {
	// toggle the active-tab class of the given element 
	target.classList.toggle('active-tab');
	// get the label element of the current active and toggle active-tab-title
	target.getElementsByTagName('label')[0].classList.toggle('active-tab-title');
}

onPageLoad();

export { CoursePage }
