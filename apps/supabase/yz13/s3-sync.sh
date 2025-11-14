#!/bin/sh
while true; do
  echo "Starting sync..."
  rclone sync myminio:${STORAGE_S3_BUCKET} yc:${STORAGE_S3_BUCKET} --progress --transfers=4
  echo "Sync completed, waiting 1 minutes..."
  sleep 60
done
