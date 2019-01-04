#!/usr/bin/env bash
java -server -Xms1G -Xmx2G -XX:MaxMetaspaceSize=256m -XX:+UseConcMarkSweepGC -XX:ReservedCodeCacheSize=128m -DLOG_DIR=/dashboard-ligs -DJava.awt.headless=true -XX:+CMSParallelRemarkEnabled -XX:+ScavengeBeforeFullGC -XX:+CMSScavengeBeforeRemark -Xverify:none -noverify -jar dashboard-api-1.0-SNAPSHOT.jar --spring.config.name=staging
