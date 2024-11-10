// /utils/promptConfig.ts

export interface PromptConfig {
    eta: number;
    scale: number;
    a_prompt: string;
    n_prompt: string;
    ddim_steps: number;
    num_samples: string;
    value_threshold: number;
    image_resolution: string;
    detect_resolution: number;
    distance_threshold: number;
}

export const promptConfig = {
    eta: 0,
    scale: 8.5,
    a_prompt:
        'best quality, high detail, realistic, sharp focus, high resolution, well-structured, professional lighting, clear textures, natural colors, home improvement, landscaping details, gardening focus, outdoor garden design, professionally crafted',
    n_prompt:
        'lowres, blurry, grainy, poor quality, distorted perspective, unfocused, cartoonish, oversaturated, fantasy, unrealistic elements, abstract shapes, messy composition, bad lighting, artifacts, overexposed',
    ddim_steps: 30,
    num_samples: '1',
    value_threshold: 0.1,
    image_resolution: '512',
    detect_resolution: 512,
    distance_threshold: 0.1,
};

// 1. Value Threshold:
// Description: This threshold controls the sensitivity of the line detection process based on the intensity of the pixels.

// Impact: It determines the minimum pixel intensity value (or gradient magnitude) that the algorithm should consider as part of a detected line. A lower value allows for more lines to be detected, as fainter edges or lines (with lower pixel intensities) will be picked up. A higher value restricts detection to more prominent, clearer lines.

// Typical Use: For example, if you set a value_threshold of 0.1, the algorithm will ignore any pixels with intensity values below that threshold. You can adjust this depending on the sharpness of lines in your image.

// 2. Distance Threshold:
// Description: This threshold controls the minimum distance between detected lines.

// Impact: It defines how far apart two lines must be for them to be considered separate by the algorithm. A smaller value means the algorithm will detect lines that are closer together, while a larger value will only detect lines that are sufficiently spaced apart.

// Typical Use: When the distance_threshold is set to 0.1, it will merge lines that are very close together. Increasing this value means only lines with more significant separation are detected as distinct.


// Both thresholds play a crucial role in refining the line detection process in the MLSD model of the Hough Transform pipeline. By adjusting these parameters, you can fine-tune the sensitivity of the line detection for different types of input images, balancing between detecting too many unnecessary lines and missing important structural details.
