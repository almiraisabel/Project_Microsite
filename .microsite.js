// launch data from api.spacexdata.com

let currentMissionJSON;
let requestOne = new XMLHttpRequest();
requestOne.open('GET', 'https://api.spacexdata.com/v2/launches/next', true);
requestOne.onload = function () {


let data = JSON.parse(this.response);

currentMissionJSON = data;

if (requestOne.status >= 200 && requestOne.status < 400) {

        console.log(currentMissionJSON);

	  updateCurrentMissionLaunch();  
  } else {
    alert("failed to load json");
  }
}

requestOne.send();


//from api.spacexdata.com

let pastMissionJSON;
let requestTwo = new XMLHttpRequest();

requestTwo.open('GET', 'https://api.spacexdata.com/v2/launches', true);
requestTwo.onload = function () {



 //JSON data here

  let data = JSON.parse(this.response);

  pastMissionJSON = data;

  if (requestTwo.status >= 200 && requestTwo.status < 400) {

        console.log(pastMissionJSON);

	  updatePastMissionCards();

  } else {

    alert("failed to load json");

  }

}

requestTwo.send();


function updateCurrentMissionLaunch() {

	document.getElementById("currentMissionName").innerHTML = currentMissionJSON.mission_name;
	document.getElementById("currentLaunchSiteText").innerHTML = "Launch site: " + currentMissionJSON.launch_site.site_name_long;
	document.getElementById("currentPayLoadTypeText").innerHTML = "Payload type: " + currentMissionJSON.rocket.second_stage.payloads[0].payload_type;
	document.getElementById("currentRocketNameText").innerHTML = "Rocket name: " + currentMissionJSON.rocket.rocket_name;
	document.getElementById("currentPayLoadMassText").innerHTML = "Payload mass: " + currentMissionJSON.rocket.second_stage.payloads[0].payload_mass_kg + "/kg";
	document.getElementById("currentLaunchDateText").innerHTML = "Date: " + currentMissionJSON.launch_date_utc;
	document.getElementById("currentCustomerText").innerHTML = "Customer: " + currentMissionJSON.rocket.second_stage.payloads[0].customers[0];
	document.getElementById("currentOrbitParamsText").innerHTML = "Orbit parameters: " + currentMissionJSON.rocket.second_stage.payloads[0].orbit_params.regime + " " + currentMissionJSON.rocket.second_stage.payloads[0].orbit_params.reference_system;
}



function updatePastMissionCards() {
	for (let i = 0; i < pastMissionJSON.length; i++) {
		let missionCard = document.createElement("div");
			missionCard.className = "missionCard";

		let createTheContent = document.getElementById("missionHolderID");
			createTheContent.appendChild(missionCard);

			

		let pastMissionYear = document.createElement("h1");
			pastMissionYear.id = "theYear";
			missionCard.appendChild(pastMissionYear);
		let textnodeone = document.createTextNode(pastMissionJSON[i].launch_year);
            pastMissionYear.appendChild(textnodeone);



		let pastTripNr = document.createElement("h3");
			pastTripNr.id = "tripNr";
			missionCard.appendChild(pastTripNr);

			let textnodeTwo = document.createTextNode( "Flight " +  "#" + pastMissionJSON[i].flight_number);
				pastTripNr.appendChild(textnodeTwo);



		let pastMissionName = document.createElement("p");
			pastMissionName.id = "missionName";
			missionCard.appendChild(pastMissionName);

			let textnodeThree = document.createTextNode("Mission name: " + pastMissionJSON[i].mission_name);

				pastMissionName.appendChild(textnodeThree);



		let pastRocketType = document.createElement("p");

			pastRocketType.id = "rocketType";

			missionCard.appendChild(pastRocketType);

			let textnodeFour = document.createTextNode("Rocket type: " + pastMissionJSON[i].rocket.rocket_name);

				pastRocketType.appendChild(textnodeFour);



		let pastLaunchDate = document.createElement("p");

			pastLaunchDate.id = "launchDate";

			missionCard.appendChild(pastLaunchDate);

			let textnodeFive = document.createTextNode("Date UTC: " + pastMissionJSON[i].launch_date_utc);

				pastLaunchDate.appendChild(textnodeFive);



		let pastLaunchSite = document.createElement("p");

			pastLaunchSite.id = "launchSite";

			missionCard.appendChild(pastLaunchSite);

			let textnodeSix = document.createTextNode("Site: " + pastMissionJSON[i].launch_site.site_name);

				pastLaunchSite.appendChild(textnodeSix);



		}
	

}


/* INPUT */

function validateForm() {
  var x = document.forms["myContact"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}


/* failed attempt:
const ul = document.getElementById('Satellite'); 
 const url = 'http://api.open-notify.org/iss-now.json?callback=CALLBACK'; 

fetch ('http://api.open-notify.org/iss-now.json?callback=CALLBACK')
.then(result => result.json())
.then((res) => {
	myFunction(res);
	
})
.catch(err => console.log(err))

function myFunction(result){
var createCallback = result.posistion;
var posistion = document.getElementById('Satellite');
var satellitePos = createCallback.map (function(value){
var myHTMLvariable = '<h1>' + value.timestamp + '</h1><br><ul id="Satellite">' + value.iss_posistion + '</ul>';
	
	posistion.innerHTML += myHTMLvariable;
})
};

/*CALLBACK({
  "message": "success", 
  "timestamp": UNIX_TIME_STAMP,
  "iss_position": {
    "latitude": CURRENT_LATITUDE, 
    "longitude": CURRENT_LONGITUDE
  }
}) */