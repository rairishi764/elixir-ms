#!/bin/bash

# example of using arguments to a script
echo "Starting EliXir GUI"
cd /home/elixir/app/elixir-gui/ && ng serve --host 0.0.0.0

echo "Starting EliXir Backend"
cd /home/elixir/app/elixir-ms/ms-lab && nodemon server.js

cd /home/elixir/app/elixir-ms/ms-mail && python3 main.py

cd /home/elixir/app/elixir-ms/ms-report && python3 main.py