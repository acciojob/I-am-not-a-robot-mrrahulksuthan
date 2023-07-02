//your code here
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Function to check if all clicked images are identical
const checkIdenticalImages = () => {
  const clickedImages = Array.from(document.querySelectorAll(".clicked"));
  if (clickedImages.length === 2) {
    const imageClass1 = clickedImages[0].className;
    const imageClass2 = clickedImages[1].className;
    return imageClass1 === imageClass2;
  }
  return false;
};

// Function to handle image click event
const handleImageClick = (event) => {
  const clickedImage = event.target;

  // Do nothing if the clicked image is already clicked
  if (clickedImage.classList.contains("clicked")) {
    return;
  }

  // Add clicked class to the clicked image
  clickedImage.classList.add("clicked");

  // Show reset button when at least one image is clicked
  resetButton.style.display = "block";

  // Check if two images are clicked
  const clickedImages = Array.from(document.querySelectorAll(".clicked"));
  if (clickedImages.length === 2) {
    // Disable image click event
    images.forEach((image) => {
      image.removeEventListener("click", handleImageClick);
    });

    // Show verify button
    verifyButton.style.display = "block";

    // Check if the clicked images are identical
    const identicalImages = checkIdenticalImages();
    if (identicalImages) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
};

// Function to reset the state and clear the clicked images
const resetState = () => {
  images.forEach((image) => {
    image.classList.remove("clicked");
    image.addEventListener("click", handleImageClick);
  });

  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  para.textContent = "";
};

// Get the main container
const mainContainer = document.querySelector("main");

// Create the h3 tag with the message
const h3 = document.createElement("h3");
h3.setAttribute("id", "h");
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
mainContainer.appendChild(h3);

// Create the image tags
const imageUrls = [
  "https://via.placeholder.com/150?text=Image+1",
  "https://via.placeholder.com/150?text=Image+2",
  "https://via.placeholder.com/150?text=Image+3",
  "https://via.placeholder.com/150?text=Image+4",
  "https://via.placeholder.com/150?text=Image+5",
  "https://via.placeholder.com/150?text=Image+6",
];
shuffleArray(imageUrls);

const images = [];
for (let i = 0; i < 6; i++) {
  const img = document.createElement("img");
  img.setAttribute("src", imageUrls[i]);
  img.setAttribute("alt", "Image " + (i + 1));
  img.setAttribute("class", "img" + (i + 1));
  img.addEventListener("click", handleImageClick);
  images.push(img);
  mainContainer.appendChild(img);
}

// Create the reset button
const resetButton = document.createElement("button");
resetButton.setAttribute("id", "reset");
resetButton.textContent = "Reset";
resetButton.style.display = "none";
resetButton.addEventListener("click", resetState);
mainContainer.appendChild(resetButton);

// Create the verify button
const verifyButton = document.createElement("button");
verifyButton.setAttribute("id", "verify");
verifyButton.textContent = "Verify";
verifyButton.style.display = "none";
verifyButton.addEventListener("click", () => {
  verifyButton.style.display = "none";
});
mainContainer.appendChild(verifyButton);

// Create the paragraph for result message
const para = document.createElement("p");
para.setAttribute("id", "para");
mainContainer.appendChild(para);
