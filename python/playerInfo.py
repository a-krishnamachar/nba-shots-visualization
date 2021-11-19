
import requests
import json
import os
import sys

import numpy as np 
import pandas as pd
import matplotlib.pyplot as pyplot
import pickle


from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.endpoints import playercareerstats

from players import nbaPlayers

# print(nbaPlayers)
i = 0 
for player in nbaPlayers[215:]:
    i+=1
    data = {}
     

    name = player["first_name"]+"_"+player["last_name"]
    f = open('data/player_data/%s.json' % name, 'w')
    

    playerID = playercareerstats.PlayerCareerStats(player_id=player['id']).get_data_frames()[0]
    playerID.set_index("SEASON_ID",inplace=True)
    try:
        currentSeason = playerID.loc["2020-21"]
        playerId = player['id']
        teamId = currentSeason["TEAM_ID"]
        currentSeason = currentSeason.values.tolist()
        # currentSeason = json.dumps(currentSeason)

        # data["name"] = name
        # data["info"] = currentSeason

        
        shotchartlist = shotchartdetail.ShotChartDetail(team_id=(teamId),
                                                    player_id=(playerId),
                                                    season_type_all_star='Regular Season',  
                                                    season_nullable="2020-21",
                                                    context_measure_simple="FGA").get_data_frames()
        
        shots = shotchartlist[0].values.tolist()
        
        
        shots = json.dumps(shots)
        data["shots"] = shots
        data = pickle.dumps(data)


        # print(type(shotchartlist[0]))
        # d = json.dumps(data)
        # f.write(json.dumps(data, separators=(',', ':')))
        # f.write(json.dumps(data))

        f.write(shots)


        f.close()

    except KeyError:
        print("Didn't Play")
        pass

  
    
print(i)
