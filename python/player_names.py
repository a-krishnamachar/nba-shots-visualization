import json

import numpy as np 
import pandas as pd

import matplotlib.pyplot as pyplot

from nba_api.stats.static import players

from nba_api.stats.endpoints import playercareerstats


nbaPlayers = players.get_players()
activePlayers = {}
for player in nbaPlayers:
    print(player)
    playerID = playercareerstats.PlayerCareerStats(player_id=player['id']).get_data_frames()[0]
    playerID.set_index("SEASON_ID",inplace=True)
    try:
        currentSeason = playerID.loc["2020-21"]
        playerID = player['PLAYER_ID']
        activePlayers[playerID] = player['PLAYER_NAME']
    
    except KeyError:
        pass

print(activePlayers)