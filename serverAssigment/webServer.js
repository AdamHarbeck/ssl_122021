const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

// Create the server
http.createServer(function (req, res){

    let parsed = url.parse(req.url);
    let filename = path.parse(parsed.pathname);
    console.log(filename)
    let filen = filename.name == ""? "index" : filename.name
    let ext = filename.ext == "" ? ".html" : filename.ext
    let dir = filename.dir == "/" ? "" : filename.dir + "/"
    let page = filename.name == "" ? "index.html" : filename.name;

    let f = (dir + filen + ext).replace("/", "") // Removing the / and replacing with a blank
    console.log(f)
    // Create objects for file types
    const mimeTypes = {
        ".html" : "text/html",
        ".js" : "text/javascript",
        ".css" : "text/css",
        ".png" : "image/png",
        ".jpg" : "image/jpg",
        ".gif" : "image/gif"
    }

    if(f){
        fs.readFile(f, function(err, data){
            console.log(page)
            console.log(mimeTypes.hasOwnProperty(ext))
            console.log(mimeTypes[ext])
            if(page){
                if(mimeTypes.hasOwnProperty(ext)){
                    res.writeHead(200, {
                        "Content-Type" : mimeTypes[ext]
                    })
                    if(ext == ".html"){
                        res.write("<script>let page = '#1ad'</script>")
                    }
                    res.end(data, 'utf8')
                }
            }else{
                res.writeHead(505)
                res.end("WRONG")
            }
        })

    }

}).listen("8080", () =>{
    console.log("info", "Server is on port " + 8080);
})