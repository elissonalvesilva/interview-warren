import * as fake from 'faker'

export const CustomerSeed = [
  {
    id: '21781f68-4fbb-11eb-ae93-0242ac130002',
    name: `${fake.name.firstName()} ${fake.name.lastName()}`,
    permanentAddress: fake.address.streetAddress(),
    createdAt: fake.date.recent(),
    updatedAt: fake.date.recent()
  },
  {
    id: '322c0374-4fbb-11eb-ae93-0242ac130002',
    name: `${fake.name.firstName()} ${fake.name.lastName()}`,
    permanentAddress: fake.address.streetAddress(),
    createdAt: fake.date.recent(),
    updatedAt: fake.date.recent()
  }
]

export const AccountSeed = [
  {
    id: fake.random.uuid(),
    accountNumber: 1234,
    type: 1,
    balance: 1000,
    createdAt: fake.date.recent(),
    updatedAt: fake.date.recent(),
    customer: '322c0374-4fbb-11eb-ae93-0242ac130002'
  },
  {
    id: fake.random.uuid(),
    accountNumber: 123,
    type: 1,
    balance: 1000,
    createdAt: fake.date.recent(),
    updatedAt: fake.date.recent(),
    customer: '21781f68-4fbb-11eb-ae93-0242ac130002'
  }
]
