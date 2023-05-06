# Discord Name Sniper

> Please consider leaving a ⭐ on the repository to support me.

### Why?

> Discord just announced that they are moving to a new naming system. The new naming system removes the discriminators which means there will only be unique names. For a full understanding visit this Discord [article](https://support.discord.com/hc/en-us/articles/12620128861463-New-Usernames-Display-Names). But most importantly all discord users have to change their name. The older the account, the sooner you will be able to change your name, as stated in the article.

### Features

> - Multiple tokens
> - List of names to be sniped for each token
> - Customizeable delays
> - Webhook

### Config

> - `namelists` - Object containing lists of names. Example: `"mynames": ["iwannasnipethisname", "andthisonetoo"]`. The order is important in this case `iwannasnipethisname` has the highest priority in this list.
> - `accounts` - Array containing objects with a token and name list names. Example: `{ "token": "********.***.**************", "namelists": ["mynames"] }`. The same rules as before apply to the order of the lists of names.
> - `delays`
>   - `retry` - Number of seconds to wait before trying again if you are still not eligible for the name change.
>   - `nameRetry` - Number of seconds to wait before trying the next name in the list if you are eligible for the name change.
> - `webhook`
>   - `enabled` - Boolean that defines whether to use the webhook.
>   - `url` - Url of the webhook.
>   - `sendFailures` - Boolean that defines whether to send failures to the webhook.
>   - `pingRoleId` (optional) - ID of the role to ping on a successful snipe.

###### Example Config

> ```
> {
>     "namelists": {
>        // Example:
>        "mynames": ["iwannasnipethisname", "andthisonetoo"],
>        "mynamestwo": ["phil", "notphil"],
>     }
>     "accounts": [
>         // Example:
>         {
>             "token": "********.***.**************",
>             "namelists": ["mynames", "mynamestwo"]
>         },
>         {
>             "token": "********.***.**************",
>             "namelists": ["mynamestwo"]
>         },
>     ]
>     "delays": {
>         "retry": 300,
>         "nameRetry": 10
>     },
>     "webhook": {
>         "enabled" false
>         "url": "",
>         "pingRoleId": "",
>         "sendFailures": false
>     }
> }
> ```

### How to use

> - Download and install [NodeJS](https://nodejs.org/en/download) if you haven't already
> - Download the repository as a ZIP and extract it somewhere
> - Open a command line within the folder
> - Type in the following and enjoy!
>
> ```
> # Install dependencies
> npm install
>
> # Start the program
> npm run start
> ```

### Disclaimer

> Any kind of selfbotting is forbidden by Discord so use this program at your own risk. I am not responsible for any account suspensions.
