export function normaliser(
  headers: string[],
  data: Array<Record<string, unknown>>,
): [string[], Array<Record<string, unknown>>] {
  const normalisedHeaders = headers.map((header) => header.replace(/_/g, ' '));

  const normalisedData = data.map((row) => {
    const normalisedRow: Record<string, unknown> = {};

    for (const key in row) {
      let value = row[key];

      if ((key === 'from' || key === 'to') && typeof value === 'string') {
        const date = new Date(value);
        value = date.toLocaleTimeString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      }

      normalisedRow[key.replace(/_/g, ' ')] = value;
    }

    normalisedRow._original = row;

    return normalisedRow;
  });

  return [normalisedHeaders, normalisedData];
}
