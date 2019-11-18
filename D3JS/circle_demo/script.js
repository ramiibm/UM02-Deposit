function wave() {
	var element = document.getElementById("leftarm").setAttribute("y1", 165);
	var element = document.getElementById("rightarm").setAttribute("y2", 165);
	element.classList.toggle("mystyle");
}

function normal() {
	var element = document.getElementById("leftarm").setAttribute("y1", 180);
	var element = document.getElementById("rightarm").setAttribute("y2", 180);	
}