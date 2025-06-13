import type { TablesInsert } from "@yz13/supabase/database";
import type { FileObject, UserAttributes } from "@yz13/supabase/extra";
import { format } from "date-fns";
import { API_URL } from "./const/api";
import { customFetch } from "./const/fetch";
import type { Article, NewArticle, NewsSource } from "./types/articles";
import type { Calendar, Event, NewEvent, NewWeekSchedule, ScheduleAvailability, UpdateEvent, UpdateWeekSchedule, WeekSchedule } from "./types/calendar";
import type { Position } from "./types/positions";
import type { Pricing, ShortPricing } from "./types/pricing";
import type { Room } from "./types/rooms";
import type { Publication } from "./types/store";
import type { Timezone } from "./types/timezone";
import type { Session, UserObject } from "./types/user";

interface ClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Custom error class with status property
class HTTPError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}

class YZ13Client {
  private config: Required<ClientConfig>;

  constructor(config: ClientConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.yz13.ru',
      timeout: config.timeout || 10000,
      retries: config.retries || 3
    };
  }

  private createUrl(endpoint: string): string {
    const baseUrl = this.config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
  }

  private createOptions(options: RequestInit = {}): RequestOptions {
    return {
      ...options,
      timeout: this.config.timeout,
      retries: this.config.retries,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
  }

  private async handleResponse<T>(response: Response | null): Promise<T | null> {
    if (!response) return null;

    // Success responses (2xx)
    if (response.status >= 200 && response.status < 300) {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json() as T;
      }
      return await response.text() as T;
    }

    // Client errors (4xx) and Server errors (5xx)
    if (response.status >= 400) {
      const errorMessage = await response.text();
      throw new HTTPError(response.status, errorMessage || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Other status codes (1xx, 3xx)
    return await response.text() as T;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    const url = this.createUrl(endpoint);
    const requestOptions = this.createOptions(options);

    const response = await customFetch<T>(url, requestOptions);
    return this.handleResponse<T>(response);
  }

  news = {
    articles: {
      upload: async (article: NewArticle): Promise<Article | null> => {
        const token = process.env.NEWS_API_TOKEN;

        if (!token) {
          throw new Error('NEWS_API_TOKEN environment variable is required');
        }

        return this.request<Article>("/news/articles/new", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(article),
        });
      },

      getById: async (id: string): Promise<Article | null> => {
        return this.request<Article>(`/news/article/${id}`, {
          method: "GET",
        });
      },

      list: async (params?: { limit?: number; offset?: number }): Promise<Article[] | null> => {
        const searchParams = new URLSearchParams();
        if (params?.limit) searchParams.set('limit', params.limit.toString());
        if (params?.offset) searchParams.set('offset', params.offset.toString());

        const queryString = searchParams.toString();
        const endpoint = queryString ? `/news/articles?${queryString}` : '/news/articles';

        return this.request<Article[]>(endpoint, {
          method: "GET",
        });
      },

      getCountryCodes: async (): Promise<string[] | null> => {
        return this.request<string[]>("/news/codes", {
          method: "GET",
        });
      },

      getForCountry: async (
        country_code: string,
        offset = 0,
        date: string = format(new Date(), "yyyy-MM-dd")
      ): Promise<Article[] | null> => {
        const searchParams = new URLSearchParams({
          offset: offset.toString(),
          date: date,
        });
        return this.request<Article[]>(
          `/news/country/${country_code}/articles?${searchParams.toString()}`,
          {
            method: "GET",
          }
        );
      }
    }
  };

  calendar = {
    calendars: {
      list: async (uid: string): Promise<Calendar[] | null> => {
        return this.request<Calendar[]>(`/calendar/user/${uid}`, {
          method: "GET",
        });
      },

      getDefault: async (uid: string): Promise<Calendar | null> => {
        return this.request<Calendar>(`/calendar/user/${uid}/default`, {
          method: "GET",
        });
      },

      getById: async (id: string): Promise<Calendar | null> => {
        return this.request<Calendar>(`/calendar/${id}`, {
          method: "GET",
        });
      },

      create: async (uid: string, name: string): Promise<Calendar | null> => {
        return this.request<Calendar>(`/calendar/user/${uid}`, {
          method: "POST",
          body: JSON.stringify({ name }),
        });
      },

      update: async (id: string, name: string): Promise<Calendar | null> => {
        return this.request<Calendar>(`/calendar/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ name }),
        });
      },

      delete: async (id: string): Promise<Calendar | null> => {
        return this.request<Calendar>(`/calendar/${id}`, {
          method: "DELETE",
        });
      }
    },

    events: {
      create: async (event: NewEvent): Promise<Event | null> => {
        return this.request<Event>("/calendar", {
          method: "POST",
          body: JSON.stringify(event),
        });
      },

      getUserEvents: async (
        uid: string,
        params: {
          type?: Event["type"];
          date?: string;
          start?: string;
          end?: string;
          limit?: number;
        } = {}
      ): Promise<Event[] | null> => {
        const keys = Object.keys(params);
        const searchParams = keys
          .map((key) => {
            const param = params[key as keyof typeof params];
            if (!param) return "";
            return `${key}=${param}`;
          })
          .join("&");

        const url = keys.length !== 0
          ? `/calendar/events/user/${uid}?${searchParams}`
          : `/calendar/events/user/${uid}`;
        return this.request<Event[]>(url);
      },

      getById: async (id: string): Promise<Event | null> => {
        return this.request<Event>(`/calendar/events/${id}`);
      },

      update: async (id: string, event: UpdateEvent): Promise<Event | null> => {
        return this.request<Event>(`/calendar/events/${id}`, {
          method: "PATCH",
          body: JSON.stringify(event),
        });
      }
    },

    meetings: {
      create: async (token: string, call: Event, timezone: string): Promise<any> => {
        return this.request<any>("/calendar/meetings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            event: call,
            timezone,
          }),
        });
      }
    },

    schedule: {
      create: async (
        uid: string,
        calendarId: string,
        schedule?: NewWeekSchedule
      ): Promise<WeekSchedule | null> => {
        return this.request<WeekSchedule>(`/calendar/schedule/${uid}?calendarId=${calendarId}`, {
          method: "POST",
          body: JSON.stringify(schedule),
        });
      },

      get: async (uid: string): Promise<WeekSchedule | null> => {
        return this.request<WeekSchedule>(`/calendar/schedule/${uid}`);
      },

      update: async (
        uid: string,
        schedule: UpdateWeekSchedule
      ): Promise<WeekSchedule | null> => {
        return this.request<WeekSchedule>(`/calendar/schedule/${uid}`, {
          method: "PATCH",
          body: JSON.stringify(schedule),
        });
      },

      getAvailability: async (uid: string, date?: string): Promise<ScheduleAvailability | null> => {
        const url = date
          ? `/calendar/schedule/${uid}/available?date=${date}`
          : `/calendar/schedule/${uid}/available`;
        return this.request<ScheduleAvailability>(url);
      }
    }
  };

  files = {
    upload: async (bucket: string, path: string, file: File): Promise<FileObject | null> => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        return this.request<FileObject | null>(`/files/${bucket}/${path}`, {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        return null;
      }
    }
  };

  positions = {
    list: async (locale: string): Promise<Position[] | null> => {
      return this.request<Position[]>(`/positions/${locale}`, {
        method: "GET",
      });
    },

    getById: async (locale: string, positionId: string): Promise<Position | null> => {
      return this.request<Position>(`/positions/${locale}/${positionId}`, {
        method: "GET",
      });
    }
  };

  pricing = {
    getFull: async (): Promise<Pricing[] | null> => {
      return this.request<Pricing[]>("/pricing", {
        method: "GET",
      });
    },

    getShort: async (): Promise<ShortPricing[] | null> => {
      return this.request<ShortPricing[]>("/pricing/short", {
        method: "GET",
      });
    }
  };

  rooms = {
    getById: async (id: string): Promise<Room | null> => {
      return this.request<Room>(`/rooms/${id}`, {
        method: "GET",
      });
    },

    create: async (body: TablesInsert<"rooms">): Promise<Room | null> => {
      return this.request<Room>("/rooms", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  };

  sources = {
    list: async (code: string): Promise<NewsSource[] | null> => {
      return this.request<NewsSource[]>(`/news/news-sources?country_code=${code}`, {
        method: "GET",
      });
    },

    getById: async (source_id: string): Promise<NewsSource | null> => {
      return this.request<NewsSource>(`/news/news-sources/${source_id}`, {
        method: "GET",
      });
    }
  };

  store = {
    list: async (): Promise<Publication[] | null> => {
      return this.request<Publication[]>("/store");
    },

    getById: async (id: string): Promise<Publication | null> => {
      return this.request<Publication>(`/store/${id}`);
    }
  };

  timezone = {
    list: async (): Promise<Timezone | null> => {
      return this.request<Timezone>("/timezones");
    }
  };

  user = {
    auth: {
      getCurrent: async (): Promise<UserObject | null> => {
        return this.request<UserObject>("/auth/current", {
          method: "GET",
        });
      },

      getSession: async (): Promise<Session | null> => {
        return this.request<Session>("/auth/current/session");
      }
    },

    getById: async (id: string): Promise<UserObject | null> => {
      return this.request<UserObject>(`/user/${id}`, {
        method: "GET",
      });
    },

    getByIds: async (uids: string[]): Promise<UserObject[]> => {
      const response = await Promise.all(uids.map(id => this.user.getById(id)));
      return response.filter(item => !!item) as UserObject[];
    },

    update: async (id: string, data: Partial<UserAttributes>): Promise<UserAttributes | null> => {
      return this.request<UserAttributes>(`/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    }
  };
}

// Create default instance
export const yz13 = new YZ13Client({
  baseUrl: API_URL,
  timeout: 10000,
  retries: 3
});

// Export classes and types
export { HTTPError, YZ13Client };
export type { ClientConfig, RequestOptions };

