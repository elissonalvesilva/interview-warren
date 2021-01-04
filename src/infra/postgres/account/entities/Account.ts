import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

import { Customer } from '@/infra/postgres/customer/entities/Customer'

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

  @Column()
  balance: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => Customer, accounts => Account)
  customer: Customer
}
