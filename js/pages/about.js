// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';
import { Tabs } from '/lecture_website_template/js/components/tabs.js';
import { ProjectSection } from '/lecture_website_template/js/components/projectSection.js';

// Data file paths
let LECTURER_INFO_JSON = "/lecture_website_template/data/jsons/lecturer.json";
let INDEX_JSON = "/lecture_website_template/data/jsons/index.json";

/*
	Single instance class to build about page with dynamic content from JSONS from the server
*/
class About extends PageRender
{
	constructor()
	{

	}

	// just gather all the build of all the sections in the page - one per call to the server side
	static build()
	{
		About.buildInfo();

		About.loadFileFromServer(INDEX_JSON, true);
		const lecturerObj = retrivedData;

    About.buildBiography(lecturerObj);
    About.buildProjects(lecturerObj);
    // About.buildResources();
	}

  static buildInfo(){
    let container_id = "lecturer_info_container";
    About.loadFileFromServer(LECTURER_INFO_JSON, true);
    const lecturerObj = retrivedData;

    // setting titles
    document.getElementById("lecturer_name").innerHTML = lecturerObj.name;
    document.getElementById("lecturer_position").innerHTML = lecturerObj.position;

    //contacts
    About.buildContact(lecturerObj);
    //locations
    if(lecturerObj.addresses.length != 0){
      About.buildLocations(lecturerObj.addresses);
    }

  }


  /* build contact info section */
  static buildContact(lecturerObj){

    let email = lecturerObj.email;
    let phone = lecturerObj.phone;
    let linkedin = lecturerObj.linkedin_link;
    let google = lecturerObj.google_scholar_link;

    let contacts = document.getElementById("contacts");

    if(email != ""){
      let elem = document.createElement("P");
      elem.innerHTML = Icons.mail() + " " + email;
      contacts.appendChild(elem);
    }

    if(phone != ""){
      let elem = document.createElement("P");
      elem.innerHTML = Icons.phone() + " " +  phone;
      contacts.appendChild(elem);
    }

    if(linkedin != ""){
      let linkedinIcon = document.createElement("A");
      linkedinIcon.innerHTML = Icons.linkedin();
	  linkedinIcon.classList.add("social-icon");
      linkedinIcon.href = linkedin;
      contacts.appendChild(linkedinIcon);
    }
    if(google != ""){
      let googleIcon = document.createElement("A");
      googleIcon.innerHTML = Icons.google();
	  googleIcon.classList.add("social-icon");
      googleIcon.href = google;
      contacts.appendChild(googleIcon);
    }
  }
  /* build locations info section */
  static buildLocations(addresses){

    //adding headlines
    document.getElementById("organization").innerHTML = Icons.buildings() + " Organization name";
    document.getElementById("room").innerHTML = Icons.location() + " Room Location";
    document.getElementById("hours").innerHTML = Icons.clock() + " Office hours";

	var info_table = document.getElementById("info-table");

    for(let i = 0; i< addresses.length; i++)
	{
		var row = info_table.insertRow(-1);
		var cell_university = row.insertCell(0);
		cell_university.innerHTML = addresses[i].university;
		var cell_location = row.insertCell(1);
		cell_location.innerHTML = addresses[i].location;
		var cell_hours = row.insertCell(2);
		cell_hours.innerHTML = addresses[i].hours;
    }

  }

	static buildBiography(lecturerObj){
		document.getElementById("bio_text").innerHTML = lecturerObj["biography"];
	}

	static buildProjects(lecturerObj){
		let projects = lecturerObj["currentProjects"];
		let topics = About.buildTopicNav(projects);
		let projectsList = ProjectSection.createListFromJson(projects);
		let panels;
		for(let i = 0; i < projectsList.length; i++){
			panels += '<div class="projects-panel">' + projectsList[i].toHtml() + '</div>';
		}
		document.getElementById("projects_cards").innerHTML = panels;
	}

	static buildTopicNav(projects){
		// build topics navigation bar
		let topics = new Set();
		for(let i = 0; i < projects.length; i++){
			topics.add(projects[i].topic);
		}
		if(topics.size == 1){
			return;
		}
		let topics_list = document.getElementById("topics_list");
		let topicArr = [];
		const topicIter = topics.values();
		for(let i = 0; i < topics.size; i++){
			let t = document.createElement("LI");
			let text = topicIter.next().value;
			t.innerHTML = text;
			if(i == 0){
				t.classList.add("active-topic");
			}
			topics_list.appendChild(t);
			topicArr.push(text);
		}
		return topicArr;
	}

}

About.build();

function createTabsSection() {
	Tabs.createTabsSection();
	Tabs.addTab('Biography');
	Tabs.addTab('Personal projects');
	Tabs.addTab('Recommended resources', true);
}
createTabsSection();

// add toggle to the tabs
function onPageLoad() {
	Tabs.activateDefault(0);
}


onPageLoad();
