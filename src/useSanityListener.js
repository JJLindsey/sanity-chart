import { useEffect, useState } from "react"

const useSanityListener = (client) => {
    const [salesRecords, setSalesRecords] = useState([])
    //listin for stat changes in sanity
    const query = '*[_type == "salesRecords"]'
    const params = {}

    fetchRecords()

    useEffect(() => {
        const subscription = client
        .listen(query, params)
        .subscribe(newRecords => {
            console.log(JSON.stringify(newRecords.result, null, 4))
            let item = newRecords.result
            let records = [...salesRecords, item]
            setSalesRecords(records)
        })
        return () => {
            subscription.unsubscribe()
        }

    }, [client])

    function fetchRecords() {
        client.fetch(query, params).then(records => {
            console.log(records)
            setSalesRecords(records)
        })
    }
    return {salesRecords, setSalesRecords}
}
export default useSanityListener