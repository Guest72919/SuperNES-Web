<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperNES Emulator</title>
    <script src="https://cdn.jsdelivr.net/npm/jsnes@0.6.0"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #222;
            color: #fff;
            margin: 0;
        }
        canvas {
            border: 2px solid white;
            margin: 20px auto;
        }
        input[type="file"] {
            margin: 20px;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>SuperNES Emulator</h1>
    <canvas id="nes-canvas" width="256" height="240"></canvas>
    <br>
    <input type="file" id="rom-upload" accept=".nes">
    <script>
        const canvas = document.getElementById("nes-canvas");
        const context = canvas.getContext("2d");

        const nes = new jsnes.NES({
            onFrame: (frameBuffer) => {
                const imageData = context.createImageData(256, 240);
                for (let i = 0; i < frameBuffer.length; i++) {
                    imageData.data[i * 4] = (frameBuffer[i] >> 16) & 0xff; // Red
                    imageData.data[i * 4 + 1] = (frameBuffer[i] >> 8) & 0xff; // Green
                    imageData.data[i * 4 + 2] = frameBuffer[i] & 0xff; // Blue
                    imageData.data[i * 4 + 3] = 0xff; // Alpha
                }
                context.putImageData(imageData, 0, 0);
            },
        });

        document.getElementById("rom-upload").addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const romData = new Uint8Array(reader.result);
                nes.loadROM(romData);
                nes.start();
            };

            if (file) {
                reader.readAsArrayBuffer(file);
            }
        });
    </script>
</body>
</html>
