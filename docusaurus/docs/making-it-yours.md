---
id: making-it-yours
title: Making it yours
---

## Styling 

The theme is defined in the client's `theme.js` file, along with global styles, and media queries breakpoints.

Every other styling, that belongs to a specific component, is defined inside the components with [styled-components](https://styled-components.com/).

```js title="frontend/src/config/theme.js"
colors: {
    main: '#36185e',
    neutral: '#f1f1f1',
    neutralText: '#757575',
    text: '#373c40',
    foreground: '#b1b1b1',
    light: '#ddd',
    link: '#553385'
},
fonts: {
    sizes: {
        small: '0.75rem',
        normal : '0.9rem',
        increased: '1.2rem',
        large: '1.55rem',
        big: '1.875rem',
        extraBig: '3.125rem'
    },
    families: {
        main: 'Roboto'
    }
},
spacing: {
    _10: '0.625rem',
    _15: '0.9375rem',
    _20: '1.25rem',
    _30: '1.875rem',
    _60: '3.75rem'
}
```

## Branding and content

General settings that concern strings, logo, company name, can be changed in `settings.json` file.

```json title="frontend/src/config/settings.json"
{
    "companyName" : "WeWorkIn XYZ",
    "headline" : "A community of professionals <br /><em>looking for their next opportunity</em>.",
    "description" : "We helped move industries before the global pandemic and we'll do it again.",
    "logoPath" : "/logo.svg",
    "contactEmail": "hello@company.com",
    "footerMenuItems": [
        {
            "label": "Data Privacy",
            "path": "/privacy"
        },
        {
            "label": "About us",
            "path": "/about-us"
        },
        {
            "label": "External Link",
            "path": "https://fortyfive.tech",
            "external": true
        }
    ],
    "register" : {
        "title" : "Register your profile",
        "description" : "When you register, your profile is being manually reviewed and published within a few hours."
    }
}
```

:::info 
Set `logoPath` to `false` if you do not have a logo. It will fallback to the company name. 
:::

## Environment variables

Being totally decoupled from the backend, the client has its own set of environment variables, located at the root of the `frontend` directory.

| Name | Type | Description |
| --- | --- | --- |
| `REACT_APP_GRAPHQL_ENDPOINT` | `string (required)` | GraphQL endpoint provided by Hasura |
| `REACT_APP_DOMAIN` | `string (required)` | URL where the frontend application runs |
| `REACT_APP_GA_TRACKING_ID` | `string (optional)` | Google Analytics tracking ID (UA-xxxxxxxxx-1). If not set, GA will be prevented from loading. Also, GA will be loaded only on user's consent. |
| `REACT_APP_CONSENT_COOKIE_NAME` | `string (optional)` | Cookie name for storing the user's consent. GA is loading conditionally based on this value. |

:::tip 

Create a .env.local file to overwrite values in .env. [Read more](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)
:::