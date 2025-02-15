import React, { useEffect, useState } from 'react';

interface EconomyData {
    consumer_unit: string;
    economy_percentage: number;
}

export default function HomePage() {
    const [data, setData] = useState<EconomyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/consumer-unit-economies');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6">
            <h1 className="text-2xl font-bold mb-4">Economia UCs</h1>
            {loading ? (
                <p className="text-gray-400">Carregando...</p>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-700">
                    <table className="w-full text-left text-gray-300 bg-[#1E1E1E]">
                        <thead className="bg-[#2C2C2C] text-gray-100">
                            <tr>
                                <th className="px-4 py-2">Unidade Consumidora</th>
                                <th className="px-4 py-2">Porcentagem Economia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{item.consumer_unit}</td>
                                    <td className="px-4 py-2">{item.economy_percentage.toFixed(1)} %</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white'}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white'}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}
