import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const csvFilePath = path.join(__dirname, '..', 'base_teste.csv')

    const data = fs.readFileSync(csvFilePath, 'utf-8')

    const lines = data.trim().split('\n')

    const header = lines.shift()

    for (const line of lines) {
        const [
            id,
            consumer_unit,
            status,
            month_ref,
            value,
            economy_value,
            power_distribution_unit_bill_value
        ] = line.split(';')

        await prisma.consumerUnitEconomies.create({
            data: {
                id: Number(id),
                consumer_unit: consumer_unit,
                status: status,
                month_ref: new Date(month_ref),
                value: parseFloat(value),
                economy_value: parseFloat(economy_value),
                power_distribution_unit_bill_value: parseFloat(power_distribution_unit_bill_value)
            }
        })
    }

    console.log('Dados inseridos com sucesso!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
