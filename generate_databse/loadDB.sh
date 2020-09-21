#!/bin/bash

python3 txt_to_json.py 

mongoimport --db words --collection word_collection --file database.json --jsonArray

mongoimport --db srb_words --collection word_collection --file database_srb.json --jsonArray
