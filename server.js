const http = require("http");
const fs = require("fs");

        //==============================================================================

http
    .createServer(function (request, response) {
        if (request.url === "/") {
            fs.readFile("text.txt", function (error, data) {
                console.log(error);
                if (error) {
                    response.end(error);
                } else {
                    response.writeHead(200, { "content-Type": "text/html" });
                    response.write(data);
                    return response.end();
                }
            });
        }
    
        console.log(response);

        if (request.url === "/create-a-file" && request.method === "POST") {
                let body = "";

                request.on("data", function (data) {
                    body += data.toString();
                });

                request.on("end", function () {
                    let parsedBody = JSON.parse(body);

                    fs.writeFile( "randomText.txt", "Hello, world!", function (err) {
                        if (err) {
                            response.end(err);
                        } else {
                            response.end("Updated File");
                        }
                    });

                fs.writeFile( "verbage.txt", "Hello, world!", function (err) {
                    if (err) {
                        response.end(err);
                    } else {
                        response.end("Updated File");
                    }
                });
            });
        }


        if (request.url === "/update-a-file" && request.method === "POST") {
            let body = "";
            request.on("data", function (data) {
                body += data.toString();
            });
            request.on("end", function () {
                let parsedBody = JSON.parse(body);
                fs.appendFile(
                    parsedBody.fileName,
                `\n${parsedBody.message}`,
                function (err) {
                        if (err) {
                            response.end(err);
                        } else {
                            response.end("Updated File");
                        }
                    }
                );
            });
        }
        
        if (request.url === "/delete-a-file" && request.method === "POST") {
            let body = "";
            request.on("data", function (data) {
                body += data.toString();
            });
            request.on("end", function () {
                let parsedBody = JSON.parse(body);

                fs.unlink(parsedBody.fileName, function (err) {
                    if (err) return response.end(err);

                    response.end(`${parsedBody.fileName} File Deleted`);
                });
            });
        }
    })
    .listen(3000, function () {
        console.log("Server Started!!!");
    });

    //==============================================================================




