export interface IHoraires {
  id: number;
  dayOfWeek: string;
  morningOpening: Date | null;
  morningClosing: Date | null;
  afternoonOpening: Date | null;
  afternoonClosing: Date | null;
}
