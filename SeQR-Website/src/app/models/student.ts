export class Student {
    key?: string ;
    firstName?: string ;
    middleName?: string;
    lastName?: string;
    course?: string;
    batch?: string;
    studentId?:string;
    gender?: string;
    diplomaNumber?: string;

    public setName(firstName:string, middleName:string, lastName:string) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    public setCourse(studentCourse: string){
        this.course = studentCourse;
    }
    public setBatch(studentBatch: string){
        this.batch = studentBatch;
    }
    public setId(studentId: string){
        this.studentId = studentId;
    }
    public setGender(studentGender: string){
        this.gender = studentGender;
    }

    public setDiplomaNumber(diplomaNumber: string){
        this.diplomaNumber = diplomaNumber;
    }
}
