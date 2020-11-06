// imports
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { ResearchProject } from '/lecture_website_template/js/components/researchProject.js';
import { Icons } from '/lecture_website_template/js/components/icons.js';
import { Tabs } from '/lecture_website_template/js/components/tabs.js';

// Data file paths
let RESEARCH_JSON = "/lecture_website_template/data/jsons/research.json";
let SECTIONS = ["Ongoing-Projects", "Previous-Projects", "Work-with-me"];

/*
	Single instance class to build about page with dynamic content from JSONS from the server
*/
class Research extends PageRender
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
		
		Research.loadFileFromServer(RESEARCH_JSON, true);
		this.jsonData = retrivedData;
		
		
		// get now date to split ongoing and previous projects
		var nowDate = new Date();
		
		this.ongoingProjects = [];
		this.previousProjects = [];
		for (var index = 0; index < this.jsonData["projects"].length; index++)
		{
			var newProject = ResearchProject.createFromJson(this.jsonData["projects"][index]);
			if (newProject.end_year <= nowDate.getFullYear() && newProject.end_month <= nowDate.getMonth() + 1)
			{
				this.previousProjects.push(newProject);
			}
			else
			{
				this.ongoingProjects.push(newProject);
			}
		}
	}

	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		this.createTabsSection();
		
		// build the tabs' data and open the needed tab according to the link
		let tabsHTML = "";
		tabsHTML += this.buildOngoing();
		tabsHTML += this.buildPrevious();
		tabsHTML += this.buildWorkwithme();
		document.getElementById('main-body-page').innerHTML += tabsHTML;
		
		// open the right tab according to the url
		this.pickTab();

		this._addCollapsonigSections();
	}

	createTabsSection() {
		Tabs.createTabsSection();
		Tabs.addTab('Ongoing Projects');
		Tabs.addTab('Previous Projects');
		Tabs.addTab('Work with me', true);
	}

	buildOngoing()
	{
		let answerHTML = '<div class="body-section">';

		this.ongoingProjects.forEach((research, i) => {
			answerHTML += research.toHtml();

			if(i < this.previousProjects.length - 1) {
				answerHTML += '<div class="section-seperator"><div class="main-dot"></div><div class="main-dot"></div><div class="main-dot"></div></div>';
			}
		});

		answerHTML += '</div>';
		return answerHTML;
	}
	
	buildPrevious()
	{
		let answerHTML = '<div class="body-section">';

		this.previousProjects.forEach((research, i) => {
			answerHTML += research.toHtml();

			if(i < this.previousProjects.length - 1) {
				answerHTML += '<div class="section-seperator"><div class="main-dot"></div><div class="main-dot"></div><div class="main-dot"></div></div>';
			}
		});
		
		answerHTML += '</div>';
		return answerHTML;
	}
	
	buildWorkwithme()
	{
		let answerHTML = '<div class="body-section">';
		
		answerHTML += '</div>';
		return answerHTML;
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

	_addCollapsonigSections() {
		let sections = document.getElementsByClassName("collapsing-section-title");

		for(let i = 0; i < sections.length; i++) {
			sections[i].addEventListener('click', function(event) {
				event.target.parentElement.nextSibling.classList.toggle('open-section');

				sections[i].getElementsByClassName('moreLessButton')[0].classList.toggle('flip180');
			});
		}
	}
}

document.researchPage = new Research();
document.researchPage.build();

export {Research};