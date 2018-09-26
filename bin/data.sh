#!/usr/bin/env bash
java -Xms256m  -Xmx2048m -cp dashboard-api-1.0-SNAPSHOT.jar -Dloader.main=org.devgateway.rdi.tanzania.Dhis2AnalitycImport org.springframework.boot.loader.PropertiesLauncher $@