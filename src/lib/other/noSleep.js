import mockVideo from "../../assets/videos/cdef.mp4";

// function getSource(videoPath) {
//   const source = document.createElement("source");
//   source.src = videoPath;
//   source.type = "video/mp4";
//   return source;
// }

function getNoSleep() {
  if (!window.noSleep) {
    window.noSleep = { repeat: 0 };
    const { noSleep } = window;
    const videoNode = document.createElement("video");
    noSleep.videoNode = videoNode;
    videoNode.loop = true;
    videoNode.muted = true;
    videoNode.setAttribute("preload", "auto");
    videoNode.setAttribute("playsinline", "");
    videoNode.setAttribute("src", mockVideo);
    // videoNode.
    // videoNode.appendChild(getSource(mockVideo));
  }
  return window.noSleep;
}

export function enableNoSleep(future) {
  const noSleep = getNoSleep();
  noSleep.repeat += 1;
  const { videoNode } = noSleep;
  const videoStoped = videoNode.paused || videoNode.ended;
  if (videoStoped) {
    noSleep.videoNode.load();
    let startPlayPromise = videoNode.play();

    if (startPlayPromise !== undefined) {
      startPlayPromise
        .then(() => {
          future.then(() => {
            noSleep.videoNode.pause();
          });
        })
        .catch(error => {
          alert(error);
          // if (error.name === "NotAllowedError") {
          //   showPlayButton(videoElem);
          // } else {
          //   // Handle a load or playback error
          // }
        });
    }
  }
}

export function disableNoSleep() {
  const noSleep = getNoSleep();
  const { videoNode } = noSleep;
  const videoStoped = videoNode.paused || videoNode.ended;
  noSleep.repeat -= 1;
  if (noSleep.repeat < 0) noSleep.repeat = 0;
  if (noSleep.repeat > 0) return;
  if (videoStoped) return;

  noSleep.videoNode.pause();
}
