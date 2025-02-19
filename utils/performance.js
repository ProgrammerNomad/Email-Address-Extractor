export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const processInBatches = async (items, batchSize, processFn) => {
  const chunks = chunkArray(items, batchSize);
  const results = [];
  
  for (const chunk of chunks) {
    const result = await processFn(chunk);
    results.push(...result);
  }
  
  return results;
};