const videoContainer = document.querySelector(".video-container");
let filters = document.querySelector(".filters");
let mainDiv = document.querySelector(".main-div");
let menu = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let api_key ='AIzaSyDWkWpXjBycMCb6hdootRGjt4hLhvX2SuY';
let video_http = 'https://www.googleapis.com/youtube/v3/videos?';
let channel_http = 'https://www.googleapis.com/youtube/v3/channels?';

menu.addEventListener("click",()=>{
sidebar.classList.toggle("small-sidebar");
mainDiv.classList.toggle("full-width");
filters.classList.toggle("full-width");
});


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart:'mostPopular',
    maxResults: 100,
    regionCode: 'IN'
}))
.then((response)=>{
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then((data)=>{
    console.log(data);
    //here we get you tube video data
    // here i am iterating over this item data 
    if (data.items && data.items.length > 0) {
        // Iterate only if data.items is defined and not empty
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    } else {
        console.log('No items found in the response.');
    }
    
})
.catch((error)=>{
    console.log(`error ${error}`);
})

//call the function
const getChannelIcon =  (videoData)=>{

    // here i am fetching channel data  
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: videoData.snippet.channelId
    }))
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // here getting video data
        console.log(data);
        //here i am creating key as channelThumbnails
         videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(videoData);

        //make the videoCard

    makeVideoCard(videoData);
    })
    .catch((error)=>{
        console.log(`error: ${error}`);
    })
    
}

  // call makeVideoCard function
  const makeVideoCard = (data)=>{
    
    videoContainer.innerHTML += `
    <div class="video" onclick="location.href= 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}


// make search bar

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLinks = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", ()=>{
    if(searchInput.value.length){
        location.href = searchLinks + searchInput.value;
    }
    
})