// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';

// Data file paths
let LECTURER_INFO_JSON = "/lecture_website_template/data/jsons/lecturer.json";
let INDEX_JSON = "/lecture_website_template/data/jsons/index.json";
let SECTIONS = ["biography", "personal", "resources"];

/*
	Single instance class to build about page with dynamic content from JSONS from the server
*/
class About extends PageRender
{
	constructor()
	{
		this.section_open = null;
		this.scrollToSection;
		try
		{
			var getParms = PageRender.readGetPrams();
			this.section_open = getParms.get("section");	
			this.scrollToSection = true;
		}
		catch (error)
		{
			this.section = SECTIONS[0];
			this.scrollToSection = false;
		}
	}

	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		About.buildInfo();
		About.buildBiography();
		About.buildProjects();
		About.buildResources();
		About.updateSection(this.section, this.scrollToSection);
	}
	
	/* build the overall contact info section */
	static buildInfo()
	{
		let container_id = "lecturer_info_container";
		About.loadFileFromServer(LECTURER_INFO_JSON, true);
		const lecturerObj = retrivedData;

		// setting titles
		document.getElementById("lecturer_name").innerHTML = lecturerObj.name;
		document.getElementById("lecturer_position").innerHTML = lecturerObj.position;

		//contacts
		About.buildContact(lecturerObj);
		//locations
		if(lecturerObj.addresses.length != 0)
		{
			About.buildLocations(lecturerObj.addresses);
		}
	}


	/* build contact info section */
	static buildContact(lecturerObj)
	{
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
	static buildLocations(addresses)
	{
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
	
	static buildBiography()
	{
		// TODO: finish here
	}
	
	static buildProjects()
	{
		// TODO: finish here
	}
	
	static buildResources()
	{
		// TODO: finish here
	}
	
	/* show the first page which is open in the section */
	static updateSection(sectionName, scrollToSection)
	{
		// TODO: finish here
	}
}

document.aboutPage = new About();
document.aboutPage.build();
