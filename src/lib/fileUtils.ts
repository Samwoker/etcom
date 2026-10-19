/**
 * Utility functions for in-browser file and image processing for demo purposes.
 * Keeps uploaded files in memory / data URLs without requiring any database.
 */

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader error'));
    reader.readAsDataURL(file);
  });
}

export function isDisplayableImage(urlOrName?: string | null): boolean {
  if (!urlOrName) return false;
  return (
    urlOrName.startsWith('data:image/') ||
    urlOrName.startsWith('blob:') ||
    urlOrName.startsWith('http://') ||
    urlOrName.startsWith('https://') ||
    urlOrName.startsWith('/images/') ||
    urlOrName.startsWith('/')
  );
}
