#!/bin/sh

# Устанавливаем rclone (если еще не установлен)
if ! command -v rclone &> /dev/null; then
    echo "Installing rclone..."
    apk add --no-cache rclone
fi

# Ваш основной код скрипта
echo "Starting sync..."


# Функция для удаления projectId из пути
remove_project_id() {
    local full_path="$1"
    # Удаляем первую папку (projectId) из пути
    echo "$full_path" | sed 's|^[^/]*/||'
}

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

            # УДАЛЯЕМ projectId из пути
            clean_path=$(remove_project_id "$relative_path")

            # Пропускаем если путь пустой после очистки
            if [ -z "$clean_path" ]; then
                echo "Skipping empty path: $relative_path"
                continue
            fi

            echo "Original: $relative_path -> Clean: $clean_path"

            if echo "$clean_path" | grep -q '/'; then
                new_filename=$(dirname "$clean_path")
                echo "Transforming: $clean_path -> $new_filename"
                rclone copyto "$file_path" "yc:${STORAGE_S3_BUCKET}/$new_filename" --no-update-modtime -v
            else
                echo "Copying: $clean_path"
                rclone copyto "$file_path" "yc:${STORAGE_S3_BUCKET}/$clean_path" --no-update-modtime -v
            fi
        done
    else
        echo "No new files to sync"
    fi

    rm -rf /tmp/sync_temp
    echo "Sync completed, waiting 1 minute..."
    sleep 60
done
