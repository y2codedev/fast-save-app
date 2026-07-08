import { removeBackground } from "@imgly/background-removal";

self.addEventListener("message", async (event) => {
  try {
    const { image } = event.data;
    
    // Process the image using the heavy library
    const blob = await removeBackground(image);
    
    // Send the blob back to the main thread
    self.postMessage({ success: true, blob });
  } catch (error: any) {
    self.postMessage({ success: false, error: error.message || "Failed to remove background" });
  }
});
