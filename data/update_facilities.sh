#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
echo "$BASEDIR"

cd "$BASEDIR"

psql -Upostgres -dtanzania < facilites_near_to_wards.sql