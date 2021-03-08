#!/bin/bash

# example of using arguments to a script
echo "Starting EliXir GUI"
cd c:/elixir/code/elixir-ms/elixir-gui && ng serve --host 0.0.0.0

echo "Starting EliXir Backend"
cd c:/elixir/code/elixir-ms/ms-lab && nohup node server.js

cd c:/elixir/code/elixir-ms/ms-mail && nohup python3 main.py

cd c:/elixir/code/elixir-ms/ms-report && nohup python3 main.py