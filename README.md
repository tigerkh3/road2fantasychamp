# road2fantasychamp

After losing in the finals this year, I am determined to finally win my fantasy basketball league this year. 

As a brief overview, this application is built specifically for 9-category ESPN Fantasy Basketball leagues. The premise for this is because that is the style of fantasy basketball that I currently play.

# What is Fantasy Basketball? 

Fantasy Basketball, or better Fantasy Sports in general, is a game where you as a player are acting as a team manager in which you pick real players from real sports teams to build your own and compete against other managers in your league. 
Fantasy Basketball specifically has two different types of game styles (scoring format) which are known as "head-to-head", "roto", and "season points." If you're curious about the differences, please do look it up here (https://support.espn.com/hc/en-us/articles/360003913632-Scoring-Formats). The scoring format that my league uses is the head-to-head, 9 category format which you go against a single manager per week in 9 statistical categories in basketball. Your objective is to beat the opposing manager
by having a higher cumulative total in 8 categories (points, field goal %, free throw %, 3 pointers made, rebounds, assists, blocks, steals) and a lower cumulative total in 1 category (turnovers). 

These cumulative totals are determined by how the real players perform in actual sports matches that they have lined up within the current week. Each team can have a maximum of 10 players playing at once and a total of 13 players on their team roster. Meaning that our of the 10 players active per day, 3 will be remaining on your bench. This makes sense due to the fact that though NBA games are almost daily, not every team is playing every day, and some player may have injures that restrict them. 

# Why is the above important? 

This is important to understand because considering that competitive fantasy leagues have generally around 8 - 12 managers, that would lead to a total of 156 players being rostered. Anyone who is able to join the NBA is a world-class level athelete and talent, but
every player's performance in the best basketball league in the world is definitely different and some perform much better in these statistical categories than others. This can be dependent on a variety of factors such as the real sports team the player is on, how many
star players this team may have, and the list goes on. Thus, each team would definitely have a good number of "star" players on their roster. Due to this, the total number of players available who contribute to statistical category totals at a high rate are definitely already on league rosters and this leads us to the unrostered players. 

# What are unrostered players called? 

Players who are unrostered are called "free agent" players. They are players that are simply unrostered and went undrafted at the beginning of the season. You may wonder why they went undrafted or aren't on rosters and that's simply because these player either do not contribute to fantasy categories efficiently and effectively or they're players that have yet to shine in the NBA and are more of raw talents. Each year there are many new players that join the NBA, some of them being highly rated prospective players and others that fly under the radar. But as a player grows from year to year, these players can fly under the radar are there isn't enough statistical data on them and are available to be picked up. We call these players "waiver wire" players. These players are touted as possibly being very good players both statistically and non-statistically which are on people's radar are potential additions as they may benefit a manager much more than a current seasoned player on their roster. Thus, as 9 category managers, we view a team's success main on how well a manager is able to scout players and make new additions to their team when they need it aside from their star players. This is further sloganed by what I always say as "your fantasy season either lives or dies by the waiver wire." 

# Waive Wire Picks. How does that work? 

Now that we understand the importance of the waiver wire, it's time to explain how managers make deicions when scouting potential players. Personally, I always scout how players are doing currently. Players tend to have what we call breakout season, and an example of that is the player Jalen Brunson. In the 2021 - 2022 season, I rostered Jalen Brunson after reviewing a stretch of 5 games where he was playing well. He averaged about 13 points, 5 assists and 3 rebounds during that time and I decided that based on his performance I believe he would continute to well and added him to my roster in favor of another player. He continued to increase his averages to the point he was averaging 18 points, 5 assists, and 4 rebounds on great efficiency making him a top 50 player. This is important because normally a top 50 player would have been drafted to a team already but considering I was able to draft a top 50 player and finding anohter one of similar caliber compared to another player who would only give me top 150 value, this was considered a steal. This highly contributed to my season and helped push my team from 6th overall to 3rd overall. This small addition with a huge impact is why we live and die by the waiver wire and why managers are constantly observing all the "free agent" player statistics daily to find any hidden gems that they can replace the "not so great" players on their team. Players have ups and downs to it's important to view multiple game stretches to see which players to add, but some managers are willing to take earlier risks than others to add these players. Since managers have a lot of competition when it comes to picking up new players, it's important to have all the available data possible when watching players and the first person to see data regarding players has the best chance against other managers at spotting them first. 

# Data is what crowns a king. 



Here we'll be building a fullstack application that uses ESPN's RESTful API to grab NBA player statistics live and utilize this data to reflect it in a 9-category format. The reason I decided to 
