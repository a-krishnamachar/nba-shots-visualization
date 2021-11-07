import sys


import numpy as np 
import pandas as pd

import matplotlib.pyplot as pyplot

from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail

from nba_api.stats.endpoints import playercareerstats

nbaPlayers = players.get_players()

for player in nbaPlayers:
    if (player['first_name'] == 'LeBron'):
        lebron_Id = player['id']
        # print(player)


# print(players.find_players_by_full_name('Love'))
lebronStats = playercareerstats.PlayerCareerStats(player_id=lebron_Id)

def get_player_shotcharts(playerId, seasonId):
    career_stats = playercareerstats.PlayerCareerStats(player_id=playerId)
    player_df = career_stats.get_data_frames()[0]
    teamId = player_df[player_df['SEASON_ID'] == seasonId]['TEAM_ID']

    shotchartlist = shotchartdetail.ShotChartDetail(team_id=(teamId),
                                                    player_id=(playerId),
                                                    season_type_all_star='Regular Season',  
                                                    season_nullable=seasonId,
                                                    context_measure_simple="FGA").get_data_frames()
    return shotchartlist[0], shotchartlist[1]

# print(get_player_shotcharts(lebron_Id, '2021-22'))
sampleData = get_player_shotcharts(lebron_Id, '2021-22')[0]
print(sampleData)