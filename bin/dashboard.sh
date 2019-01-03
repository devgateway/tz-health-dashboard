#!/usr/bin/env bash
java -Xms256m  -Xmx2048m -cp dashboard-api-1.0-SNAPSHOT.jar org.devgateway.rdi.tanzania.Application -DLOG_DIR=./logs  "$@"