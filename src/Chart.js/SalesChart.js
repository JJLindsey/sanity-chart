import { useEffect, useState } from "react"
import useSanityListener from "../useSanityListener"
import { Bar } from "react-chartjs-2"

const sanityClient = require("@sanity/client")


export default function SalesChart() {
    const client = sanityClient({
        projectId: "9i7s6b2y",
        dataset: "production",
        apiVersion: "v2021-03-25",
        useCdn: false
    })

    const {salesRecords} = useSanityListener(client)
    const [chartData, setChartData] = useState({})
    const [records, setSalesRecords] = useState([])

    useEffect(() => {
        if (salesRecords && salesRecords.length > 0) {
            console.log(salesRecords)
            let labels = ["January", "February", "March", "April", "May", "June"]

            let salesData = labels.map(label => {
                console.log(label)
                const monthData = salesRecords.filter(record => record.month === label)
                console.log(monthData)
                return monthData[0].totalsales
            })

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: "Sales Data Set",
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: salesData
                    }
                ]
            }
            setChartData(data)
            setSalesRecords(salesRecords)
        }
    }, [salesRecords])
  return (
    <div>
        <h1>Sales Chart in Realtime</h1>
        <Bar 
            data={chartData}
            options={{
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {beginAtZero: true
                        }
                        }]}
            }}
        />
    </div>
  )
}
