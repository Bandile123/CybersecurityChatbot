// See https://aka.ms/new-console-template for more information
using System;
using static System.Console;
using System.Media;
using System.IO;
using System.Drawing;

namespace CybersecurityChatbot
{
    class CybersecurityChatbot
    {
        static void Main(string[] args)
        {
            // User login
            string username = Login();

            // Display ASCII logo
            DisplayAsciiLogo();

            // Play a greeting sound
            PlayGreetingSound();

            // Start the chatbot
            ForegroundColor = ConsoleColor.Cyan;
            WriteLine($"\nHello {username}! Welcome to the Cybersecurity Awareness Chatbot!");
            ResetColor();

            while (true)
            {
                DisplayMenu();
                ForegroundColor = ConsoleColor.Yellow;
                Write("\nSelect an option: ");
                ResetColor();
                string choice = ReadLine()?.ToLower();

                if (choice == "1")
                {
                    Chat();
                }
                else if (choice == "2")
                {
                    DisplayAsciiImage();
                }
                else if (choice == "3" || choice == "exit")
                {
                    ForegroundColor = ConsoleColor.Green;
                    WriteLine("\nChatbot: Thanks for chatting! Stay safe online. Goodbye!");
                    ResetColor();
                    break;
                }
                else
                {
                    ForegroundColor = ConsoleColor.Red;
                    WriteLine("\nInvalid option. Please try again.");
                    ResetColor();
                }
            }
        }

        static string Login()
        {
            ForegroundColor = ConsoleColor.Yellow;
            Write("Enter your username: ");
            ResetColor();
            string username = ReadLine();

            ForegroundColor = ConsoleColor.Yellow;
            Write("Enter your password: ");
            ResetColor();
            string password = ReadLine(); // This is for simplicity; in a real application, mask input.

            ForegroundColor = ConsoleColor.Green;
            WriteLine("\nLogin successful! Welcome, " + username + "!");
            ResetColor();
            return username;
        }

        static void DisplayAsciiLogo()
        {
            ForegroundColor = ConsoleColor.Magenta;
            WriteLine("======================================");
            WriteLine("|    WELCOME TO CYBER AWARE CHAT!    |");
            WriteLine("|  Stay Safe, Stay Aware Online!     |");
            WriteLine("======================================");
            ResetColor();
        }

        static void DisplayMenu()
        {
            ForegroundColor = ConsoleColor.Blue;
            WriteLine("\nMenu:");
            WriteLine("1. Chat about cybersecurity");
            WriteLine("2. View ASCII Image");
            WriteLine("3. Exit");
            ResetColor();
        }

        static void Chat()
        {
            while (true)
            {
                ForegroundColor = ConsoleColor.Yellow;
                Write("\nYou: ");
                ResetColor();
                string userInput = ReadLine()?.ToLower();

                if (userInput == "exit")
                {
                    ForegroundColor = ConsoleColor.Green;
                    WriteLine("\nChatbot: Returning to main menu.");
                    ResetColor();
                    break;
                }
                else if (userInput.Contains("password"))
                {
                    ForegroundColor = ConsoleColor.Green;
                    WriteLine("\nChatbot: Use strong passwords with a mix of letters, numbers, and special characters. Avoid reusing passwords.");
                    ResetColor();
                }
                else if (userInput.Contains("phishing"))
                {
                    ForegroundColor = ConsoleColor.Green;
                    WriteLine("\nChatbot: Be cautious of emails or links that ask for personal information. Verify the sender before clicking.");
                    ResetColor();
                }
                else if (userInput.Contains("vpn"))
                {
                    ForegroundColor = ConsoleColor.Green;
                    WriteLine("\nChatbot: VPNs encrypt your internet connection and help protect your privacy online.");
                    ResetColor();
                }
                else
                {
                    ForegroundColor = ConsoleColor.Red;
                    WriteLine("\nChatbot: I'm sorry, I don't understand that. Try asking about passwords, phishing, or VPNs.");
                    ResetColor();
                }
            }
        }

        static void DisplayAsciiImage()
        {
            try
            {
                string[] imagePaths = { "Hack.jpg", "VPN.jpg" }; // Array for multiple images

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
        

        static void PlayGreetingSound()
        {
            if (OperatingSystem.IsWindows())
            {
                try
                {
                    SoundPlayer player = new SoundPlayer("welcome .wav");
                    player.Load();
                    player.Play();
                }
                catch (Exception e)
                {
                    ForegroundColor = ConsoleColor.Red;
                    WriteLine("Error playing sound: " + e.Message);
                    ResetColor();
                }
            }
        }
    }
}