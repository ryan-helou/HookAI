import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

let goodHooks: string[] = [];
let isLoaded = false;

export const loadGoodHooks = async (): Promise<string[]> => {
  if (isLoaded && goodHooks.length > 0) {
    return goodHooks;
  }

  return new Promise((resolve, reject) => {
    const csvPath = process.env.GOOD_HOOKS_CSV_PATH || './data/good-hooks.csv';
    const fullPath = path.resolve(csvPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Good hooks CSV not found at ${fullPath}, using empty list`);
      isLoaded = true;
      resolve([]);
      return;
    }

    const hooks: string[] = [];

    fs.createReadStream(fullPath)
      .pipe(csv({ headers: ['Hook'] }))
      .on('data', (row: { Hook: string }) => {
        if (row.Hook && row.Hook.trim()) {
          hooks.push(row.Hook.trim());
        }
      })
      .on('end', () => {
        goodHooks = hooks;
        isLoaded = true;
        console.log(`✓ Loaded ${goodHooks.length} good hooks from CSV`);
        resolve(goodHooks);
      })
      .on('error', (error) => {
        console.error('Error loading hooks CSV:', error);
        reject(error);
      });
  });
};

export const getGoodHooks = (): string[] => {
  if (!isLoaded) {
    console.warn('⚠️  Good hooks not yet loaded, returning empty list');
  }
  return goodHooks;
};

export const getSampleHooks = (count: number = 20): string[] => {
  const hooks = getGoodHooks();
  if (hooks.length === 0) return [];

  // Return evenly distributed sample from the list
  const step = Math.floor(hooks.length / count);
  const samples: string[] = [];

  for (let i = 0; i < count && i * step < hooks.length; i++) {
    samples.push(hooks[i * step]);
  }

  return samples;
};
