// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';

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
		// build topics navigation bar
		let topics = new Set();
		for(let i = 0; i < projects.length; i++){
			topics.add(projects[i].topic);
		}
		let topics_list = document.getElementById("topics_list");
		const topicIter = topics.values();
		for(let i = 0; i < topics.size; i++){
			let t = document.createElement("LI");
			t.innerHTML = topicIter.next().value;
			if(i == 0){
				t.classList.add("active-topic");
			}
			topics_list.appendChild(t);
		}
	}
}

About.build();

function createTabsSection() {
	try{
		var html='<div id="tabs-bar" class="tabs-bar">' +
					'<div class="general-bar tab">'+
						'<label class="tab-title">Biography</label>'+
						'<div class="tab-seperator"></div>'+
					'</div>'+

					'<div class="updates-bar tab">'+
						'<label class="tab-title">Personal projects</label>'+
						'<div class="tab-seperator"></div>'+
					'</div>'+

					'<div class="modules-bar tab">'+
						'<label class="tab-title">Recommended resources</label>'+
					'</div>'+
				'</div>'
		document.getElementById("tabs").innerHTML = html;
	}catch(error){
		console.log("Error at Course.createTabsSection, saying:" + error);
	}
}

//toggle
function onPageLoad() {
	const tabs = document.getElementsByClassName('tab');
	for(let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', function (event) {
			if(!event.target.classList.contains('active-tab')) {
				// get the current active tab
				let currentActive = document.getElementsByClassName('active-tab')[0];

				// toggle the active class of the current active element
				toggleActiveTab(currentActive);

				// get the index of the current tab (=content)
				let currIndex = Array.from(currentActive.parentNode.children).indexOf(currentActive);
				// toggleContentDisplay(currIndex);

				// toggle the active class of the clicked tab
				toggleActiveTab(event.target);
				// get the index of the new tab (=content)
				let newIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
				// toggleContentDisplay(newIndex);
			}
		});
	}
	// by default toggle the first tab
	toggleActiveTab(tabs[0]);
	// toggleContentDisplay(0);
}


// toggle the activeness of the given item and label
function toggleActiveTab(target) {
	// toggle the active-tab class of the given element
	target.classList.toggle('active-tab');
	// get the label element of the current active and toggle active-tab-title
	target.getElementsByTagName('label')[0].classList.toggle('active-tab-title');
}

// toggle the current content display
// function toggleContentDisplay(index) {
// 	document.getElementsByClassName('body-section')[index].classList.toggle('active-section');
// }

createTabsSection();
onPageLoad();
