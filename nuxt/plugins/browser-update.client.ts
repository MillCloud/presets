import browserUpdate from 'browser-update';

export default defineNuxtPlugin(() => {
  browserUpdate({
    required: { e: 79, f: 67, o: 50, s: 12, c: 63 },
    insecure: true,
    unsupported: true,
  });
});
