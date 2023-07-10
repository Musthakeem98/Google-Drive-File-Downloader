# Google Drive File Downloader

The "Google Drive File Downloader" project is a tool that allows you to find a specific folder within your Google Drive account and download files within that folder.

## Prerequisites

Before running the code, make sure you have the following prerequisites:

- Node.js and npm installed on your system
- Required dependencies installed (`googleapis`)

## Installation

1. Clone the repository:

   ```shell
   git clone <repository_url> ```
2. Navigate to the project directory:
	```shell
   cd Google-Drive-File-Downloader ```
   
3. Install the dependencies:
	   ```shell
   npm install ```
   
## Configuration   

- To use the "Google Drive File Downloader" tool, you need to configure your Google Drive API credentials:

1. Obtain your Google Drive API credentials:

	- Visit the Google Cloud Console.
	- Create a new project (or select an existing one).
	- Enable the Google Drive API for your project.
	- Create OAuth 2.0 credentials and note down the Client ID, Client Secret, and Redirect URI.
	- Obtain the Refresh Token by following the authentication process. Refer to the Google Drive API documentation for detailed instructions.

2. Update the configuration:

	- Open the app.js file in a text editor.
	- Replace the following placeholders with your Google Drive API credentials:
	- CLIENT_ID: Your Client ID from the Google Cloud Console.
	- CLIENT_SECRET: Your Client Secret from the Google Cloud Console.
	- REDIRECT_URI: Your Redirect URI from the Google Cloud Console.
	- REFRESH_TOKEN: Your Refresh Token obtained from the authentication process.
	
## To run the code:

```shell
node app.js ```	
