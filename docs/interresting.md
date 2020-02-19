
# interresting links

> here are my personnal notes

## quotes

```
-> "fuck this but wait, what is 'this'"
```


## npm packages

clone -> for deep-copying js objects and avoid references mistakes
https://www.npmjs.com/package/clone

memory-cache -> for server side global caching
https://www.npmjs.com/package/memory-cache

node-cache -> most used cache packages
https://www.npmjs.com/package/node-cache


## dev articles


https://dev.to/steelvoltage/you-probably-don-t-need-a-front-end-framework-26o6

webpack babel ->
https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70

## apis

external apis that could be useful

### GOOGLE API

for signing in
https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin
```html
FRONTEND ONLY (in the view) :
HEAD - declare the app's ID
<meta
name="google-signin-client_id"
content="YOUR_CLIENT_ID.apps.googleusercontent.com">

SCRIPT - the API client
<script
src="https://apis.google.com/js/platform.js"
async
defer></script>

```
__________________________________________________

### github API

https://developer.github.com/v3/
https://developer.github.com/v3/guides/getting-started/
https://developer.github.com/v3/guides/best-practices-for-integrators/

There is a npm package to use github REST API :
https://github.com/octokit/rest.js

> **rate limit** 60 requests per hour if not authenticated,
> 5000 requests per hour if authenticated / user

> **payload response** Github expects a response after a request ?

```
root url
https://api.github.com

(design philosophy https://api.github.com/zen)

user data
https://api.github.com/users/gui3
https://api.github.com/gui3 -> when authenticated
all repositories
https://api.github.com/users/gui3/repos
https://api.github.com/gui3/repos?page=2&per_page=100 -> when authenticated
stats of 1 repository
https://api.github.com/repos/gui3/gui3.website

```

__________________________________________________

### stackexhange API (reputation and stats)

> **Beware there is a quota** (300 requests / day) !
> https://meta.stackoverflow.com/questions/356419/what-is-quota-max-and-quota-remaining-in-> api-stackexchange-com-2-2-users-api

perform a GET on this address to get a JSON of the stats in stackexchange

```
https://api.stackexchange.com/{API_VERSION}/users/{USER_ID}?site={SITE}

API_VERSION=2.2
my USER_ID by SITE:
stackoverflow = 7162648
gis = 104132
graphicdesign = 148555
music = 65582
https://api.stackexchange.com/2.2/users/7162648?site=stackoverflow
https://api.stackexchange.com/2.2/users/104132?site=gis
https://api.stackexchange.com/2.2/users/148555?site=graphicdesign
https://api.stackexchange.com/2.2/users/65582?site=music

data_returned :
{
  "items":[{
    "badge_counts":{"bronze":11,"silver":3,"gold":0},
    "account_id":9651678,
    "is_employee":false,
    "last_modified_date":1574629201,
    "last_access_date":1581513183,
    "reputation_change_year":22,
    "reputation_change_quarter":22,
    "reputation_change_month":22,
    "reputation_change_week":10,
    "reputation_change_day":10,
    "reputation":615,
    "creation_date":1479222060,
    "user_type":"registered",
    "user_id":7162648,
    "location":"Lyon, France",
    "website_url":"",
    "link":"https://stackoverflow.com/users/7162648/gui3",
    "profile_image":"https://i.stack.imgur.com/dhaKk.jpg?s=128&g=1",
    "display_name":"Gui3"
  }],
  "has_more":false,
  "quota_max":300,
  "quota_remaining":281
}
```

__________________________________________________

### codewars API

https://dev.codewars.com/

```
https://www.codewars.com/api/v1/users/gui3

{
  "username":"gui3",
  "name":"",
  "honor":357,
  "clan":"@TheHackingProject",
  "leaderboardPosition":55703,
  "skills":[],
  "ranks":{
    "overall":{
      "rank":-5,
      "name":"5 kyu",
      "color":"yellow",
      "score":307
    },
    "languages":{
      "ruby":{
        "rank":-6,
        "name":"6 kyu",
        "color":"yellow",
        "score":180
      },
      "javascript":{
        "rank":-6,"name":"6 kyu",
        "color":
        "yellow",
        "score":127
      }
    }
  },
  "codeChallenges":{
    "totalAuthored":0,
    "totalCompleted":33
  }
}

```

__________________________________________________

### google docs API

**clients are recommended by google**
https://developers.google.com/docs/api/quickstart/nodejs

```
npm install googleapis
"googleapis": "^39.2.0",
```

What I found with direct url :
```
root
https://docs.googleapis.com

get
https://docs.googleapis.com/v1/documents/{documentId}
https://docs.googleapis.com/v1/documents/1tL3ff0BJB7XhATkNKKj0Af_w36iXVVA1j0srr11PNw4

```
