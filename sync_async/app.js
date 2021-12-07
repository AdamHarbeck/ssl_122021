var http = require('http'); // Missing the p in HTTP
function myname(){ // Changed to function myname()
    return "Here is my IP address"
}
async function callHttpbin() { // put the n on the end of callHttpbin // changed to async function
    let promise = new Promise((resolve, reject) => {
        http.get(
            'http://httpbin.org/ip',
            function(response) {
                var str="";
                response.setEncoding('utf8');
                response.on('data', function(data){
                    str += data;
                });
                response.on('end', function() {
                    var result = JSON.parse(str);
                    let myips = result.origin; // Added let
                    resolve(myips) // added the argument myips
                });
            }
        );
    });

    let result = await promise;
     return result; // Added return
}
async function executeAsyncTask(){ // Changed to an async function
    const valueA = await callHttpbin()
    const valueB = myname();
    console.log(valueB+" "+valueA)
} // Added closing bracket
executeAsyncTask() // Added the method call