export const isMaster = () => ac.getDeviceId() === ac.getMasterControllerDeviceId();

// https://stackoverflow.com/a/45556840/5352227
export const sample = <T extends any>(population: Array<T>, k: number): Array<T> => {
  if (!Array.isArray(population))
    throw new TypeError("Population must be an array.");
  const n = population.length;
  if (k < 0 || k > n)
    throw new RangeError("Sample larger than population or is negative");

  if (k === 1) {
    return [population[Math.floor(Math.random() * population.length)]]
  }

  const result = new Array(k);
  let setsize = 21;   // size of a small set minus size of an empty list

  if (k > 5)
    setsize += Math.pow(4, Math.ceil((Math.log(k * 3) / Math.log(4))))

  if (n <= setsize) {
    // An n-length list is smaller than a k-length set
    const pool = population.slice();
    for (let i = 0; i < k; i++) {          // invariant:  non-selected at [0,n-i)
      let j = Math.random() * (n - i) | 0;
      result[i] = pool[j];
      pool[j] = pool[n - i - 1];       // move non-selected item into vacancy
    }
  } else {
    const selected = new Set();
    for (let i = 0; i < k; i++) {
      let j = Math.random() * n | 0;
      while (selected.has(j)) {
        j = Math.random() * n | 0;
      }
      selected.add(j);
      result[i] = population[j];
    }
  }

  return result;
}