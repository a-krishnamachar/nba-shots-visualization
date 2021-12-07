
import requests
import json
import os
import sys
import time
import numpy as np 
import pandas as pd
import matplotlib.pyplot as pyplot
import pickle


from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playerprofilev2
from nba_api.stats.endpoints import commonplayerinfo


from players import nbaPlayers

# print(nbaPlayers)
i = 0 
for player in nbaPlayers[472:]:
    i+=1

    name = player["first_name"]+"_"+player["last_name"]
    f = open('data/player_background/%s.json' % name, 'w')

    info = commonplayerinfo.CommonPlayerInfo(player_id=player['id']).get_json()

    f.write(info)
    f.close()
    time.sleep(1)
    print(i)
