
var port: chrome.runtime.Port;
var startedScript = false;


function enableScript() {
	
	document.getElementById("toggleBtnScript").classList.add("btn-warning");
	document.getElementById("toggleBtnScript").classList.remove("btn-success");
	document.getElementById("toggleBtnScript").innerHTML = "Disable bot";
	port.postMessage("EnableScript");
	
}

function disableScript() {
	
	document.getElementById("toggleBtnScript").classList.add("btn-success");
	document.getElementById("toggleBtnScript").classList.remove("btn-warning");
	document.getElementById("toggleBtnScript").innerHTML = "Enable bot";
	port.postMessage("DisableScript");
	
}

function getSavedInfo(msg: string) {
	
	// var index = msg.indexOf(" ");
	// var id = msg.substr(0, index);
	// var text = msg.substr(index + 1);
		
	if(msg == "ScriptEnabled") {
		startedScript = true;
		document.getElementById("toggleBtnScript").classList.add("btn-warning");
		document.getElementById("toggleBtnScript").classList.remove("btn-success");
		document.getElementById("toggleBtnScript").innerHTML = "Disable bot";
	}
	
	if(msg == "ScriptDisabled")
		startedScript = false;
}

function toggleScript() {
	
	if(startedScript)
		disableScript();
	else
		enableScript();
	
	startedScript = !startedScript;
	
}


document.addEventListener('DOMContentLoaded', () => {	
	
	port = chrome.runtime.connect({
		name: "Sample Communication"
	});
	
	port.onMessage.addListener(function(msg) {
		getSavedInfo(msg);
	});
	
	var toggleBtnScript = document.getElementById('toggleBtnScript');
	toggleBtnScript.addEventListener("click", toggleScript , false );
  
});

