#!/bin/sh

# Устанавливаем rclone (если еще не установлен)
if ! command -v rclone &> /dev/null; then
    echo "Installing rclone..."
    apk add --no-cache rclone
fi

# Ваш основной код скрипта
echo "Starting sync..."

sync_bucket() {
    echo "Starting sync for bucket: $1"

    # Создаем временную директорию
    mkdir -p /tmp/sync_temp

    # Копируем все из MinIO
    rclone copy "myminio:$1" /tmp/sync_temp --include='*/**' -v

    # Обрабатываем каждый файл
    find /tmp/sync_temp -type f | while read file_path; do
        # Получаем относительный путь
        relative_path="${file_path#/tmp/sync_temp/}"

        # Если путь содержит вложенность (папка-файл)
        if echo "$relative_path" | grep -q '/'; then
            # Берем имя папки как имя файла, игнорируя UUID-файл внутри
            new_filename=$(dirname "$relative_path")
            echo "Transforming: $relative_path -> $new_filename"
            # Копируем файл с правильным именем
            rclone copyto "$file_path" "yc:$1/$new_filename"
        else
            # Обычный файл без вложенности
            echo "Copying: $relative_path"
            rclone copyto "$file_path" "yc:$1/$relative_path"
        fi
    done

    # Очистка
    rm -rf /tmp/sync_temp
}

# Основной цикл
while true; do
    echo "Starting sync at $(date)"

    # Проверяем, что переменная установлена
    if [ -z "${STORAGE_S3_BUCKET}" ]; then
        echo "ERROR: STORAGE_S3_BUCKET is not set!"
        exit 1
    fi

    sync_bucket "${STORAGE_S3_BUCKET}"
    echo "Sync completed, waiting 1 minute..."
    sleep 60
done
