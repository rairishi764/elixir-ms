# elixir-ms
A config.json needs to be in place on top folder level for services to run

## Project details
#### Python Project
- ms-report    -  Reports dashboard data 
- ms-email     -  Send html based email
#### NodeJS Project
- ms-lab       -  DB connect for all CRUD operations for patient, doctor, invoices etc

## Run Book
#### NodeJs
```
npm install
nodemon server.js
```
#### Python
```
pip3 install -r requirements.txt
python3 main.py
```
#### Configs
Update the config.json to set values for mail,pwd and other secrets

## AWS Server Setup
```
sudo adduser username
sudo usermod -aG sudo username
```
AWS has git already installed

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
node --version
npm --version
sudo npm install -g @angular/cli@9
ng --version
```
### Angular Project Setup
```
git clone <projecturl>
cd <projectname>
npm install
npm audit fix
ng serve --host 0.0.0.0
```
### Python Project Setup
```
sudo apt install python3-pip
pip3 install -r requirements.txt
python3 main.py
```

### Python venv project setup
```
python3 -m venv env
```

### Starting XAMP 
```
Setup 3306 -> 80
```