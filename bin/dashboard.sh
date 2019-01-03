#!/usr/bin/env bash
java -Xms256m  -Xmx2048m -cp dashboard-api-1.0-SNAPSHOT.jar -DLOG_DIR=./logs  "$@"