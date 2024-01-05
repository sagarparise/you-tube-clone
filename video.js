
let playVideo = document.querySelector(".play-video");
function videoPlay(videoCode) {
    // Add your videoPlay logic here
    console.log("Playing video with code:", videoCode);
    window.location.href = 'playvideo.html';
    playVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoCode}" width="200px" height="200px" frameborder="0"></iframe>`
    
  }
  