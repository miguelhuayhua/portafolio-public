
//charts
import 'chart.js/auto'
import { Line, Bar } from 'react-chartjs-2';


export const LineChart = () => {
    return (
        <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: 'black' },
                        align: 'start',
                    },
                    title: {
                        display: true,
                        text: 'LDC/PF de los lenguajes de programación',
                        color: "#111"
                    },
                    tooltip: {
                        backgroundColor: '#111',
                        bodyColor: '#BBB',
                        titleColor: '#BBB',
                        bodyFont: { size: 14 }
                    },
                },
                scales: {
                    y: {
                        ticks: {
                            color: "#222",
                            font: {
                                size: 12,
                            },
                            stepSize: 10,
                            beginAtZero: true,
                        },
                        grid: {
                            borderColor: "#222",
                            borderWidth: 2,
                            color: '#AAA',

                        }
                    },
                    x: {
                        ticks: {
                            color: "#222",
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: '#AAA'
                        }
                    }
                },
            }}
            data={{
                labels: ['Ensamblador', 'C', 'Cobol', 'Fortran', 'Pascal', 'Ada', '4ta Generación', 'Generadores', 'SQL', 'Hojas de cálculo'],

                datasets: [
                    {
                        label: 'Lenguajes de programación',
                        data: [320, 128, 105, 105, 90, 70, 20, 15, 12, 6],
                        borderColor: '#555',
                        backgroundColor: 'rgba(0,0,0,.4)',
                        fill: true,
                        pointBackgroundColor: '#111',
                    },
                ],
            }} />
    )
}

export const BarChart = () => {

    return (
        <Bar
            options={{
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#222' },
                    },
                    title: {
                        display: true,
                        text: 'Salario mínimo latinoamérica',
                        color: "#222"
                    },
                    tooltip: {
                        backgroundColor: '#111',
                        bodyColor: '#BBB',
                        titleColor: '#BBB',
                        bodyFont: { size: 14 }
                    },

                },
                scales: {
                    y: {
                        ticks: {
                            color: "#222",
                            font: {
                                size: 12,
                            },
                            stepSize: 10,
                            beginAtZero: true,
                        },
                        grid: {
                            borderColor: "#222",
                            borderWidth: 2,
                            color: '#AAA',

                        }
                    },
                    x: {
                        ticks: {
                            color: "#222",
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: '#AAA'
                        }
                    }
                },
            }}
            data={{
                labels: ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela'],

                datasets: [
                    {
                        label: 'Pais / Dolar',
                        data: [335, 327, 241, 430, 244, 425, 335, 272, 470, 29],
                        backgroundColor: 'rgba(0,0,0,.4)',
                    },
                ],
            }} />
    )
}