#!/bin/sh
HASURA_TEMP_DIRECTORY="hasura_temp"
HASURA_MIGRATIONS_DIRECTORY="hasura"

# Change to current directory
cd $(dirname $0)

# Set environment variables from .env file
export $(grep -v '^#' .env | xargs)

echo "Initializing new Hasura project..."
echo $HASURA_GRAPHQL_ENDPOINT
rm -r $HASURA_TEMP_DIRECTORY
hasura init $HASURA_TEMP_DIRECTORY --endpoint $HASURA_GRAPHQL_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
cp $HASURA_TEMP_DIRECTORY/config.yaml $HASURA_MIGRATIONS_DIRECTORY

# Cleanup
rm -r $HASURA_TEMP_DIRECTORY

hasura migrate apply --project $HASURA_MIGRATIONS_DIRECTORY
hasura metadata apply --project $HASURA_MIGRATIONS_DIRECTORY

hasura migrate status --project $HASURA_MIGRATIONS_DIRECTORY