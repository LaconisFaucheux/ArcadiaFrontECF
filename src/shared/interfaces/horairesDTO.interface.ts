export interface IHorairesDTO{
  id: number;
  dayOfWeek: string;
  morningOpening: string | null;
  morningClosing: string | null;
  afternoonOpening: string | null;
  afternoonClosing: string | null;
}
