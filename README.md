# jira-tasks

## Getting started

Prerequisites:
* docker

```
$ docker run --rm -p 5000:80 nautigsam/jira-tasks
```
Then go to http://localhost:5000.

## Run from sources

Prerequisites:
* docker
* docker-compose

```
$ git clone https://github.com/Nautigsam/jira-tasks.git
$ cd jira-tasks
# Start
$ docker-compose up -d
# Stop
$ docker-compose down
```

### Run dev server

Prerequisites:
* [Deno](https://deno.land/#installation) >= 1.9.0
* [Denon](https://github.com/denosaurs/denon)

```
# Start and watch modifications
$ denon start
```