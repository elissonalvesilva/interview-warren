import { Customer } from '@/infra/postgres/customer/entities/Customer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  accountNumber: number

  @Column()
  type: number

  @Column()
  balance: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Customer, customer => customer.id)
  customer: Customer
}
