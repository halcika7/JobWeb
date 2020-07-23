export const GridColumns = (columns: number) => ({
  display: 'grid',
  'grid-template-columns': `repeat(${columns}, 1fr)`,
});

export const GridColumnsGap = (columns: number, gap: number) => ({
  ...GridColumns(columns),
  gap: `${gap}rem`,
});

export const GridColumnsPerc = (perc: string) => ({
  display: 'grid',
  'grid-template-columns': `${perc}`,
});
