import cv2
import sys
import numpy as np
import json
def main():
    file_name = "pixels.txt"
    with open(file_name,'r') as f:
        pixels = json.load(f)
        im = np.array(pixels)
        shape =  im.shape

        cv2.imwrite('contour_image.png',im)
main()
