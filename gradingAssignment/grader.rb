class Grader
    def initialize(numGrade)
        @num_grade = numGrade
    end
    def get_grades
        if @num_grade <= 100 and @num_grade >= 90
            return "A"
        elsif @num_grade <= 89 and @num_grade >= 80
            return "B"
        elsif @num_grade <= 79 and @num_grade >= 70
            return "C"
        elsif @num_grade <= 69 and @num_grade >= 60
            return "D"
        else
            return "F"
        end
    end
end

def output(sName, assignment, letterG)
    puts "Student's Name: #{sName}" + "Assignment: #{assignment}" + "Letter Grade: #{letterG}"
end

puts "Student's name: "
name = gets
puts "Name of the Assignment: "
asgnmt = gets
given_grade = "none"

while given_grade == "none"
    puts "What number grade did #{name} get on #{asgnmt}?: "
    numGrade = gets
    if Integer(numGrade, exception: false)
        given_grade = Integer(numGrade)
        grader = Grader.new(given_grade)
        x = grader.get_grades
        output(name, asgnmt, x)
    else
        given_grade = "none"
    end
end
