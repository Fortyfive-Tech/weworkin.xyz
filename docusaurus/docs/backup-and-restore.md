---
id: backup-and-restore
title: Backup and restore
---

## Backup database

PostgreSQL is running in a Docker container, so it is easy to create a database dump.

1. `docker ps`

This command will list the running containers. For running a command inside a Docker container, the container ID will be needed.

2. `docker exec -t container_id_here pg_dump --clean -U postgres postgres > backup.sql`

The `backup.sql` is now available for copying in some safe place, or uploading it to S3, etc.

## Restore DB dump

`cat backup.sql | docker exec -i container_id_here psql -U postgres -d postgres`

## Hasura metadata and migrations

If needed, database structure or metadata can be altered inside Hasura (e.g. adding an additional field for a profile, like an Instagram URL). Instructions for handling migrations, backing up metadata and everything related can be found at [Hasura Docs](https://hasura.io/docs/1.0/graphql/core/migrations/index.html).