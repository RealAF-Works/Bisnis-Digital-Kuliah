// Constrain element to stay within the print area
function constrainToPrintArea(element) {
    const printArea = document.getElementById("printarea-front");
    const rect = printArea.getBoundingClientRect();

    element.style.position = "absolute";
    element.style.left = "0px";
    element.style.top = "0px";
    element.style.maxWidth = `${rect.width}px`;
    element.style.maxHeight = `${rect.height}px`;
    element.style.overflow = "hidden";
}

// Upload Image Functionality
document.getElementById("upload").addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "100px";  // Default size
            img.style.height = "auto";
            img.style.cursor = "pointer";

            constrainToPrintArea(img);
            document.getElementById("printarea-front").appendChild(img);

            toggleDraggable(img); 
            addScalerHandle(img);  // Add scaling handle to image
        }
    };
    input.click();
});

// Add Text Functionality
document.getElementById("add-text").addEventListener("click", function () {
    const textElement = document.createElement("div");
    textElement.contentEditable = true;
    textElement.innerText = document.getElementById("inputText").value;
    textElement.style.fontSize = document.getElementById("fontsize").value + "px";
    textElement.style.color = document.getElementById("fontcolor").value;
    textElement.style.cursor = "pointer";
    textElement.style.border = "1px dashed #000";

    constrainToPrintArea(textElement);
    document.getElementById("printarea-front").appendChild(textElement);

    toggleDraggable(textElement);
    addScalerHandle(textElement);  // Add scaling handle to text
});

// Toggle Draggable Functionality
function toggleDraggable(element) {
    let isDraggable = false;

    element.addEventListener("click", function () {


        if (isDraggable) {
            enableDrag(element);
        isDraggable = !isDraggable;
        element.style.border = isDraggable ? "2px solid #007bff" : "none";  // Visual cue
        } else {
            disableDrag(element);
        isDraggable = !isDraggable;
        element.style.border = isDraggable ? "2px solid #007bff" : "none";  // Visual cue
        }
    });
}

function enableDrag(element) {
    let offsetX, offsetY;

    element.addEventListener("mousedown", function (e) {
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        function onMouseMove(e) {
            const printArea = document.getElementById("printarea-front").getBoundingClientRect();
            let newLeft = e.clientX - printArea.left - offsetX;
            let newTop = e.clientY - printArea.top - offsetY;

            newLeft = Math.max(0, Math.min(newLeft, printArea.width - element.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, printArea.height - element.offsetHeight));

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove);
        }, { once: true });
    });
}

function disableDrag(element) {
    element.removeEventListener("mousedown", enableDrag);
}

// Add Scaling Handle to Any Element
function addScalerHandle(element) {
    const scaler = document.createElement("div");
    scaler.style.width = "10px";
    scaler.style.height = "10px";
    scaler.style.background = "#000";
    scaler.style.position = "absolute";
    scaler.style.right = "0";
    scaler.style.bottom = "0";
    scaler.style.cursor = "nwse-resize";
    scaler.style.zIndex = "9999";  // Ensure handle stays on top

    element.appendChild(scaler);

    scaler.addEventListener("mousedown", function (e) {
        e.stopPropagation();  // Prevent interference with dragging
        const rect = element.getBoundingClientRect();

        function onMouseMove(e) {
            const scaleX = (e.clientX - rect.left) / rect.width;
            const scaleY = (e.clientY - rect.top) / rect.height;
            const scale = Math.max(scaleX, scaleY);  // Maintain aspect ratio

            element.style.transform = `scale(${scale})`;
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove);
        }, { once: true });
    });
}// Remove white brooo

// Function to remove near-white pixels from an image
function removeWhiteFromImage(imageElement, tolerance = 100) {
    // Create an offscreen canvas to process the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through each pixel and set near-white pixels to transparent
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white, set it to transparent
        if (r > tolerance && g > tolerance && b > tolerance) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
    }

    // Update the image with the modified pixels
    ctx.putImageData(imageData, 0, 0);
    imageElement.src = canvas.toDataURL(); // Replace image source with processed data
}

// Listen for the "Remove White" checkbox change event
document.getElementById("remove-white").addEventListener("change", function () {
    const printAreaFront = document.getElementById("printarea-front");
    const image = printAreaFront.querySelector("img"); // Get the uploaded image within `printarea-front`

    if (this.checked && image) {
        // Apply remove white effect to the image
        removeWhiteFromImage(image, 230); // Adjust tolerance as needed
    } else if (image) {
        // Reload the original image if unchecked
        image.src = image.getAttribute("data-original-src");
    }
});

// Modify the Upload Image Functionality to set up `data-original-src`
document.getElementById("upload").addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.setAttribute("data-original-src", img.src); // Save original image source
            img.style.width = "100%"; // Fit within print area
            img.style.height = "100%";

            const printAreaFront = document.getElementById("printarea-front");
            printAreaFront.innerHTML = ""; // Clear existing children
            printAreaFront.appendChild(img); // Add as child of `printarea-front`
        }
    };
    input.click();
});

// Update Text Functionality
document.getElementById("update-text").addEventListener("click", function () {
    const activeText = document.querySelector("#printarea-front div[contenteditable='true']:focus");
    if (activeText) {
        activeText.style.fontSize = document.getElementById("fontsize").value + "px";
        activeText.style.color = document.getElementById("fontcolor").value;
    }
});




