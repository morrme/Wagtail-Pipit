#!/bin/bash
set -e

# Arguments
local_domain={{cookiecutter.domain_stage}}.test:{{cookiecutter.docker_web_port}}
ssh_host={{cookiecutter.ssh_stage}}
standalone_web=0
db_wait_time=20

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DOCKER_DIR=${SCRIPTS_DIR}/../docker/

while getopts l:s:t: option
do
    case "${option}"
        in
        l) local_domain=${OPTARG};;
        s) ssh_host=${OPTARG};;
        t) standalone_web=1
    esac
done

if [[ $standalone_web == 1 ]]; then
    manage_prefix="python src/manage.py "
else
    manage_prefix="docker-compose exec web python manage.py "
fi

echo "Creating database dump from prod..."
ssh $ssh_host "export PGUSER=postgres && pg_dump {{ cookiecutter.db_name_prod }} --no-owner > /tmp/db-dump.sql"

echo "Downloading database dump..."
scp $ssh_host:/tmp/db-dump.sql $DOCKER_DIR/files/db-dumps/db-dump.sql
ssh $ssh_host "rm /tmp/db-dump.sql"

echo "Rebuilding docker containers."

docker-compose stop
docker-compose rm -f
docker-compose up -d

echo "Waiting for postgres ($db_wait_time seconds)..."
sleep $db_wait_time

echo "Adjusting database..."

$manage_prefix wagtail_change_site_domain --site_id=1 --new_site_domain=$local_domain
$manage_prefix change_user_password --user=admin --password=admin

if [[ $standalone_web == 1 ]]; then
    $manage_prefix runserver localhost:{{cookiecutter.docker_web_port}}
fi

echo "---"
echo "Done!"
echo "The application is ready at: http://$local_domain"
echo "Username/Password is admin/admin"
