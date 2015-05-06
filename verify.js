
function verify() {
	document.cookie = document.getElementById("password").value;
}

function myConfirm(){
	if(document.cookie != "tiejun")
		history.back();
}

