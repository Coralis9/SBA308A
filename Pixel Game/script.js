// GAME LOGIC
  
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Track number of images loaded
let imagesLoaded = 0;
const totalImages = 5; // Map + 4 player sprites

// Load Map Image
const mapImage = new Image();
mapImage.src = "./Img/PixelGameMap.png";
mapImage.onload = () => {
    console.log("Map image loaded successfully!");
    checkImagesLoaded();
};

// Load Player Sprites
const playerSprites = {
    down: new Image(),
    left: new Image(),
    right: new Image(),
    up: new Image(),
};

// Set source paths
playerSprites.down.src = "./Img/playerDown.png";
playerSprites.left.src = "./Img/playerLeft.png";
playerSprites.right.src = "./Img/playerRight.png";
playerSprites.up.src = "./Img/playerUp.png";

// Load images and track loading
Object.values(playerSprites).forEach((img) => {
    img.onload = () => {
        console.log(`${img.src} loaded successfully!`);
        checkImagesLoaded();
    };
});

// Ensure game starts only when all images are loaded
function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        console.log("All images loaded successfully! Starting game...");
        gameLoop();
    }
}

// Player properties
const player = {
    x: canvas.width / 2 - 24,
    y: canvas.height / 2 - 24,
    width: 48,
    height: 48,
    speed: 3,
    dx: 0,
    dy: 0,
    sprite: playerSprites.down, 
};

// Handle key events for movement
const keys = {};
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
    updateDirection();
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
    updateDirection();
});


function updateDirection() {
    if (keys["ArrowRight"] || keys["d"]) {
        player.dx = player.speed;
        player.sprite = playerSprites.right;
    } else if (keys["ArrowLeft"] || keys["a"]) {
        player.dx = -player.speed;
        player.sprite = playerSprites.left;
    } else {
        player.dx = 0;
    }

    if (keys["ArrowDown"] || keys["s"]) {
        player.dy = player.speed;
        player.sprite = playerSprites.down;
    } else if (keys["ArrowUp"] || keys["w"]) {
        player.dy = -player.speed;
        player.sprite = playerSprites.up;
    } else {
        player.dy = 0;
    }
}


function update() {
    player.x += player.dx;
    player.y += player.dy;

    // Keep player inside the canvas
    player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
}

// Draw game elements
function draw() {
    if (!mapImage.complete) {
        console.warn("Map image not loaded yet.");
        return;
    }
    if (!player.sprite.complete) {
        console.warn("Player sprite images not loaded yet.");
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);

}






// const canvas = document.getElementById("PixelGame");
// const ctx = canvas.getContext("2d");

// canvas.width = 800;
// canvas.height = 600;

// // Load Map Image
// const mapImage = new Image();
// mapImage.src = "./Img/PixelGameMap.png";
// mapImage.onload = () => {
//     console.log("Map Image Loaded Successfully!");
// };
// mapImage.onerror = (e) => {
//     console.error("Error loading map image:", e);
// };

// // Load Player Directional Images
// const playerDownImage = new Image();
// playerDownImage.src = "./Img/playerDown.png";

// const playerLeftImage = new Image();
// playerLeftImage.src = "./Img/playerLeft.png";

// const playerRightImage = new Image();
// playerRightImage.src = "./Img/playerRight.png";

// const playerUpImage = new Image();
// playerUpImage.src = "./Img/playerUp.png";

// // Player properties
// const player = {
//     x: canvas.width / 2 - 24, // Center of canvas
//     y: canvas.height / 2 - 24,
//     width: 48,
//     height: 48,
//     speed: 3,
//     dx: 0,
//     dy: 0,
//     direction: "down", // Default direction
// };

// // Handle key events
// const keys = {};
// document.addEventListener("keydown", (event) => {
//     keys[event.key] = true;
//     updateDirection();
// });
// document.addEventListener("keyup", (event) => {
//     keys[event.key] = false;
//     updateDirection();
// });

// // Update direction based on key press
// function updateDirection() {
//     let moving = false;

//     if (keys["ArrowRight"] || keys["d"]) {
//         player.dx = player.speed;
//         player.direction = "right"; // Set to right-facing
//         moving = true;
//     } else if (keys["ArrowLeft"] || keys["a"]) {
//         player.dx = -player.speed;
//         player.direction = "left"; // Set to left-facing
//         moving = true;
//     } else {
//         player.dx = 0;
//     }

//     if (keys["ArrowDown"] || keys["s"]) {
//         player.dy = player.speed;
//         player.direction = "down"; // Set to down-facing
//         moving = true;
//     } else if (keys["ArrowUp"] || keys["w"]) {
//         player.dy = -player.speed;
//         player.direction = "up"; // Set to up-facing
//         moving = true;
//     } else {
//         player.dy = 0;
//     }
// }

// // Draw Player
// function drawPlayer() {
//     let playerImage;

//     switch (player.direction) {
//         case "down":
//             playerImage = playerDownImage;
//             break;
//         case "left":
//             playerImage = playerLeftImage;
//             break;
//         case "right":
//             playerImage = playerRightImage;
//             break;
//         case "up":
//             playerImage = playerUpImage;
//             break;
//         default:
//             playerImage = playerDownImage; // Default to down-facing if no direction set
//     }

//     ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
// }

// // Update game state
// function update() {
//     player.x += player.dx;
//     player.y += player.dy;

//     // Keep player inside the canvas
//     player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
//     player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
// }

// // Draw game elements
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw Map (if loaded)
//     if (mapImage.complete) {
//         ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
//     } else {
//         console.warn("Map image not loaded yet.");
//     }

//     // Draw Player (if loaded)
//     if (
//         playerDownImage.complete &&
//         playerLeftImage.complete &&
//         playerRightImage.complete &&
//         playerUpImage.complete
//     ) {
//         drawPlayer();
//     } else {
//         console.warn("Player sprite images not loaded yet.");
//     }
// }

// // Game Loop
// function gameLoop() {
//     update();
//     draw();
//     requestAnimationFrame(gameLoop);
// }

// // Start the game loop
// gameLoop();



// const canvas = document.getElementById("PixelGame");
// const ctx = canvas.getContext("2d");

// // Set canvas size
// canvas.width = 800;
// canvas.height = 600;

// // Load Map Image
// const mapImage = new Image();
// mapImage.src = "./Img/PixelGameMap.png"; 
// let mapLoaded = false;
// mapImage.onload = () => {
//     mapLoaded = true;
// };

// // Load Player Sprite Sheet
// const playerImage = new Image();
// playerImage.src = "./Img/playerSprites.png"; 
// let playerLoaded = false;
// playerImage.onload = () => {
//     playerLoaded = true;
// };

// // Player object
// const player = {
//     x: canvas.width / 2 - 24, // Center player
//     y: canvas.height / 2 - 24,
//     width: 48,  // Size of one frame
//     height: 48,
//     speed: 3,
//     dx: 0,
//     dy: 0,
//     frameX: 0, // Current frame in animation (0-3)
//     frameY: 0, // Row in sprite sheet (0 = down, 1 = left, 2 = right, 3 = up)
//     totalFrames: 4, // Total frames per animation
//     animationSpeed: 10, // Speed of animation
//     frameIndex: 0 // Animation counter
// };

// // Key tracking
// const keys = {};
// document.addEventListener("keydown", (event) => {
//     keys[event.key] = true;
//     updateDirection();
// });

// document.addEventListener("keyup", (event) => {
//     keys[event.key] = false;
//     updateDirection();
// });

// // Update direction based on key presses
// function updateDirection() {
//     let moving = false;

//     if (keys["ArrowRight"] || keys["d"]) {
//         player.dx = player.speed;
//         player.frameY = 2; // Right row
//         moving = true;
//     } else if (keys["ArrowLeft"] || keys["a"]) {
//         player.dx = -player.speed;
//         player.frameY = 1; // Left row
//         moving = true;
//     } else {
//         player.dx = 0;
//     }

//     if (keys["ArrowDown"] || keys["s"]) {
//         player.dy = player.speed;
//         player.frameY = 0; // Down row
//         moving = true;
//     } else if (keys["ArrowUp"] || keys["w"]) {
//         player.dy = -player.speed;
//         player.frameY = 3; // Up row
//         moving = true;
//     } else {
//         player.dy = 0;
//     }

//     if (!moving) {
//         player.frameX = 0; // Reset animation when idle
//     }
// }

// // Animate Player Movement
// function animatePlayer() {
//     if (player.dx !== 0 || player.dy !== 0) {
//         player.frameIndex++;
//         if (player.frameIndex >= player.animationSpeed) {
//             player.frameX = (player.frameX + 1) % player.totalFrames; // Loop frames
//             player.frameIndex = 0;
//         }
//     } else {
//         player.frameX = 0; // Reset to idle frame
//     }
// }

// // Update game state
// function update() {
//     player.x += player.dx;
//     player.y += player.dy;

//     // Keep player inside the canvas
//     player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
//     player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));

//     animatePlayer();
// }

// // Draw everything
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (mapLoaded) {
//         ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
//     }

//     if (playerLoaded) {
//         const frameWidth = 48; 
//         const frameHeight = 48; 

//         ctx.drawImage(
//             playerImage, 
//             player.frameX * frameWidth, player.frameY * frameHeight, // Crop position (X, Y)
//             frameWidth, frameHeight, // Crop size
//             player.x, player.y, // Position on canvas
//             player.width, player.height // Render size
//         );
//     }
// }

// // Game loop
// function gameLoop() {
//     update();
//     draw();
//     requestAnimationFrame(gameLoop);
// }

// // Start game
// gameLoop();



//  const canvas = document.getElementById("PixelGame");
//  const ctx = canvas.getContext("2d");
 
//  // Set Canvas Size
//  canvas.width = 800;
//  canvas.height = 600;
 
//  // Load Map Image
//  const mapImage = new Image();
//  mapImage.src = "./Img/Pixel Game Map.png";
 
//  // Ensure Map is Loaded
//  let mapLoaded = false;
//  mapImage.onload = () => {
//      mapLoaded = true;
//  };
 
//  // Load Player Sprite Sheet (contains all directions & animations)
//  const playerImage = new Image();
//  playerImage.src = "./Img/playerSprites.png"; // One sprite sheet for all directions
 
//  let playerLoaded = false;
//  playerImage.onload = () => {
//      playerLoaded = true;
//  };
 
//  // Player Object
//  const player = {
//      x: 400,
//      y: 300,
//      width: 48,  // Width of a single sprite
//      height: 48, // Height of a single sprite
//      speed: 3,
//      dx: 0,
//      dy: 0,
//      direction: "down", // Default direction
//      frameX: 0, // Current frame in animation
//      frameY: 0, // Row in sprite sheet (depends on direction)
//      totalFrames: 4, // Total frames per animation
//      animationSpeed: 10, // Speed of animation
//      frameIndex: 0 // Animation cycle counter
//  };
 
//  // Handle Key Events
//  const keys = {};
//  document.addEventListener("keydown", (event) => {
//      keys[event.key] = true;
//      updateDirection();
//  });
 
//  document.addEventListener("keyup", (event) => {
//      keys[event.key] = false;
//      updateDirection();
//  });
 
//  // Update Player Direction
//  function updateDirection() {
//      let moving = false;
 
//      if (keys["ArrowRight"] || keys["d"]) {
//          player.dx = player.speed;
//          player.direction = "right";
//          player.frameY = 2; // Right direction row
//          moving = true;
//      } else if (keys["ArrowLeft"] || keys["a"]) {
//          player.dx = -player.speed;
//          player.direction = "left";
//          player.frameY = 1; // Left direction row
//          moving = true;
//      } else {
//          player.dx = 0;
//      }
 
//      if (keys["ArrowDown"] || keys["s"]) {
//          player.dy = player.speed;
//          player.direction = "down";
//          player.frameY = 0; // Down direction row
//          moving = true;
//      } else if (keys["ArrowUp"] || keys["w"]) {
//          player.dy = -player.speed;
//          player.direction = "up";
//          player.frameY = 3; // Up direction row
//          moving = true;
//      } else {
//          player.dy = 0;
//      }
 
//      if (!moving) {
//          player.frameX = 0; // Reset animation to first frame when idle
//      }
//  }
 
//  // Keep Player Inside Canvas
//  function update() {
//      player.x += player.dx;
//      player.y += player.dy;
 
//      player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
//      player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
//  }
 
//  // Animate Player Movement
//  function animatePlayer() {
//      if (player.dx !== 0 || player.dy !== 0) {
//          player.frameIndex++;
//          if (player.frameIndex >= player.animationSpeed) {
//              player.frameX = (player.frameX + 1) % player.totalFrames; // Loop through frames
//              player.frameIndex = 0;
//          }
//      } else {
//          player.frameX = 0; // Reset to idle frame
//      }
//  }
 
//  // Draw Player from Sprite Sheet (Crop Correct Frame)
//  function drawPlayer() {
//      const frameWidth = 48; // Width of one frame in the sprite sheet
//      const frameHeight = 48; // Height of one frame in the sprite sheet
 
//      ctx.drawImage(
//          playerImage, // Source sprite sheet
//          player.frameX * frameWidth, player.frameY * frameHeight, // Crop from sheet (X, Y)
//          frameWidth, frameHeight, // Crop size
//          player.x, player.y, // Position on canvas
//          player.width, player.height // Render size
//      );
//  }
 
//  // Draw Game
//  function draw() {
//      ctx.clearRect(0, 0, canvas.width, canvas.height);
 
//      if (mapLoaded) {
//          ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
//      }
 
//      if (playerLoaded) {
//          drawPlayer();
//      }
//  }
 
//  // Game Loop
//  function gameLoop() {
//      update();
//      animatePlayer();
//      draw();
//      requestAnimationFrame(gameLoop);
//  }
 
//  // Start Game
//  gameLoop();


// const canvas = document.getElementById("PixelGame");
// const ctx = canvas.getContext("2d");

// // Set Canvas Size
// canvas.width = 800;
// canvas.height = 600;

// // Load Map Image
// const mapImage = new Image();
// mapImage.src = "./Img/Pixel Game Map.png";

// // Ensure Map is Loaded
// let mapLoaded = false;
// mapImage.onload = () => {
//     mapLoaded = true;
// };

// // Load Player Images (for different directions)
// const playerImages = {
//     down: new Image(),
//     up: new Image(),
//     left: new Image(),
//     right: new Image()
// };

// playerImages.down.src = "./Img/playerDown.png";
// playerImages.up.src = "./Img/playerUp.png";
// playerImages.left.src = "./Img/playerLeft.png";
// playerImages.right.src = "./Img/playerRight.png";

// // Ensure Player Images Are Loaded
// let playerLoaded = false;
// playerImages.down.onload = playerImages.up.onload = playerImages.left.onload = playerImages.right.onload = () => {
//     playerLoaded = true;
// };

// // Player Object
// const player = {
//     x: 400,
//     y: 300,
//     width: 48,  // Width of a single frame (if using sprite sheets)
//     height: 48, // Height of a single frame (if using sprite sheets)
//     speed: 3,
//     dx: 0,
//     dy: 0,
//     direction: "down", // Default direction
// };

// // Handle Key Events
// const keys = {};
// document.addEventListener("keydown", (event) => {
//     keys[event.key] = true;
//     updateDirection();
// });

// document.addEventListener("keyup", (event) => {
//     keys[event.key] = false;
//     updateDirection();
// });

// // Update Player Direction
// function updateDirection() {
//     if (keys["ArrowRight"] || keys["d"]) {
//         player.dx = player.speed;
//         player.direction = "right";
//     } else if (keys["ArrowLeft"] || keys["a"]) {
//         player.dx = -player.speed;
//         player.direction = "left";
//     } else {
//         player.dx = 0;
//     }

//     if (keys["ArrowDown"] || keys["s"]) {
//         player.dy = player.speed;
//         player.direction = "down";
//     } else if (keys["ArrowUp"] || keys["w"]) {
//         player.dy = -player.speed;
//         player.direction = "up";
//     } else {
//         player.dy = 0;
//     }
// }

// // Keep Player Inside Canvas
// function update() {
//     player.x += player.dx;
//     player.y += player.dy;

//     player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
//     player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
// }

// // Draw Player
// function drawPlayer() {
//     ctx.drawImage(playerImages[player.direction], player.x, player.y, player.width, player.height);
// }

// // Draw Game
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (mapLoaded) {
//         ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
//     }

//     if (playerLoaded) {
//         drawPlayer();
//     }
// }

// // Game Loop
// function gameLoop() {
//     update();
//     draw();
//     requestAnimationFrame(gameLoop);
// }

// // Start Game
// gameLoop();


// const canvas = document.getElementById("PixelGame");
// const ctx = canvas.getContext("2d");

// // Set canvas size
// canvas.width = 800;
// canvas.height = 600;

// // Load Map Image
// const mapImage = new Image();
// mapImage.src = "./Img/Pixel Game Map.png";

// let mapLoaded = false;
// mapImage.onload = () => {
//     mapLoaded = true;
// };

// // Load Player Image
// const playerImage = new Image();
// playerImage.src = "./Img/playerDown.png";

// let playerLoaded = false;
// playerImage.onload = () => {
//     playerLoaded = true;
// };

// // Player properties
// const player = {
//     x: 400,
//     y: 300,
//     width: 48,
//     height: 48,
//     speed: 3,
//     dx: 0,
//     dy: 0,
//     direction: "down"
// };

// const playerImages = {
//     down: new Image(),
//     up: new Image(),
//     left: new Image(),
//     right: new Image()
// };

// playerImages.down.src = "./Img/playerDown.png";
// playerImages.up.src = "./Img/playerUp.png";
// playerImages.left.src = "./Img/playerLeft.png";
// playerImages.right.src = "./Img/playerRight.png";


// // Handle key events
// const keys = {};
// document.addEventListener("keydown", (event) => {
//     keys[event.key] = true;
//     updateDirection();
// });

// document.addEventListener("keyup", (event) => {
//     keys[event.key] = false;
//     updateDirection();
// });

// function updateDirection() {
//     if (keys["ArrowRight"] || keys["d"]) {
//         player.dx = player.speed;
//         player.direction = "right";
//     } else if (keys["ArrowLeft"] || keys["a"]) {
//         player.dx = -player.speed;
//         player.direction = "left";
//     } else {
//         player.dx = 0;
//     }

//     if (keys["ArrowDown"] || keys["s"]) {
//         player.dy = player.speed;
//         player.direction = "down";
//     } else if (keys["ArrowUp"] || keys["w"]) {
//         player.dy = -player.speed;
//         player.direction = "up";
//     } else {
//         player.dy = 0;
//     }
// }

// //     player.dx = (keys["ArrowRight"] || keys["d"]) ? player.speed : (keys["ArrowLeft"] || keys["a"]) ? -player.speed : 0;
// //     player.dy = (keys["ArrowDown"] || keys["s"]) ? player.speed : (keys["ArrowUp"] || keys["w"]) ? -player.speed : 0;
// // }

// // Update game state
// function update() {
//     player.x += player.dx;
//     player.y += player.dy;

//     // Keep player inside the canvas
//     player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
//     player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
// }

// // Render game objects

// function drawPlayer() {
//     ctx.drawImage(playerImages[player.direction], player.x, player.y, player.width, player.height);
// }

// const frameWidth = 48; // Width of a single sprite frame
// const frameHeight = 48; // Height of a single sprite frame
// let frameX = 0; // Controls which frame to render

// function drawPlayer() {
//     ctx.drawImage(
//         playerImages[player.direction], // Image source
//         frameX * frameWidth, 0, // Crop X, Y
//         frameWidth, frameHeight, // Crop width & height
//         player.x, player.y, // Draw position
//         player.width, player.height // Draw width & height
//     );
// }

// let frameIndex = 0;
// const totalFrames = 4; // Number of animation frames per direction
// const animationSpeed = 10; // Change frame every 10 loops

// function animatePlayer() {
//     if (player.dx !== 0 || player.dy !== 0) {
//         frameIndex++;
//         if (frameIndex >= animationSpeed) {
//             frameX = (frameX + 1) % totalFrames; // Loop through frames
//             frameIndex = 0;
//         }
//     } else {
//         frameX = 0; // Reset to first frame when idle
//     }
// }

// function gameLoop() {
//     update();
//     animatePlayer(); // Animate player movement
//     draw();
//     requestAnimationFrame(gameLoop);
// }


// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (mapLoaded) {
//         ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
//     }

//     if (playerLoaded) {
//         ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
//     }
// }


// Game loop
// function gameLoop() {
//     update();
//     draw();
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();


// const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");

// canvas.width = 1024;
// canvas.height = 576;

// // Background color
// c.fillStyle = "white";
// c.fillRect(0, 0, canvas.width, canvas.height);

// // Load Map Image
// const mapImage = new Image();
// mapImage.src = "./Img/Pixel Game Map.png";

// mapImage.onload = () => {
//     c.drawImage(mapImage, -650, -550);
//     drawPlayer(); 
// };

// // Load Player Image
// const playerImage = new Image();
// playerImage.src = "./Img/playerDown.png";

// function drawPlayer() {
//     const playerWidth = 48; 
//     const playerHeight = 48; 

//     playerImage.onload = () => {
//         c.drawImage(
//             playerImage,
//             canvas.width / 2 - playerWidth / 2,
//             canvas.height / 2 - playerHeight / 2,
//             playerWidth,
//             playerHeight
//         );
//     };
// }




// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// // Canvas size
// canvas.width = 800;
// canvas.height = 600;

// // Player properties
// const player = {
//     x: 50,
//     y: 50,
//     width: 32,
//     height: 32,
//     color: "red",
//     speed: 3,
//     dx: 0,
//     dy: 0
// };

// // Handle key events
// document.addEventListener("keydown", (event) => {
//     if (event.key === "ArrowRight" || event.key === "d") player.dx = player.speed;
//     if (event.key === "ArrowLeft" || event.key === "a") player.dx = -player.speed;
//     if (event.key === "ArrowUp" || event.key === "w") player.dy = -player.speed;
//     if (event.key === "ArrowDown" || event.key === "s") player.dy = player.speed;
// });

// document.addEventListener("keyup", () => {
//     player.dx = 0;
//     player.dy = 0;
// });

// // Update game state
// function update() {
//     player.x += player.dx;
//     player.y += player.dy;

//     // Keep player inside the canvas
//     if (player.x < 0) player.x = 0;
//     if (player.y < 0) player.y = 0;
//     if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
//     if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
// }

// // Render game objects
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = player.color;
//     ctx.fillRect(player.x, player.y, player.width, player.height);
// }

// // Game loop
// function gameLoop() {
//     update();
//     draw();
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();

// const canvas = document.querySelector ('canvas')
// const c = canvas.getContext('2d')

// canvas.width = 1024
// canvas.height = 576

// c.fillStyle = 'white'
// c.fillRect(0, 0, canvas.width, canvas.height)

// const image = new Image()
// image.src = './Img/Pixel Game Map.png'


// image.onload = () => {
//     c.drawImage(image, -650, -550) 
// }

// const playerImage = new Image ()
// playerImage.src = './Img/playerDown.png'

// playerImage.onload = () => {
//     c.drawImage(playerImage,
//     canvas.width / 2 - playerImage.width / 2, 
//     canvas.height / 2  ) 
// }