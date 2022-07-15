export const tryCatch = async (fn: Function, ...args: string[]) => {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err];
  }
};
