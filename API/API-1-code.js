const btn = document.querySelector('.j-btn-test');

const firstIcon = document.getElementById("first-icon");
const secondIcon = document.getElementById("icon-change")

secondIcon.style.display = "none"; 


var isIconChange = false;
btn.addEventListener("click", function() {
    if (isIconChange )
{
isIconChange  = false;
  firstIcon.style.display = "block";
  secondIcon.style.display = "none";
  
}
else
{
isIconChange  = true;
firstIcon.style.display = "none";
secondIcon.style.display = "block";
}
});