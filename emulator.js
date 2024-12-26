<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperNES Emulator</title>
    <script src="https://cdn.jsdelivr.net/npm/jsnes@0.6.0"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>SuperNES Emulator</h1>
    <canvas id="nes-canvas" width="256" height="240"></canvas>
    <br>
    <input type="file" id="rom-upload" accept=".nes">
    <script src="emulator.js"></script>
</body>
</html>
