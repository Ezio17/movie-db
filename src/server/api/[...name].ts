import {
  defineEventHandler,
  getMethod,
  getQuery,
  readBody,
  createError,
  getRouterParam,
  parseCookies,
} from 'h3';
import { $fetch } from 'ofetch';

interface Response {
  response?: {
    status?: number;
    statusText?: string;
    data?: unknown;
  };
  message?: string;
  statusCode?: number;
}

export default defineEventHandler(async (event) => {
  if (!process.env.TMDB_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'TMDB API key is not configured',
    });
  }

  const method = getMethod(event);
  const query = getQuery(event);
  const apiPath = getRouterParam(event, 'name');
  const cookies = parseCookies(event);
  const locale = cookies.i18n_redirected || 'uk';
  const tmdbUrl = `https://api.themoviedb.org/3/${apiPath}`;

  try {
    const response = await $fetch(tmdbUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      query: {
        api_key: process.env.TMDB_API_KEY,
        language: locale,
        ...query,
      },
      ...(method !== 'GET' &&
        method !== 'HEAD' && {
          body: await readBody(event),
        }),
    });

    return response;
  } catch (error) {
    console.error('[TMDB Proxy] Error:', error);

    const errorResponse = error as Response;

    const statusCode = errorResponse.response?.status || errorResponse.statusCode || 500;
    const statusMessage =
      errorResponse.response?.statusText || errorResponse.message || 'TMDB API request failed';

    throw createError({
      statusCode,
      statusMessage,
      data: errorResponse.response?.data || null,
    });
  }
});
