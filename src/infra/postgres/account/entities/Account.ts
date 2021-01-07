import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

import { Customer } from '@/infra/postgres/customer/entities/Customer'
import { History } from '@/infra/postgres/history/entities/History'

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    unique: true
  })
  accountNumber: number

  @Column()
  type: number

  @Column({
    type: 'float',
    default: 0.0
  })
  balance: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Customer, customer => customer.accounts)
  customer: Customer

  @OneToMany(() => History, history => history.account)
  histories: History[]
}
