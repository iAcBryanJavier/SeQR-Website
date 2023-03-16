var resultOfQR;
function GetQrData() {
  const codeReader = new ZXing.BrowserMultiFormatReader();
  const img = document.getElementById("img");
  img.videoWidth = 0;

  codeReader
    .decodeFromImage(img)
    .then((result) => {
      alert((resultOfQR = result.text));
    })
    .catch((err) => {
      throw (
        "Upload QR Error: Invalid QR Upload, Check if the image is a proper image file or a proper QR Code. More Info: " +
        err
      );
    });
}
export { GetQrData, resultOfQR };
