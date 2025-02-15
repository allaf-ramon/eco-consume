import React, { useEffect, useState } from 'react'

interface EconomyData {
    consumer_unit: string
    economy_percentage: number
}

export default function HomePage() {
    const [data, setData] = useState<EconomyData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/consumer-unit-economies')
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Economia UCs</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Unidade Consumidora</th>
                            <th>Porcentagem Economia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.consumer_unit}>
                                <td>{item.consumer_unit}</td>
                                <td>{item.economy_percentage.toFixed(2)} %</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
