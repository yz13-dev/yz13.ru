#!/bin/sh

# Устанавливаем rclone (если еще не установлен)
if ! command -v rclone &> /dev/null; then
    echo "Installing rclone..."
    apk add --no-cache rclone
fi

# Ваш основной код скрипта
echo "Starting sync..."


# Основной цикл с интеллектуальной синхронизацией
while true; do
    echo "Starting smart sync at $(date)"

    # Создаем временную директорию
    mkdir -p /tmp/sync_temp

    # Копируем ТОЛЬКО измененные файлы из MinIO (используем --max-age)
    echo "Copying modified files from MinIO (last 2 minutes)..."
    rclone copy "myminio:${STORAGE_S3_BUCKET}" /tmp/sync_temp --include='*/**' --max-age 2m --no-traverse -v --progress

    # Если есть новые файлы - обрабатываем их
    file_count=$(find /tmp/sync_temp -type f | wc -l)

    if [ "$file_count" -gt 0 ]; then
        echo "Found $file_count new/modified files to process"

        find /tmp/sync_temp -type f | while read file_path; do
            relative_path="${file_path#/tmp/sync_temp/}"

            if echo "$relative_path" | grep -q '/'; then
                new_filename=$(dirname "$relative_path")
                echo "Transforming: $relative_path -> $new_filename"
                rclone copyto "$file_path" "yc:${STORAGE_S3_BUCKET}/$new_filename" --no-update-modtime -v # Сохраняем оригинальное время
            else
                echo "Copying: $relative_path"
                rclone copyto "$file_path" "yc:${STORAGE_S3_BUCKET}/$relative_path" --no-update-modtime -v
            fi
        done
    else
        echo "No new files to sync"
    fi

    rm -rf /tmp/sync_temp
    echo "Sync completed, waiting 1 minute..."
    sleep 60
done
