export const getVimeoVideoId = (url: string) => {
  return parseInt(url.split('/').pop()!, 10);
};
