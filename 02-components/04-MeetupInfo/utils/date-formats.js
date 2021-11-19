export function formatAsLocaleDateString(date) {
  return new Date(date).toLocaleDateString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatAsISODateString(date) {
  return new Date(date).toISOString().split('T')[0];
}