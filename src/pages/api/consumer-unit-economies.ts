import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const result = await prisma.$queryRaw<
                { consumer_unit: string; economy_percentage: number }[]
            >`
      SELECT
        consumer_unit,
        (SUM(economy_value) / SUM(value + economy_value + power_distribution_unit_bill_value)) * 100 AS economy_percentage
      FROM "ConsumerUnitEconomies"
      GROUP BY consumer_unit;
    `

            return res.status(200).json(result)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao buscar dados' })
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido' })
    }
}
