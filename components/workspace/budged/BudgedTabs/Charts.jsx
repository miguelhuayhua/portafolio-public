
//charts
import 'chart.js/auto'
import { Line, Bar } from 'react-chartjs-2';


export const LineChart = ({ data = [320, 128, 105, 105, 90, 70, 20, 15, 12, 6]
    , labels = ['Ensamblador', 'C', 'Cobol', 'Fortran', 'Pascal', 'Ada', '4ta Generación', 'Generadores', 'SQL', 'Hojas de cálculo'],
    text = 'LDC/PF de los lenguajes de programación', label = 'Lenguajes de programación',
    id }) => {
    return (
        <Line id={id}
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
                        text,
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
                labels,
                datasets: [
                    {
                        label,
                        data,
                        borderColor: '#555',
                        backgroundColor: 'rgba(0,0,0,.4)',
                        fill: true,
                        pointBackgroundColor: '#111',
                    },
                ],
            }} />
    )
}

export const BarChart = ({
    text = 'Salario mínimo latinoamérica',
    labels = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela'],
    data = [335, 327, 241, 430, 244, 425, 335, 272, 470, 29],
    label = 'Pais / Dolar',
    id
}) => {

    return (
        <Bar
            id={id}
            options={{
                indexAxis: 'x',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#222' },
                    },
                    title: {
                        display: true,
                        text,
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
                labels,
                datasets: [
                    {
                        label,
                        data,
                        backgroundColor: 'rgba(0,0,0,.4)',
                    },
                ],
            }} />
    )
}