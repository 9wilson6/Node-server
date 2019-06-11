const fs = require('fs');

const requestHandler = (req, res) => {
    let url = req.url;

    if (url === "/") {
        res.write("<html>");
        res.write("<head> <title> greetings </title>");
        res.write("</head>");
        res.write("<body> <h2>Add your message below</h2> <form action='/message' method='POST'> <input type='text' name='message' placeholder='enter message'> <input type='submit' value='Send'> </form>  </body>");
        res.write("</html>");
        return res.end();
    } else if (url === "/message" && req.method === "POST") {
        const data = [];
        req.on('data', chunk => {
            data.push(chunk);
        });
        return req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            const message = parsedData.split('=')[1];
            fs.writeFile("message.txt", message, error => {

                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });

    }

    res.setHeader("Content-Type", 'text/html');
    res.write("<html>");
    res.write("<head> <title> greetings </title>");
    res.write("</head>");
    res.write("<body> <h2>Hello there my name is wilson and this is my first node js app</h2> </body>");
    res.write("</html>");
    res.end();
}

module.exports = requestHandler;