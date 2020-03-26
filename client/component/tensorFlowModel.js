{
  /* <div>Teachable Machine Image Model</div>
<button type="button" onclick="init()">Start</button>
<div id="webcam-container"></div>
<div id="label-container"></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript"> */
}

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/0lKSu52Fy/";
let model, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
}

async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(/*something*/);
  // for (let i = 0; i < maxPredictions; i++) {
  //     const classPrediction =
  //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //     labelContainer.childNodes[i].innerHTML = classPrediction;
  // }
}
// </script>

// pickImage() async {
//   File image = await ImagePicker.pickImage(source: ImageSource.gallery);
//   if (image == null) return null;
//   setState(() {
//     _loading = true;
//     _image = image;
//   });
//   classifyImage(image);
// }

// classifyImage(File image) async {
//   List output = await Tflite.runModelOnImage(
//     path: image.path,
//     numResults: 2,
//     threshold: 0.5,
//     imageMean: 127.5,
//     imageStd: 127.5,
//   );
//   String _label = output[0][“label”];
//   List _hashtagsResult = _hashtags[“$_label”];
//   setState(() {
//     _loading = false;
//     _outputs = _hashtagsResult;
//   });
// }

// loadModel() async {
//   await Tflite.loadModel(
//     model: “assets/model_unquant.tflite”,
//     labels: “assets/labels.txt”,
//   );
// }
