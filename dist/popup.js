


// document.addEventListener('DOMContentLoaded', function () {
//     var checkPageButton = document.getElementById('checkPage');
//     checkPageButton.addEventListener('click', function () {

//         chrome.tabs.getSelected(null, function (tab) {
//             d = document;
//             var f = d.createElement('form');
//             // f.action = 'google.com';
//             // f.method = 'post';
//             var i = d.createElement('input');
//             i.type = 'hidden';
//             i.name = 'url';
//             i.value = tab.url;
//             f.appendChild(i);
//             d.body.appendChild(f);
//             f.submit();
//         });
//     }, false);
// }, false);



//js for our html

var drink = [];
var chug = [];

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (var key in changes) {
//       var storageChange = changes[key];
//       if (key == "drink_storage") {
//         drink = storageChange.newValue;
//       }
//       if (key == "chug_storage"){
//         chug = storageChange.newValue;
//       }
//       document.getElementById("drink_on").innerHTML = "Drink on: " + drink;
//       document.getElementById("chug_on").innerHTML = "Chug on: " + chug;
//       console.log('Storage key "%s" in namespace "%s" changed. ' +
//                   'Old value was "%s", new value is "%s".',
//                   key,
//                   namespace,
//                   storageChange.oldValue,
//                   storageChange.newValue);
//       drink = storageChange.newValue;
//     }
//   });

function newWord(){
    var x = document.getElementById("word").value;
    console.log(drink)
    drink.push(x);
    document.getElementById("drink_on").innerHTML = "Drink on: " + drink;    

    chrome.storage.sync.set({"drink_storage": drink}, function() {
        console.log('Value is set to ' + drink);
      });

      // debugging
    //   if(chrome.storage == null || chrome.storage == 'undefined'){
    //     console.log('storage doesnt exist');
    //   }
    //   else {
    //     chrome.storage.sync.get(['key'], function(result) {
    //       console.log('Value currently is ' + result.key);
    //     });
    //   }
}

function newWordChug(){
  var x = document.getElementById("word2").value;
  console.log(chug)
  chug.push(x);
  document.getElementById("chug_on").innerHTML = "Chug on: " + chug;    

  chrome.storage.sync.set({"chug_storage": chug}, function() {
      console.log('Value is set to ' + chug);
    });
}

function clearLocalStorage(){
    console.log(drink)
    drink = []
    chug = []
    chrome.storage.sync.set({"drink_storage": drink}, function() {
      console.log('Value is set to ' + drink);
    });
    chrome.storage.sync.set({"chug_storage": chug}, function() {
      console.log('Value is set to ' + chug);
    });
    document.getElementById("drink_on").innerHTML = "";
    document.getElementById("chug_on").innerHTML = "";
    // below actually clears storage
    // chrome.storage.sync.clear(function() {
    //   var error = chrome.runtime.lastError;
    //     if (error) {
    //       console.error(error);
    //     }
    //  })
}

function start(){
  chrome.storage.sync.set({"start_now": "true"}, function() {
    console.log('Starting');
  });
}

function stop(){
  chrome.storage.sync.set({"start_now": ""}, function() {
    console.log("Stopping");
  })
}

window.onload = function () {
    console.log('foo');
    chrome.storage.sync.get(["drink_storage"], function(result) {
      drink = result["drink_storage"];
      document.getElementById("drink_on").innerHTML = "Drink on: " + drink;    
      // console.log('Value currently is ' + result);
      // console.log(JSON.stringify(result, null, 4));
      // console.log(result["drink_storage"]);
    });
    chrome.storage.sync.get(["chug_storage"], function(result) {
      chug = result["chug_storage"];
      document.getElementById("chug_on").innerHTML = "Chug on: " + chug;
      // console.log('Value currently is ' + result);
      // console.log(JSON.stringify(result, null, 4));
      // console.log(result["drink_storage"]);
    });
    document.getElementById("button1").onclick = newWord;
    document.getElementById("button2").onclick = newWordChug;
    document.getElementById("reset").onclick = clearLocalStorage;

}
