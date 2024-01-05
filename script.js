    const videoContainer = document.querySelector(".video-container");
    let filters_opt = document.querySelectorAll(".filter-options");
    let mainDiv = document.querySelector(".main-div");
    let menu = document.querySelector(".menu-icon");
    let sidebar = document.querySelector(".sidebar");
    let api_key = "AIzaSyB7JH5EKF4zWVV5rVW0b-iwRIeWVInoK9k";
    let base_url = "https://www.googleapis.com/youtube/v3";
   
    menu.addEventListener("click", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.toggle("small-sidebar");
        mainDiv.classList.toggle("full-width");
        filters.classList.toggle("full-width");
    } else {
        sidebar.classList.toggle("show");
    }
    });

    let cancel = document.querySelector(".cancel");

    cancel.onclick = function () {
    sidebar.classList.remove("show");
    };

    document.addEventListener("DOMContentLoaded", function () {
    console.log("LOADED");
    videoContent();
    });

    // search query videos
   async function searchVideos(searchQuery){
        console.log(searchQuery);
        if(searchQuery === '' || searchQuery === undefined)
        {
            document.title = "YouTube"
        }
        else {
            document.title = `${searchQuery} - Youtube`;
          }

          try{
            let url = `${base_url}/search?key=${api_key}&q=${searchQuery}&part=snippet&maxResults=50`;
            let response = await fetch(url);
            let data = await response.json();
            videoContainer.innerHTML = '';
            if (data.items && data.items.length > 0) {
                // Iterate only if data.items is defined and not empty
                data.items.forEach(item => {
                    getChannelIcon(item);
                });
            } else {
                console.log('No items found in the response.');
            }
          }catch(error){
            console.log(error)
          }

    }

    async function videoContent() {
    try{
        const url = `${base_url}/videos?key=${api_key}&part=snippet&chart=mostPopular&maxResults=50&regionCode=IN`;
    let response = await fetch(url);
    let data = await response.json();
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
    } catch(err){
        console.log(err);
    }
   
    }


    //call the function
const getChannelIcon = async (videoData) => {
    // here i am fetching channel data
   try{
    const url = `${base_url}/channels?key=${api_key}&part=snippet&id=${videoData.snippet.channelId}`;
    let response = await fetch(url);
    let data = await response.json();
    videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(videoData);
   }catch(error){
    console.log(error)
   }

    };

    // call makeVideoCard function
    const makeVideoCard = (data) => {
    videoContainer.innerHTML += `
            <div class="video" onclick="location.href= '/playvideo.html'">
                <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" >
                <div class="content">
                    <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                    <div class="info">
                        <h4 class="title">${data.snippet.title}</h4>
                        <p class="channel-name">${data.snippet.channelTitle}</p>
                    </div>
                </div>
            </div>
            `;
    };

    // make search bar

    const searchInput = document.querySelector(".search-content");
    const searchBtn = document.querySelector(".search-btn");

    searchBtn.addEventListener('click', ()=>{
        searchVideos(searchInput.value);
       
    });

    searchInput.addEventListener("keyup", (event)=>{
        if(event.key === "Enter"){
            searchVideos(searchInput.value);          
        }
    })

    //filter options
   filters_opt.forEach(element => {
    element.addEventListener("click", activeStatus)
   });

    function activeStatus(event){
      for(let option of filters_opt)
      {
        option.classList.remove("active")
      }
      event.target.classList.add("active");

      searchVideos(event.target.innerHTML); 

    }

   