import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
// Data file paths
let TAECHING_JSON = "/lecture_website_template/data/jsons/teaching.json";

class CoursePage extends PageRender{
    constructor() 
	{
        super();
        var getParms = PageRender.readGetPrams();
        getParms.get("course")
    }
    
    build(){
        this.createBreadcrumb();
    }

    //create html of Breadcrumb
    createBreadcrumb(){
        //add links!
        var html='<ul><li><a href="#">Home</a></li><li><a href="#">Courses</a></li><li>Name Course</li></ul>';
        document.getElementById("breadcrumb_section").innerHTML = html;
    }
}
// run the class build on page load
document.coursePage = new CoursePage();
document.coursePage.build();

export { CoursePage }
