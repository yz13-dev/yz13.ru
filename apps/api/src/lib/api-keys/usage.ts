import { Context } from "hono";
import { getSupabase } from "../../middlewares/admin.supabase.middleware";

// Функции для работы с логированием и статистикой
export const usage = (c: Context) => {

  const supabase = getSupabase(c)
  return {
    // Обновление статистики использования
    update: async (keyId: string) => {

      const { data } = await supabase
        .from("api_keys")
        .select("usage_count")
        .eq("id", keyId)
        .single();

      const { error } = await supabase
        .from('api_keys')
        .update({
          last_used: new Date().toISOString(),
          usage_count: (data?.usage_count ?? 0) + 1
        })
        .eq('id', keyId);

      if (error) {
        console.error('Failed to update usage stats:', error);
      }
    },
  };
}
