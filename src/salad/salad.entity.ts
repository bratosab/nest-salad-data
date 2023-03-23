import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Salad {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  date: Date;
}
