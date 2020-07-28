# truelayer-challenge

- Clone the repository
- Create the project directory

SET UP PYTHON ENVIRONMENT
- Cd to the project directory
- From the repo folder copy main.py, pokemon-last2.db and requirements.txt into project folder
- Run "python -m venv {venv_folder_name}" to create the python virtual environment
- On Linux or Mac run "source {venv_folder_name}/bin/activate" or on Windows run ".\env\Scripts\activate.bat" to activate the Python virtual environment
- Run "pip install requirements.txt" to install the required software
- Run "python main.py"
- Copy and paste this url http://localhost:5000/pokemon in your browser. If everything is fine you should see a Json representation of the database with all the available Pokemons

SET UP REACT APPLICATION
- Cd to the project directory
- Run "npx create-react-app {react_app_name}"
- Cd to {react_app_name} folder
- From the repo folder, copy App.js, style.css, "components" folder and "images" folder into "src" folder
- Run "npm start"
- Copy and paste this url http://localhost:3000/ in your browser. If the app is running you should see the search input and you can start to search for the available Pokemons.
