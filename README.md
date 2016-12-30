# avs-tester

A command line utility for sending Alexa requests using MP3 files, for use in automating testing.

## Pre-requisites

* Tested using Node 6.1.0, though it should work with 0.12.X and above.
  * NOTE: For Mac users, the default version installed via brew is only 0.10.X.

## How to use it

1. Create an AVS device if you don't already have one:  https://developer.amazon.com/
  * More detailed instructions under "Registering Your Device and Creating a Security Profile" at:  https://developer.amazon.com/public/solutions/alexa/alexa-voice-service/docs/java-client-sample
2. Clone the project:

        git clone git@github.com:rejamison/avs-tester.git
3. Edit config.js to set the Client ID, Client Secret and Product ID from your AVS device configuration.
4. Run the LWA webapp component to perform an OAuth exchange to retrieve a Refresh Token you'll use to authenticate as the Alexa user when using the tool:


        cd lwa-server
        openssl genrsa 2048 > key.pem  # generate a private key
        openssl req -x509 -new -key key.pem -out cert.pem  # generate a test certificate
        npm install
        sudo npm start
  * Open a browser window to https://localhost/
    * Because you're using a test certificate, your browser will probably ask you to confirm.
  * Login using an Amazon user account.
    * If this isn't working, it's probably because you haven't whitelisted your webapp URL above.
  * Add the Refresh Token to config.js.
  * You can stop the server, you only need it for the OAuth exchange to get the refresh token.
5. Create an MP3 or WAV file using your favorite tool.
6. Run the tool to submit the request to Alexa:

        node index.js your_file.mp3
