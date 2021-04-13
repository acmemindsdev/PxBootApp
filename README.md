# PxBootApp

## Getting started

### Required Visual Studio Code Extensions

- stylelint
- Prettier
- Code Spell Checker
- VS Code Styled Components

## Install Typescript Dependencies (if not installed)

// Run Below commands on terminal

- `yarn add --dev typescript`
- `yarn add --dev react-native-typescript-transformer`
- `yarn tsc --init --pretty --jsx react`
- `touch rn-cli.config.js`
- `yarn add --dev @types/react @types/react-native`

// Convert all .js extension into .ts and .jsx into .tsx

## AWS Installation

install the Amplify CLI.

- `npm install -g @aws-amplify/cli`

Configure Amplify by running the following command:

- `amplify configure`

amplify configure will ask you to sign into the AWS Console.
Once you’re signed in, Amplify CLI will ask you to create an IAM user.

#### Step 1

Specify the AWS Region
? region: # Your preferred region
Specify the username of the new IAM user:
? user name: # User name for Amplify IAM user
Complete the user creation using the AWS console

Once the user is created, Amplify CLI will ask you to provide the accessKeyId and the secretAccessKey to connect Amplify CLI with your newly created IAM user.

##### Step 2

Enter the access key of the newly created user:
? accessKeyId: # YOUR_ACCESS_KEY_ID
? secretAccessKey: # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name: # (default)

Successfully set up the new user.

#### Step 3

- `amplify init`

## Authentication with Amplify

### Create authentication service

- `amplify add auth` // ("amplify update auth" if already configured)

Do you want to use the default authentication and security configuration?

- select "Default configuration with Social Provider (Federation)"

? How do you want users to be able to sign in?

- select "Phone Number"

// Enter Provided social media ids

Enter redirectSignIn Url

- pxboost://pxboost

Enter redirectSignOut Url

- pxboost://pxboost

? Do you want to configure advanced settings?

- select "No, I am done."

To deploy the service, run the push command:

- `amplify push`

## Add Amplify to your app:

- `npm install aws-amplify amazon-cognito-identity-js @react-native-community/netinfo`

### Pod install for ios

- `cd ios`
- `pod install`

// Add Deep linking for iOS and Android
