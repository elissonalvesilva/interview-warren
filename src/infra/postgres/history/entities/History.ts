import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

import { Account } from '@/infra/postgres/account/entities/Account'

@Entity('history')
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  type: 'withdraw' | 'deposit' | 'payment'

  /**
   * 0 - output
   * 1 - input
   */
  @Column({
    default: 1
  })
  movimentationType: 0 | 1

  @Column({
    type: 'float',
    default: 0
  })
  lastBalance: number

  @Column({
    type: 'float',
    default: 0
  })
  actualBalance: number

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Account, account => account.histories)
  account: Account
}
