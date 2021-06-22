//Get the lat/lon for a given zipcode

/*
TODO!
- Figure out why tilt.js is being weird
- Search and list bugs WEIRD BUG FOUND.....
- Make "your location" actually display your location's data.

FEATURES
- Make the widget update live without page reload
- small slide out animation? oooo that might be interesting...
- Data validation? (make text input easier)
- What if I want to enter a city name?
- What if I click on the small?
- Usibility test
- Make the "no location found" screen / card more visually appealing. (can we direct the user to enable location?)
*/
const APIKEY = "HIDDEN";

if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(geoLocationRceived,geoLocationNull);
}
//Code to execute if the geolocation function returns nothing
function geoLocationNull() {
    now.innerHTML = "For some reason, your current location information is not available :(. Make sure you allow location tracking on this website!";
}

//Function to execute if the geolocation returns true!
function geoLocationRceived(pos) {
    let lat = pos.coords.latitude
    let lon = pos.coords.longitude
    getLatLon(null,lat,lon);
}

let smallsList = [];
let weatherCardNodes = [];
let weatherCards = [];



document.getElementById("weather__small1").addEventListener("mouseenter",function() {
    //this.style.background = "pink";
    for (let i = 0; i < weatherCardNodes.length; i++) {
        weatherCardNodes[i].setAttribute("hidden","true");
    }
    for (let i = 0; i < smallsList.length; i++) {
        //weatherCardNodes[i-1].setAttribute("hidden","true");
        if (smallsList[i].id == this.id) {
            weatherCardNodes[i].removeAttribute("hidden");
            //console.log(weatherCards[i-1].data.city_name);
        }
    }

});
// document.getElementById("weather__small1").addEventListener("mouseleave",function() {
//     this.style.background = "rgba( 255, 255, 255, 0.50)";
// });
weatherCardNodes.push(document.getElementById("w1"));
smallsList.push(document.getElementById("weather__small1"));


//let expanded = true;
// let box = document.getElementById("weather__smalls");
// box.style.height = box.offsetHeight;


input__field.addEventListener("keypress",function(event) {
    let re = /\d/;
    if (re.test(this.value) && this.value.length == 5 && event.key === "Enter") {
       // console.log(window.getComputedStyle(weather__smalls, null).getPropertyValue('height'));

        // setTimeout(function() {
        //     let newHeight = window.getComputedStyle(weather__smalls, null).getPropertyValue('height');
        //     box.style.height = 100 + "px";

        // },1000)
        // if (expanded) {
        //     box.style.height += 300 + "px";
        //     expanded = false;
        // }
        // } else {
        //     box.style.height = height+"px";
        //     expanded = true;
        // }
        document.getElementById("input__field").blur();
        //document.getElementById('weather__smalls').style.height = heightElem + 100;
        myCard = new Weather(this.value);
        weatherCards.push(myCard);
        myCard.createDOM();
        myCard.queryDatabase();


        
        this.value = "";
    }
});

class Small {
    constructor(myCard) {
        this.name = myCard.data.city_name;
        this.curr_dateTime = myCard.data.curr_dateTime,
        this.city_name = myCard.data.city_name,
        this.curr_temperature = myCard.data.curr_temperature,
        this.feels_like = myCard.data.feels_like,
        this.sky_desc = myCard.data.sky_desc,
        this.id = "";
    }
    createDOM() {
        let currSmall = document.getElementById("weather__small1");
        //console.log(currSmall);
        let newSmall = currSmall.cloneNode(true);
        document.getElementById("weather__smalls").insertBefore(newSmall,document.getElementById("addNewSmall"));
        let ids = ["weather__small1","weather__small2","weather__small3","weather__small4","weather__small5","weather__small6","weather__small7","weather__small8","weather__small9","weather__small10","weather__small11"];
            let xids = [];
            for (let i = 0; i < document.getElementsByClassName("weather__small").length;i++) {
                xids.push(document.getElementsByClassName("weather__small")[i].id);
            }
            for (let i = 0; i < xids.length;i++) {
                if (ids.includes(xids[i])) {
                    let idx = ids.indexOf(xids[i]);
                    ids.splice(xids[i],1);
                }
            }
        this.id = ids[0];
        let currentId = this.id;
        newSmall.id = ids[0];
        document.querySelector("#" + ids[0] + " .small__location__text").innerHTML = this.name;
        document.querySelector("#" + ids[0] + " .small__curr__dateTime").innerHTML = this.curr_dateTime;
        document.querySelector("#" + ids[0] + " .small__curr__temp").innerHTML = this.curr_temperature + "&#176";
        newSmall.addEventListener("mouseenter",function() {
            //this.style.background = "pink";
            //w1.setAttribute("hidden","true");
            for (let i = 0; i < weatherCardNodes.length; i++) {
                weatherCardNodes[i].setAttribute("hidden","true");
            }
            for (let i = 0; i < smallsList.length; i++) {
                //weatherCardNodes[i-1].setAttribute("hidden","true");
                if (smallsList[i].id == this.id) {
                    weatherCardNodes[i].removeAttribute("hidden");
                    //console.log(weatherCards[i-1].data.city_name);
                }
            }

        });
        smallsList.push(newSmall);

        newSmall.getElementsByClassName("remove__button")[0].onclick = function() {
            //this.style.background = "pink";
            for (let i = 0; i < smallsList.length; i++) {
                if (smallsList[i].id == currentId) {
                    smallsList[i].remove();
                    weatherCardNodes[i].remove()
                    //smallsList[i].hidden = true;
                    //smallsList.splice(i-1);
                }
            }
        }
        // newSmall.getElementsByClassName("remove__button")[0].addEventListener("click",function() {
        //     this.style.background = "pink";
        //     for (let i = 0; i < smallsList.length; i++) {
        //         console.log(smallsList);
        //         if (smallsList[i].id == this.id) {
        //             console.log(":)");
        //             smallsList[i].hidden = true;
        //             smallsList.splice(i);
        //         }
        //     }
        // });
//         newSmall.addEventListener("mouseleave",function() {
//             this.style.background = "rgba( 255, 255, 255, 0.50)";
// s
//         });
    }
}


var el = document.getElementById('weather__cards');
var sortable = Sortable.create(el);
// var sortable = new Sortable(document.getElementById('weather__cards'),{
//     animation: 200,
//     easing: "cubic-bezier(1, 0, 0, 1)",
//     ghostClass: "sortable-drag", 
// })
class App {
    constructor(xhr) {
        this.xhr = xhr;
    }
}



class Weather {
    constructor(zip) {
        this.xhr = "";
        this.ajax = "";
        this.numDays = 6;
        this.numHours = 6;
        this.zip = zip;
        this.id = "";
        this.now = "Now";
        this.background = {

        };
        this.data = {
            curr_dateTime:"3PM",
            city_name:"Upland",
            curr_temperature:"32",
            feels_like:"19",
            sky_desc:"partly cloudy",
            hours: {
                time:["6PM","7PM","8PM","9PM","10PM","11PM"],
                temp:["32","32","31","30","28","27"],
                img:[null,null,null,null,null,null]
            },
            days: {
                name:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
                high:["42","40","48","34","28","29"],
                low:["36","29","27","27","17","8"],
            }
        }
    }
    assignVariables(xhr,ajax) {
        this.data.curr_temperature = Math.round(xhr.response.current.temp);
        this.data.curr_dateTime = this.getDateTime(xhr);
        this.data.hours.time = this.getHours(xhr);
        this.data.hours.temp = this.getTemperatures(xhr);
        this.data.feels_like = Math.round(xhr.response.current.feels_like);
        this.data.sky_desc = xhr.response.current.weather[0]["description"];
        this.data.city_name = ajax.response["name"];
        this.data.days.name = this.getHighsAndLows(xhr)[0];
        this.data.days.high = this.getHighsAndLows(xhr)[1];
        this.data.days.low = this.getHighsAndLows(xhr)[2];
        //Create a new small after the variables have been properly assigned
        let mySmall = new Small(this);
        mySmall.createDOM();
       // console.log(window.getComputedStyle(weather__smalls, null).getPropertyValue('height'));

    }
    createDOM() {
        let currNode = document.getElementsByClassName("weather__card")[0];
        let ids = ["w1","w2","w3","w4","w5","w6","w7","w8","w9","w10","w11"];
        let xids = [];
        for (let i = 0; i < document.getElementsByClassName("weather__card").length;i++) {
            xids.push(document.getElementsByClassName("weather__card")[i].id);
        }
        for (let i = 0; i < xids.length;i++) {
            if (ids.includes(xids[i])) {
                let idx = ids.indexOf(xids[i]);
                ids.splice(xids[i],1);
            }
        }
        let newNode = currNode.cloneNode(true);
        newNode.id = ids[0];
        this.id = ids[0];
        weatherCardNodes.push(newNode);
        newNode.setAttribute("hidden","true");
        document.getElementById("weather__cards").appendChild(newNode);
    }

    loadElements(xhr,ajax) {
        let card = document.getElementById(this.id);
        card.getElementsByClassName("hour__time__current")[0].innerHTML = this.now;
        card.getElementsByClassName("time")[0].innerHTML = this.data.curr_dateTime;
        card.getElementsByClassName("city")[0].innerHTML = this.data.city_name;
        card.getElementsByClassName("curr__temp")[0].innerHTML = this.data.curr_temperature + "&#176";
        card.getElementsByClassName("curr__temp")[1].innerHTML = this.data.curr_temperature + "&#176";
        card.getElementsByClassName("sky")[0].innerHTML = this.data.sky_desc;
        card.getElementsByClassName("feels_like")[0].innerHTML = "Feels like: " + this.data.feels_like + "&#176";
        let divs = card.getElementsByClassName("hour__time");
        let temps = card.getElementsByClassName("temp");
        let dayNames = card.getElementsByClassName("dayName");
        let highs = card.getElementsByClassName("high");
        let lows = card.getElementsByClassName("low");
        for (let i = 0; i < this.data.hours.time.length;i++) {
            divs[i].innerHTML = this.data.hours.time[i];
            temps[i].innerHTML = this.data.hours.temp[i];
            dayNames[i].innerHTML = this.data.days.name[i];
            highs[i].innerHTML = this.data.days.high[i];
            lows[i].innerHTML = this.data.days.low[i];
        }
    }

    queryDatabase() {
        this.ajax = new XMLHttpRequest();
        this.ajax.responseType = "json";
        this.ajax.addEventListener("load",() => {
            if (this.ajax.status !== 200) {
                alert("Oh no! There was a pesky problem communicating with the server...");
            }
            let cityName = this.ajax.response["name"];
            let lat = this.ajax.response["coord"]["lat"];
            let lon = this.ajax.response["coord"]["lon"];
            this.xhr = new XMLHttpRequest();
            this.xhr.responseType = "json";
            this.xhr.addEventListener("load",() => {
                if (this.xhr.status !== 200) {
                    alert("Oh no! There was a pesky problem communicating with the server...");
                }
                this.assignVariables(this.xhr,this.ajax);
                this.loadElements(this.xhr,this.ajax);
            });
            this.xhr.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon +"&units=imperial&appid=" + APIKEY);
            this.xhr.send(); 
        });
        //02c31802b54f5a3e8fb3d454cc8cff72
        //02c31802b54f5a3e8fb3d454cc8cff72
        this.ajax.open("GET","http://api.openweathermap.org/data/2.5/weather?zip=" + this.zip +"&units=imperial&appid=" + APIKEY);
        this.ajax.send();
    }
    getDateTime(xhr) {
        let currentUnixTimeStamp = xhr.response.current.dt;
        let selectedLocationOffset = xhr.response.timezone_offset;
        let num = (currentUnixTimeStamp*1000) + (selectedLocationOffset*1000);
        var s = new Date(num).toLocaleString("en-US", {timeZone: "UTC"});
        let space = s.indexOf(" ");
        let colon = s.indexOf(":");
        let chars = colon-space-1;
        let hour = s.slice(space+1,colon);
        let day = s[colon+7] + s[colon+8];
        let dateTime = hour+"<span class='ampm'>" + day + "</span>";
        return dateTime;
    }
    getHours(xhr) {
        let hours = [];
        for (let i = 1; i < 6+1;i++) {
            let currentUnixHourTimeStamp = xhr.response.hourly[i].dt;
            let selectedLocationOffset = xhr.response.timezone_offset;
            let num = (currentUnixHourTimeStamp*1000) + (selectedLocationOffset*1000);
            var s = new Date(num).toLocaleString("en-US", {timeZone: "UTC"});
            let space = s.indexOf(" ");
            let colon = s.indexOf(":");
            let chars = colon-space-1;
            let hour = s.slice(space+1,colon);
            let day = s[colon+7] + s[colon+8];
            let dateTime = hour+"<span class='ampm'>" + day + "</span>";
            hours.push(dateTime); 
        }
        return hours;
    }
    getTemperatures(xhr) {
        let temps = [];
        for (let i = 0; i < 6+1; i++) {
            let temp = xhr.response.hourly[i].temp;
            temps.push(Math.round(temp) + "&#176");
        }
        return temps;
    }
    getHighsAndLows(xhr) {
        let dataList = [];
        let highs = [];
        let lows = [];
        let myDays = [];
        for (let i = 1; i < 8; i++) {
            let high = xhr.response.daily[i].temp.max;
            highs.push(Math.round(high) + "&#176");
        }

        for (let i = 1; i < 8; i++) {
            let low = xhr.response.daily[i].temp.min;
            lows.push(Math.round(low) + "&#176");
        }
        for (let i = 1; i < 8; i++) {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
            let day = days[new Date(xhr.response.daily[i].dt*1000).getDay()]
            myDays.push(day);
        }
        dataList = [myDays,highs,lows]
        return dataList;
    }
}

function getLatLon(zip,myLat=null,myLon=null) {
    if (myLat && myLon) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load",function() {
            if (this.status !== 200) {
                alert("Oh no! There was a pesky problem communicating with the server...");
            }
            updateField(xhr);
        });
        xhr.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=" + myLat + "&lon="+ myLon +"&units=imperial&appid=" + APIKEY);
        xhr.send(); 
    } else {
        let ajax = new XMLHttpRequest();
        ajax.responseType = "json";
        ajax.addEventListener("load",function() {
            var lat;
            var lon;
            if (this.status !== 200) {
                alert("Oh no! There was a pesky problem communicating with the server...");
            }
            //console.log(this.response);
            let cityName = this.response["name"];
            if (myLat && myLon) {
                lat = myLat;
                lon = myLon;
            } else {
                lat = this.response["coord"]["lat"];
                lon = this.response["coord"]["lon"];
            }
            let xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.addEventListener("load",function() {
                if (this.status !== 200) {
                    alert("Oh no! There was a pesky problem communicating with the server...");
                }
                updateField(xhr,ajax);
            });
            xhr.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon +"&units=imperial&appid=" + APIKEY);
            xhr.send(); 
        });
        //
        //02c31802b54f5a3e8fb3d454cc8cff72
        ajax.open("GET","http://api.openweathermap.org/data/2.5/weather?zip=" + zip +"&units=imperial&appid=" + APIKEY);
        ajax.send();
    }
}

function updateField(xhr,ajax="Your Location") {
    let curr_dateTime = getDateTime(xhr);
    let hours = getHours(xhr);
    let temperatures = getTemperatures(xhr);
    let highsAndLows = getHighsAndLows(xhr);
    document.getElementsByClassName("time")[0].innerHTML = getDateTime(xhr);
    document.getElementById("upper__curr__time").innerHTML = document.getElementsByClassName("time")[0].innerHTML;
    if (ajax == "Your Location") {
        document.getElementsByClassName("city")[0].innerHTML = "Your Location";
    } else {
        document.getElementsByClassName("city")[0].innerHTML = ajax.response["name"];
    }
    document.getElementsByClassName("curr__temp")[0].innerHTML = Math.round(xhr.response.current.temp) + "&#176";
    document.getElementsByClassName("curr__temp")[1].innerHTML = Math.round(xhr.response.current.temp) + "&#176";
    document.getElementById("upper__curr__temp").innerHTML = document.getElementsByClassName("curr__temp")[0].innerHTML;
    document.getElementsByClassName("sky")[0].innerHTML = xhr.response.current.weather[0]["description"];
    document.getElementsByClassName("feels_like")[0].innerHTML = "Feels like: " + Math.round(xhr.response.current.feels_like) + "&#176";
    let divs = document.getElementsByClassName("hour__time");
    let temps = document.getElementsByClassName("temp");
    let dayNames = document.getElementsByClassName("dayName");
    let highs = document.getElementsByClassName("high");
    let lows = document.getElementsByClassName("low");
    for (let i = 0; i < 6; i++) {
        divs[i].innerHTML = hours[i];
        temps[i].innerHTML = temperatures[i];
        dayNames[i].innerHTML = highsAndLows[i][0];
        highs[i].innerHTML = highsAndLows[i][1];
        lows[i].innerHTML = highsAndLows[i][2];

    }
    // updateColor(curr_dateTime);
}
function getHighsAndLows(xhr) {
    let dataList = [];
    for (let i = 1; i < 8; i++) {
        let high = xhr.response.daily[i].temp.max;
        let low = xhr.response.daily[i].temp.min;
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
        let day = days[new Date(xhr.response.daily[i].dt*1000).getDay()]
        dataList.push([day,Math.round(high) + "&#176",Math.round(low) + "&#176"]);
    }
    return dataList;
}
function getTemperatures(xhr) {
    let temps = [];
    for (let i = 0; i < 6+1; i++) {
        let temp = xhr.response.hourly[i].temp;
        temps.push(Math.round(temp) + "&#176");
    }
    return temps;
}
function getDateTime(xhr) {
    let currentUnixTimeStamp = xhr.response.current.dt;
    let selectedLocationOffset = xhr.response.timezone_offset;
    let num = (currentUnixTimeStamp*1000) + (selectedLocationOffset*1000);
    var s = new Date(num).toLocaleString("en-US", {timeZone: "UTC"});
    space = s.indexOf(" ");
    colon = s.indexOf(":");
    chars = colon-space-1;
    hour = s.slice(space+1,colon);
    day = s[colon+7] + s[colon+8];
    dateTime = hour+"<span class='ampm'>" + day + "</span>";
    return dateTime;
}

function getHours(xhr) {
    let hours = [];
    for (let i = 1; i < 6+1;i++) {
        let currentUnixHourTimeStamp = xhr.response.hourly[i].dt;
        let selectedLocationOffset = xhr.response.timezone_offset;
        let num = (currentUnixHourTimeStamp*1000) + (selectedLocationOffset*1000);
        var s = new Date(num).toLocaleString("en-US", {timeZone: "UTC"});
        space = s.indexOf(" ");
        colon = s.indexOf(":");
        chars = colon-space-1;
        hour = s.slice(space+1,colon);
        day = s[colon+7] + s[colon+8];
        dateTime = hour+"<span class='ampm'>" + day + "</span>";
        hours.push(dateTime); 
    }
    return hours;
}
//cali 90201
//Tarre Heaute 47803
// getLatLon(90201);
