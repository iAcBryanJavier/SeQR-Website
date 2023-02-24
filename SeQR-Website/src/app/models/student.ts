export class Student {
    key?: string ;
    firstname?: string ;
    middlename?: string;
    lastname?: string;
    course?: string;
    studentId?:string;
    gender?: string;
    soNumber?: string;

    public setName(firstname: string, middlename: string, lastname: string) {
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
    }

    public setCourse(course: string){
        this.course = course;
    }
    public setId(studentId: string){
        this.studentId = studentId;
    }
    public setGender(gender: string){
        this.gender = gender;
    }
    public setDiplomaNumber(soNumber: string){
        this.soNumber = soNumber;
    }
}
