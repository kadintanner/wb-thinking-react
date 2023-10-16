import './InvoiceTable.css';
import ModeButtons from './ModeButtons';
import DescriptionCell from './DescriptionCell';
import RateCell from './RateCell';
import HoursCell from './HoursCell';
import TableHeader from './TableHeader';
import AddButton from './AddButton';
import TableRow from './TableRow';
import { useState } from 'react';
import axios from 'axios';

let globalId = 4

const InvoiceTable = ({ initialInvoiceData }) => {

    const [currentData, setCurrentData] = useState(initialInvoiceData)
    
    const rows = currentData.map((invoiceItem) => {

        const { id, description, rate, hours, isEditing } = invoiceItem

        return (
            <TableRow
                key={id}
                id={id}
                initialInvoiceData={{ description, rate, hours }}
                initialIsEditing={isEditing}
                deleteFunc={() => deleteRow(id)}
            />
        )
    })

    // addRow function to pass to <AddButton /> to give it the ability to add a new object (row) to our currentData array
    const addRow = async () => {

        const response = await axios.post('/addInvoice', { description: "Job description here"})

        setCurrentData([...currentData, response.data])

    //     // get a copy of the current data
    //     const newInvoiceData = [...currentData]

    //     // create a new "blank" object for the new row (modeled after each element in TEST_DATA)
    //     const newRow = {
    //         id: globalId,
    //         description: 'Description',
    //         rate: '',
    //         hours: '',
    //         isEditing: true
    //     }
    //     // Add newRow object to the end of our copy of currentData:
    //     newInvoiceData.push(newRow)

    //     setCurrentData(newInvoiceData)

    //     // all above can be done with this instead:
    //     // setCurrentData([...currentData, newRow])

    //     globalId++
     }

    // delete function to pass to <TableRow /> components
    const deleteRow = async (itemId) => {

        const response = await axios.delete(`/deleteInvoice/${itemId}`)

        if (!response.data.error) { // if the rspose did not throw an error

            // using the given id above find the corresponding element in currentData and remove it
            const filteredList = currentData.filter((invoiceItem) => invoiceItem.id !== itemId)
    
            setCurrentData(filteredList)

        }


    }

    return (
       <div>
        <table>

            <thead>
                <TableHeader />
            </thead>

            <tbody>

                {rows}
          
            </tbody>

            <tfoot>
                <AddButton addClick={addRow}
                />
            </tfoot>

        </table>
       </div>
    )
}

export default InvoiceTable

