# road2fantasychamp

After losing in the 2023 Championship, I'm determined to win my fantasy basketball league in 2024.

As a brief overview, this application is a tool design to assist in "picking up" suitable free agents in my 9-category ESPN Fantasy Basketball league.

I decided to build a fullstack web/mobile application that uses ESPN's RESTful API to grab NBA player statistics live and display it in an interactive web application to help me make better informed decisions.

R2FC can be accessed [here](https://github.com/tigerkh3/road2fantasychamp/assets/85322535/806effb8-7b12-4a0b-9cc1-56c2489eb621)](https://miro.medium.com/v2/resize:fit:720/format:webp/1*lQ6a3a94PMOrRCPbYn3wyA.png). 

Since it's tied to ESPN's API and requires users to be part of ESPN's Fantasy Basketball League, I have limited usage to only myself at the moment. I did have plans to allow this to be used by many users, but due to the lack of man power and my dedication to finding a full-time engineering job, I have decided to put that on hold. 

I highly recommend that anyone reading this README for the first time check out the FAQ section.


# Table of Contents

[Application Features](#application-features)

[R2FantasyChamp.io FAQ](#R2FantasyChamp-faq)

[Application Development Process](#application-development-process)

# Application Features

R2FC's feature includes a live fantasy sports tracker which syncs my ESPN Fantasy League's data to a front-end UI that display's all my team's current stats compared to my opponents. 

It also includes a personalized watchlist that allows me to add players that I notice are doing well on a given day but not well enough for me to add to my team just yet. 

This allows for me to save players that I feel may have a breakout stretch of games or look into players and their situations to determine further whether I would like to add them to my team without forgetting them. 

Finally, R2FC's core feature is that it auto filters all the free agents in my ESPN League based on their peformance (in the points category) and displays the information live without the need for me to go to ESPN's website, filter through all the players and then filter them again based on points. 

These features make up the core element of R2FC as has allowed me to maintain 1st place in my ESPN Fantasy League as of February 12, 2024. 

Check it out [here](https://github.com/tigerkh3/road2fantasychamp/assets/85322535/806effb8-7b12-4a0b-9cc1-56c2489eb621)](https://miro.medium.com/v2/resize:fit:720/format:webp/1*lQ6a3a94PMOrRCPbYn3wyA.png)!

# R2 Fantasy Champ FAQ

## What is Fantasy Basketball?

Fantasy Basketball,
or better Fantasy Sports in general, is a game where you as a player are acting as a team manager in which you pick real players from real sports teams to build your own and compete against other managers in your league.
Fantasy Basketball specifically has two different types of game styles (scoring format) which are known as "head-to-head", "roto", and "season points." If you're curious about the differences, please do look it up [here](https://support.espn.com/hc/en-us/articles/360003913632-Scoring-Formats). The scoring format that my league uses is the head-to-head, 9 category format in which you go against a single manager per week in 9 statistical categories in basketball. Your objective is to beat the opposing manager
by having a higher cumulative total in 8 categories (points, field goal %, free throw %, 3 pointers made, rebounds, assists, blocks, steals) and a lower cumulative total in 1 category (turnovers).

These cumulative totals are determined by how the real players perform in actual sports matches that they have lined up within the current week. Each team can have a maximum of 10 players playing at once and a total of 13 players on their team roster. Meaning that out of the 10 players active per day, 3 will be remaining on your bench. This makes sense due to the fact that though NBA games are almost daily, not every team is playing every day, and some players may have injuries that restrict them.

## Why is the above important?

This is important to understand because considering that competitive fantasy leagues generally have around 8 - 12 managers, that would lead to a total of 156 players being rostered. Anyone who is able to join the NBA is a world-class level athlete and talent, but
every player's performance in the best basketball league in the world is definitely different and some perform much better in these statistical categories than others. This can be dependent on a variety of factors such as the real sports team the player is on, how many
star players this team may have, and the list goes on. Thus, each team would definitely have a good number of "star" players on their roster. Due to this, the total number of players available who contribute to statistical category totals at a high rate are definitely already on league rosters and this leads us to the unrostered players.

## What are unrostered players called?

Players who are unrostered are called "free agent" players. They are players that are simply unrostered and went undrafted at the beginning of the season. You may wonder why they went undrafted or aren't on rosters and that's simply because these players either do not contribute to fantasy categories efficiently and effectively or they're players that have yet to shine in the NBA and are more of raw talents. Each year there are many new players that join the NBA, some of them being highly rated prospective players and others that fly under the radar. But as a player grows from year to year, these players can fly under the radar if there isn't enough statistical data on them and are available to be picked up. We call these players "waiver wire" players. These players are touted as possibly being very good players both statistically and non-statistically which are on people's radar are potential additions as they may benefit a manager much more than a current seasoned player on their roster. Thus, as 9 category managers, we view a team's success mainly on how well a manager is able to scout players and make new additions to their team when they need it aside from their star players. This is further sloganed by what I always say as "your fantasy season either lives or dies by the waiver wire."

## Waive Wire Picks. How does that work?

Now that we understand the importance of the waiver wire, it's time to explain how managers make decisions when scouting potential players. Personally, I always scout how players are doing currently. Players tend to have what we call breakout seasons, and an example of that is the player Jalen Brunson. In the 2021 - 2022 season, I rostered Jalen Brunson after reviewing a stretch of 5 games where he was playing well. He averaged about 13 points, 5 assists and 3 rebounds during that time and I decided that based on his performance I believe he would continue to do well and added him to my roster in favor of another player. He continued to increase his averages to the point he was averaging 18 points, 5 assists, and 4 rebounds on great efficiency making him a top 50 player. This is important because normally a top 50 player would have been drafted to a team already but considering I was able to draft a top 50 player and find another one of similar caliber compared to another player who would only give me top 150 value, this was considered a steal. This highly contributed to my season and helped push my team from 6th overall to 3rd overall. This small addition with a huge impact is why we live and die by the waiver wire and why managers are constantly observing all the "free agent" player statistics daily, to find any hidden gems that they can replace the "not so great" players on their team. Players have ups and downs so it's important to view multiple game stretches to see which players to add, but some managers are willing to take earlier risks than others to add these players. Since managers have a lot of competition when it comes to picking up new players, it's important to have all the possible available data when watching players. The first person to see relevant player data has the best chance against other managers at spotting them first and thus picking them up first.

## Data is what makes Champions

ESPN's Fantasy Sports Application is one application that is used to play fantasy sports and is what my league uses. In terms of allowing managers to "manage"their teams, edit rosters, add players, examine player data, and user interactions of the like, ESPN's app does a great job. However, there has always been one thing that bothered me about the ESPN mobile app which was the fact that you couldn't see live player statistics when examining the waiver wire. It does show player season average and the previous games data, but a manager's first glance at a player would be how the player is doing currently. In addition to this, ESPN's Daily Leaders, which reflects the top performers for the day, does not have the option to auto filter out players on your current team as it's mainly a reflection league wide.

As we have determined, the quicker we have access to critical player data, the better managers can make pivotal roster decisions on the waiver wire. It's because of this idea, that data can help one lead one to wins, I decided to create my own application, R2 Fantasy Champ, to become the new Champion of my fantasy basketball league.

# Application Development Process

## HTTP Request Response Cycle for R2 Fantasy Champ

To give users a better understanding of how our application will work as "fullstack", I have included an image of how the basic request response cycle might look like during development.

![image](https://github.com/tigerkh3/road2fantasychamp/assets/85322535/4322e292-6f45-4c09-a882-10189442fca6)

The only difference between this and the actual application would be that the balldontlie.io API would eventually be replaced by the ESPN "hidden" API. The only reason why it is currently being used over the latter would be because
ESPN currently has no documentation on their API's usage. The fantasy sports development community has been making some progress with interacting with the API and somewhat documenting their progress, but in reality there is little
information on the API and a lot of network request combing needs to be done in order to find the proper headers to make accurate requests. This is made more difficult due to the NBA season not being currently active. This also
limits us as we are unable to make requests to ESPN's API for live player data hindering development. Therefore, we are still able to utilize another public API that has player data to shape our web application. Though the APIs may
return different object structure, we have made note of this to refactor to using ESPN's API whenever the NBA season starts and continuing investigating API interaction.

For further information on the decision points regarding the design and the process. Please visit (https://medium.com/@tigerkh3/road2fantasy-champ-day-5-3509f8b1f3bb)).](https://medium.com/@tigerkh3/road2fantasy-champ-day-5-3509f8b1f3bb).

## Initial Design and Wireframe

Now that we understand how our application should be composed of and how we should go about data retrieval on both the frontend and backend of the application. I then moved onto actually designing how the frontend of the
application would look and where the features would live on the application.

I first started off with good ole fashioned pen and paper to draw out what I wanted the app to look like. It felt easier for me
to start off with something tangible such as a pen before moving to a web app to further flesh it out.

Here's what it initially looked like:

![IMG_1245 copy](https://github.com/tigerkh3/road2fantasychamp/assets/85322535/17e39a97-91bf-449b-afbe-7c7426b41ed7)


Using Figma, I then mocked up the super basic UI for where the application's features would live.

![image](https://github.com/tigerkh3/road2fantasychamp/assets/85322535/ab36cfa7-b087-4dbf-bcf2-21f9830164bb)

Although it isn't pretty, I wanted the application to display all the critical information that I would need. The colors are supposed to represent ones that are easy on the eyes but with how ugly it looks right now don't worry too much about it.

The actual application looks very similar to the Figma design with some minor changes. Please click [here](#current-progress) to see what the application currently looks like compared to the wireframe.

For further information on the decision points regarding the design and the process. Please visit (https://medium.com/@tigerkh3/road2fantasychamp-episode-6-1fd41318b550).

## Past Progress 

Video Link Displaying My Past Progress!
[![Watch the video](https://img.youtube.com/vi/FOMNW2K4Ec4/hqdefault.jpg)](https://youtu.be/FOMNW2K4Ec4)

## Current Progress

Over the course of a few months since my last update, I've essentially completed the application. I cut out a few features that I felt were a bit redundant as this is a tool used in combination with ESPN's fantasy application. 

Since the core of the application's purpose was to maximize the ability for me to find a player that could increase my ability to win matchups, I stuck to the core feature of displaying free agents that are sync'd to my ESPN fantasy league. 

The application displays all the free agents in my league and their statistics for a past date as well as how they're doing live. ESPN's fantasy app falls short of providing live statistics (on mobile). 

It also requires me to go through more filters than I'd like and my app solves that issue by displaying it in an all in one inclusive site for my personal use!

Feel free to check it out at http://road2fantasychamp.com
