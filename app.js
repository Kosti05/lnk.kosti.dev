const express = require('express');
const connection = require('./dbConnection');

const path = require('path');
const app = express();
const port = 440;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public', 'index')));

// Dynamic route handling for any /xxx
app.get('/:code', async (req, res) => {
    const code = req.params.code;
    
    if (code == 'create') {
        const url = req.query.url;
        if(!url) {
            res.status(400);
            res.sendFile(path.join(__dirname, 'public', 'error', '400.html'));
            return;
        }

        if (!url.includes("https://") && !url.includes("http://")) {
            res.status(400);
            res.sendFile(path.join(__dirname, 'public', 'error', '400.html'));
            return;
        }
        
        const url_code = generateCode();
        setURL(url, url_code);
        res.status(200).send(url_code);
        return;
    }

    // Logic to check if the resource is available
    const url = await getURL(code);
    if (url) {
        res.redirect(url);
    } else {
        res.redirect('https://lnk.kosti.dev');
    }
});



async function getURL(code) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT url FROM links WHERE code = ?', [code], (error, results) => {
            if (error) {
                reject(error);
            } else {
                results = JSON.parse(JSON.stringify(results));
                resolve(results[0]?.url);
            }
        });
    });
}

function setURL(url, code) {
    connection.query('INSERT INTO links (url, code) VALUES (?, ?)', [url, code], (error, results, fields) => {
        if (error) throw error;
    });
}

function generateCode() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let counter = 0; counter < 10; counter++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
