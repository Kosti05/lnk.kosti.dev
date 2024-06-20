var input = document.getElementsByClassName("input")[0];
var url_input = document.getElementsByClassName("url_input")[0];
var submit = document.getElementsByClassName("submit")[0];

let forbiddenURL = "The URL must contain http:// or https://";

async function createURL() {

    if (!url_input.value) {
        alert(forbiddenURL);
        return;
    }

    if (!url_input.value.includes("https://") && !url_input.value.includes("http://")) {
        alert(forbiddenURL);
        return;
    }

    const url = "https://lnk.kosti.dev/create?url=" + url_input.value;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const urlCode = await response.text();
            console.log(`Shortened URL code: ${urlCode}`);
            outputURL(urlCode);
            url_input.value = "";
        } else {
            console.error('Failed to create shortened URL', response.status, response.statusText);
        }
    } catch (error) {console.error('Error occurred while creating shortened URL', error);}
}

var output_url = document.getElementsByClassName("output_url")[0];

function outputURL(urlCode) {
    output_url.value = "https://lnk.kosti.dev/" + urlCode;
    open();
}

input.addEventListener("focusin", activate);
input.addEventListener("focusout", deactivate);

function activate() {
  document.querySelector(".url_label").classList.add("label_focused");
  document.querySelector(".url_input").classList.add("input_focused");
  document.querySelector(".line").classList.add("line_focused");
  document.querySelector(".submit").classList.add("submit_focused");
  document.querySelector(".title").classList.add("title_focused");
  submit.disabled = false;
}

function deactivate() {
  if (url_input.value != "") {
    return;
  }

  document.querySelector(".url_label").classList.remove("label_focused");
  document.querySelector(".url_input").classList.remove("input_focused");
  document.querySelector(".line").classList.remove("line_focused");
  document.querySelector(".submit").classList.remove("submit_focused");
  document.querySelector(".title").classList.remove("title_focused");
  submit.disabled = true;
}

//Modal JS

var closeButton = document.getElementsByClassName("close_button")[0];
var dialog      = document.getElementsByClassName("dialog")[0];
var copyButton  = document.getElementsByClassName("copy_button")[0];

closeButton.addEventListener("click", close);
copyButton.addEventListener("click", copy);


function close() {
    dialog.style.visibility='hidden';
}

function open() {
    dialog.style.visibility='visible';
}

function copy() {
    navigator.clipboard.writeText(output_url.value);
}
