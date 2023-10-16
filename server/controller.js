// Set up a global varaiable to simulate a DB
let TEST_DATA = [
    { id: 0, description: 'Content plan', rate: 50, hours: 4 },
    { id: 1, description: 'Copy writing', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
  ];

let globalId = 4

const handlerFunctions = {
    // each key of handlerFunctions is a function, whose value is the function definition

    getInvoices: (req, res) => {
        res.send(TEST_DATA)
    },

    addInvoice: (req, res) => {
        //get description/rate/hours from req.body
        const description = req.body.description
        // const { rate, hours } = req.body

        //creat a new object
        const newObj = {
            id: globalId,
            description: description,
            rate: 0,
            hours: 0
        }

        //add this newObj to TEST_DATA
        TEST_DATA.push(newObj)

        //increment my globalId for next newObj creation
        globalId++

        // send back the newObj
        res.send(newObj)
    },

    deleteInvoice:  (req, res) => {
        // need to grab id from params
        const id = req.params.id 
        
        // remove the element with said id from TEST_DATA
        TEST_DATA = TEST_DATA.filter((invoice) => invoice.id !== +id)

        res.send(TEST_DATA)

    },

    editInvoice: (req, res) => {
        // need to grab id from params
        const { id } = req.params
        const { description, rate, hours } = req.body

        //need to find corresponding 
        const index = TEST_DATA.findIndex(invoice => invoice.id == id)
        const invoiceItem = TEST_DATA[index]

        invoiceItem.description = description
        invoiceItem.rate = +rate
        invoiceItem.hours = +hours

        res.send(invoiceItem)

    }

}

export default handlerFunctions