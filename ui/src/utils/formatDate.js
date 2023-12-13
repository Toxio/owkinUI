export function formatDate (dateString, locale = 'fr-FR') {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(date);
};
