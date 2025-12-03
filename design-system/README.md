## Commands

Use `yarn install` to install all the required packages
Use `yarn rollup` to build the component library
Use `npm publish` to publish the package (Dont forget to increase the verison while publishing - follow https://semver.org/ for verisoning)

### Note - Building is must if you want to push your changes in the publish


## How to install the package

As our published package is private. Consumer must have the authToken with atleast the read access token. Refer to .npmrc file for more info.

Use `npm install @purity/design-system` to install the package.
manage the version from the package.json file in the Consuming project. 
Then simply run `yarn install` to get the mentioned version.



## Example on how to use the components

Import the components as shown below and use like any other components. Cheers!
`import { Button } from "@purity/design-system"`


## StoryBook

use `yarn storybook` to run the storybook. it will hosted on port 6006
use `yarn build-storybook` to build storybook



### Why we used 'dependencies'
react-tiny-popover - For popover implementation
recharts - For stackchart and piechart



### More Info Links

Rollup and ts
https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/

Tailwind for postcss
https://tailwindcss.com/docs/installation/using-postcss

Npm library
https://blog.harveydelaney.com/setting-up-a-private-npm-registry-publishing-ci-cd-pipeline/

Publishing 
https://hinammehra.medium.com/publish-a-private-react-component-library-part-ii-17e44f8a488e

Rollup and storybook
https://prateeksurana.me/blog/react-component-library-using-storybook-7/

Presets
https://tailwindcss.com/docs/presets

Copy plugin
https://www.npmjs.com/package/rollup-plugin-copy


issues -
Why we used webpack for storybook - https://github.com/storybookjs/storybook/discussions/13892

Issue faced when using vite - 
https://github.com/vitejs/vite/issues/13775

Known bug with wayaround -
https://github.com/storybookjs/storybook/issues/22431#issuecomment-1630086092

https://stackoverflow.com/questions/39232406/npm-not-working-cannot-find-module-strip-ansi