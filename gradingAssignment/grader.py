import sys
import re



class Grader:
    def __init__(self, numGrade) :
        self.g = numGrade
    def getGrade(self) :
        if self.g <= 100 and self.g >= 90 :
            return "A"
        elif self.g <= 89 and self.g >= 80 :
            return "B"
        elif self.g <= 79 and self.g >= 70 :
            return "C"
        elif self.g <= 69 and self.g >= 60 :
            return "D"
        else : return "F"

class Validate:
    def __init__(self, userInput) :
        self.g = userInput
    def validation(self) :
        if self.g > 100 or self.g < 0 :
            notAccurate = True
            print("Enter a number between 100 and 0.")
            return False
        else :
            return True

def output(sName, asgnmt, sGrade) :
    print("Student's Name: %s"%name + "\nAssignment: %s"%assignment + "\nLetter Grade: %s"%givenGrade )

name = raw_input("What is the student's name?: ")
assignment = raw_input("What is the name of the assignment?: ")
givenGrade = None

while givenGrade == None :
    numGrade = raw_input("What number grade did " + name + " receive on " + assignment+"?: ")
    try:
        int(numGrade)
        newValidation = Validate(int(numGrade))
        x = newValidation.validation()
        if x == False :
            givenGrade = None
        else:
            newGrader = Grader(int(numGrade))
            letterG = newGrader.getGrade()
            givenGrade = letterG
            output(name, assignment, givenGrade)
    except ValueError:
        print("Please enter a number between 100 and 0.")
        givenGrade = None


