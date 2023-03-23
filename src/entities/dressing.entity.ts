import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dressing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;
}
