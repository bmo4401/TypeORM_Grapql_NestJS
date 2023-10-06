export class ListEvents {
  when?: WhenEventFiler = WhenEventFiler.All;
  page: number = 1;
}
export enum WhenEventFiler {
  All = 1,
  Today,
  Tomorrow,
  ThisWeek,
  NextWeek,
}
