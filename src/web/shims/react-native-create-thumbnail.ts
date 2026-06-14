type CreateThumbnailOptions = {
  url: string;
};

export const createThumbnail = async ({url}: CreateThumbnailOptions) => ({
  path: url,
});

export default {
  createThumbnail,
};