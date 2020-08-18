import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function dateFormatter(date: string): string {
  const parsedDate = parseISO(date);
  return formatDistance(parsedDate, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}
