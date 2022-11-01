#!/bin/bash

export PGPASSWORD='node_password'
database="brushupdb"

echo "Configuring database: $database"
dropdb -U node_user brushupdb
createdb -U node_user brushupdb

psql -U node_user brushupdb< ./sql/brushUp.sql

echo "$database configured"