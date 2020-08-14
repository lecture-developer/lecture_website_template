
/* consts */
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");
/* end - consts */

/*** run on page load ***/

/* Event Listeners */
for (let item of items)
{
	if (item.querySelector(".submenu")) 
	{
		item.addEventListener("click", toggleItem, false);
		item.addEventListener("keypress", toggleItem, false);
	}   
}

/*** end - run on page load ***/

 
/* Toggle mobile menu */
function toggleMenu() 
{
    if (menu.classList.contains("active")) 
	{
		menu.classList.remove("active");
        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML = '<i class="fas fa-bars"></i>';
    } 
	else 
	{
        menu.classList.add("active");     
        // adds the close (x) icon
        toggle.querySelector("a").innerHTML = '<i class="fas fa-times"></i>';
    }
}
 
/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}