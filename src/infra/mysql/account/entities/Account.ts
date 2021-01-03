import { Customer } from '@/infra/mysql/customer/entities/Customer'
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
  accountNumber: Number

  @Column()
  type: Number

  @Column()
  balance: Number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Customer, customer => customer.id)
  customer: Customer
}
