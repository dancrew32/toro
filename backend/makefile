make:
	vim makefile

venv:
	virtualenv -p python3 venv

deps:
	./venv/bin/pip3 install -r requirements.txt

run:
	export FLASK_APP=app.py && ./venv/bin/flask run

lab:
	./venv/bin/jupyter lab

shell:
	./venv/bin/ipython
