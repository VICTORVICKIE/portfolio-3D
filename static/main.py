import cv2
import numpy as np

# Load the image
img = cv2.imread('color.png')

# Define the lower and upper bounds of the colors you want to exclude
lower_bound = np.array([0, 0, 0]) # RGB: black
upper_bound = np.array([255, 255, 255]) # RGB: almost pure white

# Mask the image to exclude the specified colors
mask = cv2.inRange(img, lower_bound, upper_bound)
masked_img = cv2.bitwise_and(img, img, mask=mask)

# Convert the image to RGB format
rgb_img = cv2.cvtColor(masked_img, cv2.COLOR_BGR2RGB)

# Reshape the image into a 2D array of pixels
pixels = np.reshape(rgb_img, (-1, 3))

# Exclude yellow (R, G, B) = (255, 255, 0)
pixels = pixels[np.where((pixels[:, 0] != 255) | (pixels[:, 1] != 255) | (pixels[:, 2] != 0))]

# Find the most common color occurrences in the image
color_counts = np.unique(pixels, axis=0, return_counts=True)
most_common_colors = color_counts[0][np.argsort(color_counts[1])[::-1]]

# Print the top 10 most common colors in the image
colors = []
for i in range(10):
    color = most_common_colors[i]
    count = color_counts[1][np.where((color_counts[0][:, 0] == color[0]) & (color_counts[0][:, 1] == color[1]) & (color_counts[0][:, 2] == color[2]))][0]
    print(f"#{i+1}: RGB({color[0]}, {color[1]}, {color[2]}) - {count} occurrences")
    colors.append(color)

print(f"The average color is: RGB({int(np.average(np.array(colors)[:, 0]))}, {int(np.average(np.array(colors)[:, 1]))}, {int(np.average(np.array(colors)[:, 2]))})")