// Check if the resolution is supported before setting it
const isResolutionSupported = (resolution) => {
  const { width, height } = resolution;
  // Add your custom resolution check logic here based on device capabilities
  // Example check for aspect ratio:
  const aspectRatio = width / height;
  return aspectRatio >= 0.7 && aspectRatio <= 1.5 && width <= 1920 && height <= 1080;
};

// Function to safely set the camera resolution
async function setCameraResolution(resolution) {
  if (isResolutionSupported(resolution)) {
    try {
      await Camera.setCameraResolutionAsync(resolution);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error setting camera resolution:', error);
      // Fallback to a supported resolution
      const fallbackResolution = { width: 640, height: 480 };
      await Camera.setCameraResolutionAsync(fallbackResolution);
    }
  } else {
    // Log warning and fallback
    console.warn('Unsupported resolution. Falling back to default.');
    const defaultResolution = { width: 640, height: 480 };
    await Camera.setCameraResolutionAsync(defaultResolution);
  }
}

//Usage
const resolution = { width: 1280, height: 720 };
setCameraResolution(resolution); 