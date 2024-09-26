export interface Beeper {
  id: Number;
  name: string;
  status: string;
  created_at: Date;
  detonated_at?: Date;
  latitude?: Number;
  longitude?: Number;
}
