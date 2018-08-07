#!/usr/bin/env bash
java -cp dashboard-api-1.0-SNAPSHOT.jar -Dloader.main=org.devgateway.rdi.tanzania.Dhis2Import org.springframework.boot.loader.PropertiesLauncher
