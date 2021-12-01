const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

class grader{
    getGrades(intGrade){
        if(intGrade <= 100 && intGrade >= 90 ){
            return "A"
        }else if(intGrade <= 89 && intGrade >= 80){
            return "B"
        }else if(intGrade <= 79 && intGrade >= 70){
            return "C"
        }else if(intGrade <= 69 && intGrade >= 60){
            return "D"
        }else if(intGrade <= 59 && intGrade >= 0){
            return "F"
        }else{}
    }
}
class Validate{
    validation(grade){
        if(parseInt(grade)){
            return true
        }else{
            return false
        }
    }
}


let newAssignment = new grader

rl.question("Enter students name: ", (name)=>{
    rl.question("What is the assignment?: ", (asgnmt) =>{
        let givenGrade = false;
        rl.question("What grade did "+ name + " get on "+ asgnmt+"?: ", (numGrade) =>{
            const pattern = /^[a-z]$/i;
            if(numGrade < 0 || numGrade > 100 || pattern.test(numGrade)){
                console.log("Enter a number between 100 and 0!")
                rl.question("What grade did "+ name + " get on "+ asgnmt+"?: ", (nGrade)=>{
                    let letterG = newAssignment.getGrades(Number(nGrade))
                    console.clear()
                    console.log("Student's Name: " + name +"\n","Assignment: " + asgnmt + "\n", "Grade received from " +asgnmt+": " + letterG)
                    process.exit()
                })
            }else{
                let letterG = newAssignment.getGrades(Number(numGrade))
                console.clear()
                console.log("Student's Name: " + name +"\n","Assignment: " + asgnmt + "\n", "Grade received from " +asgnmt+": " + letterG)
                process.exit()
            }
        })
    })
})

