// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';
import { Tabs } from '/lecture_website_template/js/components/tabs.js';
import { ProjectSection } from '/lecture_website_template/js/components/projectSection.js';

// Data file paths
let LECTURER_INFO_JSON = "/lecture_website_template/data/jsons/lecturer.json";
let INDEX_JSON = "/lecture_website_template/data/jsons/index.json";
let SECTIONS = ["Biography", "Personal-projects", "Recommended-resources"];

/*
	Single instance class to build about page with dynamic content from JSONS from the server
*/
class About extends PageRender
{
	constructor()
	{
		super();
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
	}

	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		About.loadFileFromServer(INDEX_JSON, true);
		const lecturerObj = retrivedData;
		
		// build tabs' content
		this.buildBiography(lecturerObj);
		this.buildProjects(lecturerObj);
		
		// create the tabs flow themself
		this.createTabsSection();
		
		// build the info on the top of the page
		this.buildInfo();
		
		// pick the right tab according to the link
		this.pickTab();
	}
	
	createTabsSection() 
	{
		Tabs.createTabsSection();
		Tabs.addTab('Biography');
		Tabs.addTab('Personal projects');
		Tabs.addTab('Recommended resources', true);
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
	
	/* build the overall contact info section */
	buildInfo()
	{
		let container_id = "lecturer_info_container";
		About.loadFileFromServer(LECTURER_INFO_JSON, true);
		const lecturerObj = retrivedData;

		// setting titles
		document.getElementById("lecturer_name").innerHTML = lecturerObj.name;
		document.getElementById("lecturer_position").innerHTML = lecturerObj.position;

		//contacts
		this.buildContact(lecturerObj);
		//locations
		if(lecturerObj.addresses.length != 0)
		{
			this.buildLocations(lecturerObj.addresses);
		}
		//adding headlines
		document.getElementById("organization").innerHTML = Icons.buildings() + " Organization name";
		document.getElementById("room").innerHTML = Icons.location() + " Room Location";
		document.getElementById("hours").innerHTML = Icons.clock() + " Office hours";

		var info_table = document.getElementById("info-table");

		for(let i = 0; i < lecturerObj.addresses.length; i++)
		{
			var row = info_table.insertRow(-1);
			var cell_university = row.insertCell(0);
			cell_university.innerHTML = lecturerObj.addresses[i].university;
			var cell_location = row.insertCell(1);
			cell_location.innerHTML = lecturerObj.addresses[i].location;
			var cell_hours = row.insertCell(2);
			cell_hours.innerHTML = lecturerObj.addresses[i].hours;
		}

	}

	buildBiography(lecturerObj)
	{
		document.getElementById("bio_text").innerHTML = lecturerObj["biography"];
	}

	buildProjects(lecturerObj, topic, change = false)
	{
		let projects = lecturerObj["currentProjects"];
		if(!change)
		{
			let topics = this.buildTopicNav(lecturerObj, projects);
			if(topics != null)
			{
				document.getElementById("topics_list").firstChild.classList.add("active-topic");
				this.dynamicBuildProjects(projects, topics[0]);
			}
			else
			{
				let projectsList = ProjectSection.createListFromJson(projects);
				let panels ="";
				for(let i = 0; i < projectsList.length; i++)
				{
					panels += '<div class="projects-panel">' + projectsList[i].toHtml() + '</div>';
				}
				document.getElementById("projects_cards").innerHTML = panels;
			}
		}
		else
		{
			this.dynamicBuildProjects(projects, topic);
		}
	}

	dynamicBuildProjects(projects, topic)
	{
		let projectsList = ProjectSection.filterList(projects, "topic", topic);
		projectsList = ProjectSection.createListFromJson(projectsList);
		let panels ="";
		for(let i = 0; i < projectsList.length; i++){
			panels += '<div class="projects-panel">' + projectsList[i].toHtml() + '</div>';
		}
		document.getElementById("projects_cards").innerHTML = panels;
	}

	buildTopicNav(lecturerObj, projects)
	{
		// build topics navigation bar
		let topics = new Set();
		for(let i = 0; i < projects.length; i++){
			topics.add(projects[i].topic);
		}
		if(topics.size == 1){
			document.getElementById("topics").style.display = "none";
			return null;
		}
		let topics_list = document.getElementById("topics_list");
		let topicArr = [];
		const topicIter = topics.values();
		for(let i = 0; i < topics.size; i++){
			let t = document.createElement("LI");
			t.classList.add("topic");
			let text = topicIter.next().value;
			t.addEventListener("click", () => {
				let allTopics = document.getElementsByClassName("topic");
				for(let i = 0; i < allTopics.length; i++){
					allTopics[i].classList.remove("active-topic");
				}
				t.classList.add("active-topic");
				About.buildProjects(lecturerObj, text, true)
			});
			t.innerHTML = text;
			topics_list.appendChild(t);
			topicArr.push(text);
		}
		return topicArr;
	}

	/* build contact info section */
	buildContact(lecturerObj)
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
	buildLocations(addresses)
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
}

document.aboutPage = new About();
document.aboutPage.build();

export {About};
