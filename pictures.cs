using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace CybersecurityChatbot;

class Pictures
{
    public void ShowPicture()
    {
        try
        {
            string[] imagePaths = { "Hack.jpg",  "VPN.jpg" }; // Array for multiple images

            foreach (string imagePath in imagePaths)
            {
                if (!File.Exists(imagePath))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Image file not found: " + imagePath);
                    Console.ResetColor();
                    continue; // Skip to the next image
                }

                Bitmap image = new Bitmap(imagePath);
                int newWidth = 100; // Adjusted for better clarity
                int newHeight = (int)(image.Height * ((double)newWidth / image.Width));
                Bitmap resizedImage = new Bitmap(image, newWidth, newHeight);
                string asciiChars = "@%#*+=-:. ";

                for (int y = 0; y < resizedImage.Height; y++)
                {
                    for (int x = 0; x < resizedImage.Width; x++)
                    {
                        Color pixelColor = resizedImage.GetPixel(x, y);
                        int brightness = (int)(pixelColor.GetBrightness() * 9); // Scale correctly to asciiChars index
                        Console.Write(asciiChars[brightness]);
                    }
                    Console.WriteLine();
                }
                Console.WriteLine("\n"); // Separate images visually
            }
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("An error occurred: " + ex.Message);
            Console.ResetColor();
        }
        Console.ReadLine();
    }
}



