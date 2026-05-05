import {createThumbnail} from 'react-native-create-thumbnail';

const thumbnailCache = new Map<string, string | undefined>();
const inFlightThumbnailRequests = new Map<string, Promise<string | undefined>>();
const MAX_CONCURRENT_THUMBNAILS = 2;
let activeThumbnailTasks = 0;
const thumbnailTaskQueue: Array<() => void> = [];

const runThumbnailTask = <T>(task: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const execute = () => {
      activeThumbnailTasks += 1;
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeThumbnailTasks -= 1;
          const nextTask = thumbnailTaskQueue.shift();
          if (nextTask) {
            nextTask();
          }
        });
    };

    if (activeThumbnailTasks < MAX_CONCURRENT_THUMBNAILS) {
      execute();
    } else {
      thumbnailTaskQueue.push(execute);
    }
  });
};

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
      const response = await runThumbnailTask(() =>
        createThumbnail({
          url,
          timeStamp: 0,
          format: 'jpeg',
          cacheName,
        }),
      );
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