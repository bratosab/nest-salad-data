import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Dressing } from './dressing.entity';
import { Topping } from './topping.entity';

@Entity()
export class Salad {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  date: Date;

  @ManyToMany((type) => Topping, (topping) => topping.id, {
    cascade: true,
  })
  @JoinTable()
  toppings: Topping[];

  @ManyToMany((type) => Dressing, (dressing) => dressing.id, {
    cascade: true,
  })
  @JoinTable()
  dressing: Dressing;
}
