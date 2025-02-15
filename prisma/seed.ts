import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const csvFilePath = path.join(__dirname, '..', 'base_teste.csv')
    const data = fs.readFileSync(csvFilePath, 'utf-8')
    const lines = data.trim().split('\n')

    lines.shift()

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

        const dateValue = month_ref.trim() ? new Date(month_ref) : new Date()

        await prisma.consumerUnitEconomies.create({
            data: {
                id: Number(id),
                consumer_unit: consumer_unit,
                status: status,
                month_ref: dateValue,
                value: value.trim() ? parseFloat(value) : 0,
                economy_value: economy_value.trim() ? parseFloat(economy_value) : 0,
                power_distribution_unit_bill_value: power_distribution_unit_bill_value.trim() ? parseFloat(power_distribution_unit_bill_value) : 0
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
