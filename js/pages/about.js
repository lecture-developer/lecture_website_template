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
    // About.buildBiography();
    // About.buildProjects();
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
      elem.innerHTML = Icons.mail() + email;
      contacts.appendChild(elem);
    }

    if(phone != ""){
      let elem = document.createElement("P");
      elem.innerHTML = Icons.phone() + phone;
      contacts.appendChild(elem);
    }

    if(linkedin != ""){
      let linkedinIcon = document.createElement("A");
      linkedinIcon.innerHTML = Icons.linkedin();
      linkedinIcon.href = linkedin;
      contacts.appendChild(linkedinIcon);
    }
    if(google != ""){
      let googleIcon = document.createElement("A");
      googleIcon.innerHTML = Icons.google();
      googleIcon.href = google;
      contacts.appendChild(googleIcon);
    }
  }
  /* build locations info section */
  static buildLocations(addresses){

    //adding headlines
    document.getElementById("org_p").innerHTML = Icons.buildings() + " Organization name";
    document.getElementById("room_p").innerHTML = Icons.location() + " Room Location";
    document.getElementById("hours_p").innerHTML = Icons.clock() + " Office hours";

    for(let i = 0; i< addresses.length; i++){
      let o = document.createElement("P");
      o.innerHTML = addresses[i].university;
      let r = document.createElement("P");
      r.innerHTML = addresses[i].location;
      let h = document.createElement("P");
      h.innerHTML = addresses[i].hours;
      document.getElementById("organization").appendChild(o);
      document.getElementById("room").appendChild(r);
      document.getElementById("hours").appendChild(h);
    }

  }
}

About.build();
