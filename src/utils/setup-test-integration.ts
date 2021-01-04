
import * as typeorm from 'typeorm'
(typeorm as any).getRepository = jest.fn()

beforeAll(() => {
  const data: any = {};
  (typeorm as any).getRepository.mockReturnValue({
    findOne: async () => Promise.resolve(undefined),
    create: () => ({
      ...data,
      id: 0
    }),
    save: async () => Promise.resolve()
  })
})
