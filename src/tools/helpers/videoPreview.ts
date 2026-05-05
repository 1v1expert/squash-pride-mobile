import {createThumbnail} from 'react-native-create-thumbnail';

const thumbnailCache = new Map<string, string | undefined>();
const inFlightThumbnailRequests = new Map<string, Promise<string | undefined>>();

export const normalizeVideoUrl = (rawUrl: string) => {
  if (!rawUrl) {
    return '';
  }

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }

  return `https://internal.squash-pride.ru/api/media/${rawUrl}`;
};

export const getVideoThumbnail = async (
  rawUrl: string,
  cacheName: string,
): Promise<string | undefined> => {
  const cacheKey = `${cacheName}::${rawUrl}`;

  if (thumbnailCache.has(cacheKey)) {
    return thumbnailCache.get(cacheKey);
  }

  const pendingRequest = inFlightThumbnailRequests.get(cacheKey);
  if (pendingRequest) {
    return pendingRequest;
  }

  const url = normalizeVideoUrl(rawUrl);
  if (!url) {
    thumbnailCache.set(cacheKey, undefined);
    return undefined;
  }

  const request = (async () => {
    try {
      const response = await createThumbnail({
        url,
        timeStamp: 0,
        format: 'jpeg',
        cacheName,
      });
      thumbnailCache.set(cacheKey, response.path);
      return response.path;
    } catch {
      thumbnailCache.set(cacheKey, undefined);
      return undefined;
    } finally {
      inFlightThumbnailRequests.delete(cacheKey);
    }
  })();

  inFlightThumbnailRequests.set(cacheKey, request);
  return request;
};