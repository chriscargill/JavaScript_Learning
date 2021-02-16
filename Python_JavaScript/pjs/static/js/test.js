
var tag = document.createElement("li");
var text = document.createTextNode("FROM THE JS File");
tag.appendChild(text);
var element = document.getElementById("1337"); // This id can be found on the file base.html
element.appendChild(tag);
var me = "its me mario";
function hello(location) {
    console.log(`Inside the ${location}`);
}
console.log("OTHER FILE");