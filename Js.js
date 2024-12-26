// Initialize the NES emulator
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

// Handle ROM file upload
document.getElementById("rom-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            const romData = new Uint8Array(reader.result);
            try {
                nes.loadROM(romData);
                nes.start();
                console.log("ROM loaded successfully!");
            } catch (err) {
                console.error("Error loading ROM:", err);
                alert("Failed to load ROM. Please ensure it is a valid .nes file.");
            }
        };

        reader.readAsArrayBuffer(file);
    }
});

// Keyboard controls
const keyMap = {
    ArrowUp: jsnes.Controller.BUTTON_UP,
    ArrowDown: jsnes.Controller.BUTTON_DOWN,
    ArrowLeft: jsnes.Controller.BUTTON_LEFT,
    ArrowRight: jsnes.Controller.BUTTON_RIGHT,
    a: jsnes.Controller.BUTTON_A,
    b: jsnes.Controller.BUTTON_B,
    Enter: jsnes.Controller.BUTTON_START,
    Shift: jsnes.Controller.BUTTON_SELECT,
};

window.addEventListener("keydown", (event) => {
    if (keyMap[event.key]) {
        nes.buttonDown(1, keyMap[event.key]);
    }
});

window.addEventListener("keyup", (event) => {
    if (keyMap[event.key]) {
        nes.buttonUp(1, keyMap[event.key]);
    }
});
