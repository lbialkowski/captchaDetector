import * as values from "./values.js";
let port: chrome.runtime.Port;
let startedScript = false;

document.addEventListener('DOMContentLoaded', () => {	
	
	port = chrome.runtime.connect({
		name: "Sample Communication"
	});

	readScriptStateFromBackground();
	
	const toggleBtnScript = document.getElementById('toggleBtnScript');
	toggleBtnScript.addEventListener("click", toggleScript , false );
  
});

function readScriptStateFromBackground() {
	port.onMessage.addListener(function(msg) {
		if(msg === values.MSG_SCRIPT_ENABLED) {
			enableScript()
		}
		if(msg === values.MSG_SCRIPT_DISABLED)
			disableScript()
	});
}

function toggleScript() {
	if(startedScript) {
		disableScript();
		port.postMessage(values.MSG_SCRIPT_DISABLED);
	}
	else {
		enableScript();
		port.postMessage(values.MSG_SCRIPT_ENABLED);
	}
}

function enableScript() {
	document.getElementById("toggleBtnScript").classList.add("btn-warning");
	document.getElementById("toggleBtnScript").classList.remove("btn-success");
	document.getElementById("toggleBtnScript").innerHTML = "Disable bot";
	startedScript = true;
}

function disableScript() {
	document.getElementById("toggleBtnScript").classList.add("btn-success");
	document.getElementById("toggleBtnScript").classList.remove("btn-warning");
	document.getElementById("toggleBtnScript").innerHTML = "Enable bot";
	startedScript = false;
}