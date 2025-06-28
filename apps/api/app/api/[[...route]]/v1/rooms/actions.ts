import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import type { Room, RoomInsert } from "@/schemas/rooms";

export const getRoom = async (id: string): Promise<{ data?: Room; error?: any }> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const createRoom = async (maxMembers: number, name: string, isPublic: boolean, owner: string): Promise<{ data?: Room; error?: any }> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const roomData: RoomInsert = {
      max_members: maxMembers,
      name: name,
      public: isPublic,
      owner: owner,
    };

    const { data, error } = await supabase
      .from("rooms")
      .insert(roomData)
      .select()
      .limit(1)
      .single();
    
    if (error) {
      return { error };
    }
    
    return { data };
  } catch (error) {
    console.log(error);
    return { error };
  }
}; 