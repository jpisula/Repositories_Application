# Repositories_Application
The application that allows to get info about user's github repositories which were updated after chosen date.
Author: Jakub Pisula

Install tutorial:
1. Clone repository into selected folder,
2. Get into 'Repositories_Application' folder,
3. Open terminal (or cmd or Powershell, etc.),
4. run command 'npm install',
5. run command 'npm run',
6. That's all! The application should open in a browser, if not get into 'http://localhost:3000/' site.

The application has one main functionality:
  It changes tags <repos data-user="username" data-update="date"> to div tag which contains info about user github repositories.
  That application connects to github api (https://docs.github.com/en).
  
We can see that in index.html file originally in lines 55 and 95 there are 'repos' tags,
  additionally a search button adds new 'repos' tag to the site. All that tags
  are dynamically changed to other HTML structure with data received from github API.
  
Changed HTML structure:
```<div class="user-repos-result">
  <h3>
    Github repositories of user 'username' updated after date
  </h3>
  <table class="repos-table"> 
    Table with 4 columns: repository name, last updates, description and git URL to download repository
  </table>
</div>```
  
If you want to see how that site works without installing or even cloning repository, visit:
http://repositories.jakub-pisula.pl/

In folder ./docs there is very simple technical code documentation.
