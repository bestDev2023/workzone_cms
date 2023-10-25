#!/bin/bash
set -e

PROXY_PORT=5000 NODE_ENV=staging docker-compose -p workzone-cloud --project-directory out/build --env-file .env.local -f docker-compose.yml -f docker-compose.dev.yml up
