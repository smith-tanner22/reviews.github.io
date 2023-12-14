const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(bodyParser.json())

// Serve static files from the public directory
app.use(express.static('public'))

app.post('/submit-form', (req, res) => {
    try {
        const formData = req.body
        let existingData = { "reviews": [] };

        // Read existing data from the JSON file if it exists
        if (fs.existsSync('reviews.json')) {
            const jsonData = fs.readFileSync('reviews.json', 'utf-8')

            // check if the file is empty or not properly formatted
            existingData = jsonData ? JSON.parse(jsonData) : { "reviews": [] }
        }

        // Add the new form data to existing data
        existingData.reviews.push(formData)

        // Write the updated data back to the JSON file
        fs.writeFileSync('reviews.json', JSON.stringify(existingData, null, 2))

        res.send('Form data submitted successfully!')
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error')
    }
})

// Serve the index.html file for the root url
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})