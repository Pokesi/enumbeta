export const apiUrl = 'https://api.grim.finance';
export const backUpUrl = 'https://api.grim.finance';
// Time-based cache buster
export const getApiCacheBuster = () => {
  return Math.trunc(Date.now() / (1000 * 60));
};
