const { google } = require('googleapis');

const CLIENT_ID = '863355816882-9qdl4bkgi8r5udc5d5i3hn1q85m81f70.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04VYRvh5KRtGpCgYIARAAGAQSNwF-L9IrkYeuRwWQx0H7wxuoLewP6uwfqaUlNM7z3ZJz7fYqwxfn7KxsM9LOGZlFnnc09qGm3kk';


const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

//-----------------Until Now Authentication code ----------------
async function getFolderId(folderName) {
    try {
        const response = await drive.files.list({
            q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
            fields: 'files(id)'
        });
        const folder = response.data.files;
        if (folder.length) {
            return folder[0].id;
        } else {
            console.log(`Folder '${folderName}' not found`);    
        }

    } catch (error) {
        console.log(error.message);
        return null;
    }
}


async function getFilesInFolder(folderName) {
  const folderId = await getFolderId(folderName);
  if (folderId) {
    try {
      const response = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(id, name)',
      });

      const files = response.data.files;
      if (files.length) {
        console.log(`Files in '${folderName}' Folder:`);
        files.forEach((file, index) => {
          console.log(`${index + 1}. ${file.name} (${file.id})`);
        });
        return files;
      } else {
        console.log(`No files found in '${folderName}' Folder.`);``
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return null;
}

function getFileId(files, fileNumber) {
  if (fileNumber >= 1 && fileNumber <= files.length) {
    return files[fileNumber - 1].id;
  }
  return null;
}

async function processUserInput(folderName, fileNumber) {
  const files = await getFilesInFolder(folderName);
  if (files) {
    const fileId = getFileId(files, fileNumber);
    if (fileId) {
      console.log(`Selected File ID: ${fileId}`);
      // Use the fileId variable for further code
      return fileId;
    } else {
      console.log('Invalid file number.');
    }
  }
}

const folderName = 'Project'; // Replace with the desired folder name
const fileNumber = 2; // Replace with the desired file number



async function generatePublicUrl() {
    const fileId = await processUserInput(folderName, fileNumber);
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
      const url =  result.data.webContentLink;
      return(url);
    } catch (error) {
      console.log(error.message);
    }
  }

  generatePublicUrl();  

//   async function downloadFile() {
//     const url1 = await generatePublicUrl();
//     const link = document.createElement('a');
//     link.href = url1;
//     link.download = '';
//     link.click();
//   }
  
//   downloadFile();
  
  
  
  
