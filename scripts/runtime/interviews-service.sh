#!/bin/sh
set -eu

project_dir="/Users/alyorjonaminboyev/Projects/interviews"
compose_file="$project_dir/docker-compose.yml"

if [ ! -d "$project_dir" ]; then
  echo "Project topilmadi: $project_dir" >&2
  exit 1
fi
if [ ! -f "$project_dir/.env" ]; then
  echo ".env topilmadi. .env.example nomlaridan foydalanib remote .env yarating." >&2
  exit 1
fi

cd "$project_dir"
case "${1:-status}" in
  start)
    docker compose --file "$compose_file" up -d --build
    ;;
  stop)
    docker compose --file "$compose_file" down
    ;;
  restart)
    docker compose --file "$compose_file" up -d --build --force-recreate
    ;;
  status)
    docker compose --file "$compose_file" ps
    ;;
  logs)
    docker compose --file "$compose_file" logs --tail 200 --follow app
    ;;
  health)
    curl --fail --silent --show-error http://127.0.0.1:4173/health
    printf '\n'
    ;;
  *)
    echo "Foydalanish: $0 {start|stop|restart|status|logs|health}" >&2
    exit 2
    ;;
esac
