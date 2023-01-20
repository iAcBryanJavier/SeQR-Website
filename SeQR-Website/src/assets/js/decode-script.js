export function GetQrData(){  
        const codeReader = new ZXing.BrowserMultiFormatReader()
        console.log('ZXing code reader initialized')
            const img = document.getElementById('img')
            img.videoWidth = 0;

            codeReader.decodeFromImage(img).then((result) => {
                console.log(result.text)
           
            }).catch((err) => {
                console.error(err)
            })
            console.log(`Started decode for image from ${img.src}`)
        console.log("JS FILE IS WAVING");

    }
