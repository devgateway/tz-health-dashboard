#!/usr/bin/env bash
java -Xmx512m -Xms1024m -cp dashboard-api-1.0-SNAPSHOT.jar -Dloader.main=org.devgateway.rdi.tanzania.Dhis2MetadataImport org.springframework.boot.loader.PropertiesLauncher
