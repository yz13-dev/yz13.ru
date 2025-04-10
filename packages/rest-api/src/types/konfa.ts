import { UserObject } from "./user";

export interface RoomSettings {
  maxParticipants?: number; // Макс. количество участников (по умолчанию 50)
  enableRecording?: boolean; // Разрешить запись встречи
  requirePassword?: boolean; // Требовать пароль для входа
  enableScreenSharing?: boolean; // Разрешить демонстрацию экрана
  muteOnJoin?: boolean; // При входе микрофон выключен
}

export interface Room {
  id: string; // Уникальный ID (например, "abcd-1234-efgh")
  hostId: string; // ID создателя комнаты
  participants: UserObject[]; // Текущие участники
  settings: RoomSettings; // Настройки комнаты
  createdAt: Date; // Время создания
  updatedAt: Date; // Последняя активность
  status: "active" | "ended" | "waiting"; // Статус комнаты
  metadata?: {
    // Дополнительные данные
    title?: string; // Название встречи
    description?: string; // Описание
    tags?: string[]; // Теги для поиска
  };
}

// Пример расширения для WebRTC-специфичных данных
export interface WebRTCRoom extends Room {
  rtcConfiguration?: RTCConfiguration; // Настройки ICE-серверов
  activeStreams?: {
    userId: string;
    streamType: "video" | "screen" | "audio";
  }[];
}
