// video stream constraints
let constraints = { video: { facingMode: "environment" }, audio: false };
// const. definition
const cameraView = document.querySelector("#cam__view"),
  cameraOutput = document.querySelector("#cam__output"),
  cameraSensor = document.querySelector("#cam__sensor"),
  cameraTrigger = document.querySelector("#cam__trigger")
// camera access, stream to cameraview
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
    track = stream.getTracks()[0];
    cameraView.srcObject = stream;
  })
  .catch(function(error) {
    console.error("Error of some kind...", error);
  });
}
// snap a picture on camera trigger
cameraTrigger.onclick = function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/png");
  cameraOutput.classList.add("captured");
};
// video stream start
window.addEventListener("load", cameraStart, false);
