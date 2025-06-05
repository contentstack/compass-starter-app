[![compass-starter-app](/public/contentstack-logo.png)](https://www.contentstack.com/)

# Compass Starter App

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

About this project: This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) used to build modern web applications.

![compass-starter-app](/public/starter-app.png)

##### Recommended Node version: v18.17.0 and App Supported till v22.11.0

## Getting Started

Refer [.env.sample](.env.sample) to set up your .env.local file in root directory

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Note: The url : http://localhost:3000 will have `en` attached to it resulting http://localhost:3000/en, set this url in Contentstack Stack Environment.

You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## Compass Starter Stack Content Repo

[Compass Starter Stack Content Repo](https://github.com/contentstack/compass-starter-stack)

### Note : Contentstack stack must have English as Master Language

To import this content to your stack, perform the following steps:

1. Install the CLI by running the following command in your terminal:

	```npm i -g @contentstack/cli@1.32.1``` 

2. By default, CLI uses the North America region. To use the Europe region, run this command in your terminal:

	```csdx config:set:region EU```

3. Next, log in to your Contentstack account via CLI:

	```csdx auth:login```

4. Create Compass Starter stack using CLI bootstrap command 

    ```csdx cm:bootstrap --app-name compass-app --project-dir <project-dir> --org <org-uid> -n <stack-name>```

Refer to the [Bootstrap command documentation](https://www.contentstack.com/docs/developers/cli/bootstrap-starter-apps) to learn more.

## Documentation

- [Contentstack documentation](https://www.contentstack.com/docs/)
- [Region support documentation](https://www.contentstack.com/docs/developers/selecting-region-in-contentstack-starter-apps)
- [Contentstack Typescript SDK](https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/typescript/reference)
- [Contentstack Personalize SDK](https://www.contentstack.com/docs/personalize), [Personalize Overview](https://www.contentstack.com/docs/personalize#personalize-overview)
- Visual Experince : 
	- [Live Preview](https://www.contentstack.com/docs/content-managers/author-content/about-live-preview/)
	- [Timeline](https://www.contentstack.com/docs/content-managers/timeline/)
	- [Visual Builder](https://www.contentstack.com/docs/content-managers/visual-builder/)
	- [Preview Sharing](https://www.contentstack.com/docs/content-managers/preview-sharing)

- [Next.js](https://learnnextjs.com/)
