let data = JSON.parse(localStorage.getItem("video"));
let query;
let api_key = "AIzaSyC8KcPF-gRkMOKF8yvNV3utYg1xDhe62lw";
let base_url = "https://www.googleapis.com/youtube/v3";
let right_sidebar = document.querySelector(".right-sidebar");
let playContainer = document.querySelector(".play-video");
let mainTitle = document.querySelector(".main-title");
let ch_logo = document.querySelector(".ch-head > img");
let ch_Name = document.querySelector(".vd-channelName");

console.log(data)

if(localStorage.getItem('query')){
   query = localStorage.getItem("query");
   localStorage.removeItem("query")
  console.log(query);
}


if(data.id.videoId){
  
  data.id = data.id.videoId;
}

function playvideo(data) {

  let iframe = document.createElement("iframe");
 
  iframe.src = `https://www.youtube.com/embed/${data.id}?autoplay=1`;
 
  iframe.frameBorder = "0"; // Set frameborder to 0 (no border)
  iframe.setAttribute('allow', 'autoplay');
  iframe.allowFullscreen = true; //


  playContainer.insertBefore(iframe, playContainer.firstChild)


  mainTitle.innerHTML = `${data.snippet.title}`
  ch_logo.src = `${data.channelThumbnail}`
  ch_Name.innerHTML = `${data.snippet.channelTitle}`

  vdPlayerdata(query);
}

function vdPlayerdata(qry) {
  if(qry){
    
    queryRelatedData(qry);
  }
  else{
  
    normalData();  
  }
  }

//if the query is present then it will work
async function queryRelatedData(qry){
  
  try {
    let url = `${base_url}/search?key=${api_key}&q=${qry}&part=snippet&maxResults=50`;
    let response = await fetch(url);
    let data = await response.json();
    
    //here we get you tube video data
    // here i am iterating over this item data
    if (data.items && data.items.length > 0) {
      // Iterate only if data.items is defined and not empty
      data.items.forEach((item) => {
        makeVideoCard(item);
      });
    } else {
      console.log("No items found in the response.");
    }
  } catch (err) {
    console.log(err);
  }

}

async function normalData(){
  console.log('normal fun called')

  try {
    const url = `${base_url}/videos?key=${api_key}&part=snippet&chart=mostPopular&maxResults=50&regionCode=IN`;
    let response = await fetch(url);
    let data = await response.json();
    
    //here we get you tube video data
    // here i am iterating over this item data
    if (data.items && data.items.length > 0) {
      // Iterate only if data.items is defined and not empty
      data.items.forEach((item) => {
        makeVideoCard(item);
      });
    } else {
      console.log("No items found in the response.");
    }
  } catch (err) {
    console.log(err);
  }
}



const makeVideoCard = (data) => {
  right_sidebar.innerHTML += ` <div class="side-video">
  <img src="${data.snippet.thumbnails.high.url}" />
  <div class="video-info">
    <h4 class="vd-title">${data.snippet.title}</h4>
    <p class="vd-channelName">${data.snippet.channelTitle}</p>
  </div>
</div>`;
};

playvideo(data, query);
