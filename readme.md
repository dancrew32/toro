# Toro interview

## Frontend

### Install & Run

```bash
cd frontend && yarn start
```

### Production

To create production, minified build in frontend/dist:

```bash
cd frontend && yarn prod
```

### Notes

Basic React App with:

* Client-side routing (Home and "Tables" page)
* List view for schema & tables with client-side filtering.
* Toggle for previewing columns on any table in list of tables.
* Metrics view with basic table view for 
* List & main viewports scroll independently, accessible on mobile devices.

Some TODOs:

* Better loading states
* error handling for fetch failures
* Restructure fetch to store by schema instead of tables

## Backend

### Install

```bash
cd backend && make venv deps run
```

### Notes

Flask & Jupyter notebook

* Small flask server with demo payloads.
* Jupyter lab notebook where I checked out the API, made payload copies.

Some TODOs:

* Dockerize frontend
* Dockerize backend
* Create docker-compose.yml file to orchestrate build and prod
