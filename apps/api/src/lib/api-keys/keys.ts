
import type { Context } from "hono";
import { getSupabase } from "../../middlewares/admin.supabase.middleware";
import { TablesUpdate } from "../../types/database";
import { config } from "./config";
import { usage } from "./usage";
import { keyUtils } from "./utils";


// Функции для работы с API ключами
export const apiKeys = (c: Context) => {

  const supabase = getSupabase(c)

  return {
    // Создание нового API ключа
    create: async ({ name, permissions = ['read'], userId = null, expiresInDays = null }) => {
      const key = keyUtils.generate();
      const keyHash = keyUtils.hash(key);

      let expiresAt: Date | null = null;
      if (expiresInDays) {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
      }

      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          key_hash: keyHash,
          name,
          permissions,
          user_id: userId,
          expires_at: expiresAt?.toISOString(),
          rate_limit: config.defaultRateLimit,
          rate_limit_window: config.defaultWindow
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create API key: ${error.message}`);
      }

      return { key, ...data };
    },

    // Валидация API ключа
    validate: async (key: string) => {
      const keyHash = keyUtils.hash(key);
      console.log("keyHash", keyHash)

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .match({ key_hash: keyHash, is_active: true })
        // .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .limit(1)
        .maybeSingle();

      console.log(data, error)

      if (error || !data) {
        return null;
      }

      // Обновляем статистику асинхронно
      usage(c).update(data.id).catch(console.error);

      return data;
    },

    // Получение ключей пользователя
    getUserKeys: async (userId: string) => {
      const { data, error } = await supabase
        .from('api_keys')
        .select(`
        id,
        name,
        permissions,
        created_at,
        last_used,
        usage_count,
        is_active,
        expires_at,
        rate_limit
      `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch user keys: ${error.message}`);
      }

      return data;
    },

    // Деактивация ключа
    deactivate: async (keyId: string, userId = null) => {
      let query = supabase
        .from('api_keys')
        .update({ is_active: false })
        .eq('id', keyId);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { error } = await query;

      if (error) {
        throw new Error(`Failed to deactivate key: ${error.message}`);
      }
    },

    // Обновление настроек ключа
    updateSettings: async (keyId: string, updates: TablesUpdate<"api_keys">, userId = null) => {
      const allowedUpdates = ['name', 'permissions', 'rate_limit', 'expires_at'];
      const filteredUpdates = Object.keys(updates)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {});

      let query = supabase
        .from('api_keys')
        .update(filteredUpdates)
        .eq('id', keyId);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { error } = await query;

      if (error) {
        throw new Error(`Failed to update key: ${error.message}`);
      }
    }
  }
};
