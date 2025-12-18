# Presto Codebase Analysis

Generated: $(date)

## Repository Structure

## Repository Structure
```
/Users/gaganmalik/Development/web-app-frontend/tailwind.config.js
/Users/gaganmalik/Development/web-app-frontend/package.json
/Users/gaganmalik/Development/web-app-frontend/tsconfig.json
```

## Package.json Files

### /Users/gaganmalik/Development/web-app-frontend/package.json
```json
{
  "name": "web-app-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@atlaskit/icon": "22.10.0",
    "@auth0/auth0-react": "^2.2.4",
    "@blocknote/core": "^0.24.0",
    "@blocknote/mantine": "^0.24.0",
    "@blocknote/react": "^0.24.0",
    "@defensestation/blocknote-comments": "^1.0.2",
    "@loadable/component": "5.15.2",
    "@presto-labs-ai/design-system-new": "^0.0.86",
    "@react-email/components": "0.0.34",
    "@react-email/markdown": "0.0.14",
    "@stripe/react-stripe-js": "^2.8.1",
    "@stripe/stripe-js": "^4.8.0",
    "aphrodite": "2.4.0",
    "axios": "^1.2.3",
    "date-fns": "^4.1.0",
    "firebase": "^10.1.0",
    "framer-motion": "^12.0.5",
    "html2pdf.js": "^0.10.2",
    "jwt-decode": "^3.1.2",
    "lodash.debounce": "^4.0.8",
    "marked": "^14.1.3",
    "md-to-react-email": "^5.0.5",
    "prism-react-renderer": "^2.4.1",
    "react": "18.2.0",
    "react-contenteditable": "^3.3.7",
```

## Build Configuration Files

### /Users/gaganmalik/Development/web-app-frontend/tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  presets: [require("@presto-labs-ai/design-system-new/dist/tailwind.config.js")],
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-motion")],
  darkMode: "class",
};
```

### /Users/gaganmalik/Development/web-app-frontend/src/.config.production.json
```
{
  "baseURL": "http://localhost:4000",
  "newBaseURLDev": "https://api.askpresto.com",
  "baseURLDev": "https://api.permi.tech",
  "apiKey": "AIzaSyBOYzm_PjXt_fDSuz5ah6PAYINTdH2R9hw",
  "authDomain": "permitech-b27fa.firebaseapp.com",
  "projectId": "permitech-b27fa",
  "storageBucket": "permitech-b27fa.appspot.com",
  "messagingSenderId": "899753964756",
  "appId": "1:899753964756:web:bd2c5e6767ceabbff47741",
  "measurementId": "G-W5D6D0R9TB",
  "stripePublishKey": "pk_test_51PMUoGARny0JTt946ltlMydJoP6sCDHW644BDTdUWbIIifhr12HK97uaa3VzQd4NoktfScSqy02S06NJnDJPzjyD00ULHISxaC",
  "auth0Domain": "presto.uk.auth0.com",
  "auth0ClientId": "GZcdUdXfDqAniTmGgLVcjd8pYw7beVWN",
  "googleClientId": "537315310869-55gqvker94i3jh1k10issvfveqjcvqk3.apps.googleusercontent.com",
  "googleDeveloperKey": "AIzaSyDfaW1DqGLqdLUh6untg0WI-2vjdBVLVaY"
}
```

### /Users/gaganmalik/Development/web-app-frontend/src/.config.staging.json
```
{
  "baseURL": "http://localhost:3001",
  "newBaseURLDev": "https://testbackend.askpresto.com",
  "baseURLDev": "https://api.permi.tech",

  "apiKey": "AIzaSyBOYzm_PjXt_fDSuz5ah6PAYINTdH2R9hw",
  "authDomain": "permitech-b27fa.firebaseapp.com",
  "projectId": "permitech-b27fa",
  "storageBucket": "permitech-b27fa.appspot.com",
  "messagingSenderId": "899753964756",
  "appId": "1:899753964756:web:bd2c5e6767ceabbff47741",
  "measurementId": "G-W5D6D0R9TB",
  "stripePublishKey": "pk_test_51PMUoGARny0JTt946ltlMydJoP6sCDHW644BDTdUWbIIifhr12HK97uaa3VzQd4NoktfScSqy02S06NJnDJPzjyD00ULHISxaC",
  "auth0Domain": "presto.uk.auth0.com",
  "auth0ClientId": "HIkV4F90hbj0K7PT7gGitT3g4a4Q7SfB",
  "googleClientId": "537315310869-8su8ai3gq96er1n7g33rbe5rg8mojntj.apps.googleusercontent.com",
  "googleDeveloperKey": "AIzaSyDfaW1DqGLqdLUh6untg0WI-2vjdBVLVaY"
}
```

### /Users/gaganmalik/Development/web-app-frontend/src/.config.development.json
```
{
  "baseURL": "http://localhost:4000",
  "newBaseURLDev": "https://testbackend.askpresto.com",
  "baseURLDev": "https://api.permi.tech",
  "apiKey": "AIzaSyBOYzm_PjXt_fDSuz5ah6PAYINTdH2R9hw",
  "authDomain": "permitech-b27fa.firebaseapp.com",
  "projectId": "permitech-b27fa",
  "storageBucket": "permitech-b27fa.appspot.com",
  "messagingSenderId": "899753964756",
  "appId": "1:899753964756:web:bd2c5e6767ceabbff47741",
  "measurementId": "G-W5D6D0R9TB",
  "stripePublishKey": "pk_test_51PMUoGARny0JTt946ltlMydJoP6sCDHW644BDTdUWbIIifhr12HK97uaa3VzQd4NoktfScSqy02S06NJnDJPzjyD00ULHISxaC",
  "auth0Domain": "presto.uk.auth0.com",
  "auth0ClientId": "HIkV4F90hbj0K7PT7gGitT3g4a4Q7SfB",
  "googleClientId": "537315310869-8su8ai3gq96er1n7g33rbe5rg8mojntj.apps.googleusercontent.com",
  "googleDeveloperKey": "AIzaSyDfaW1DqGLqdLUh6untg0WI-2vjdBVLVaY"
}
```

## Environment Configuration

## Database Files


## TypeScript Configuration

### /Users/gaganmalik/Development/web-app-frontend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

