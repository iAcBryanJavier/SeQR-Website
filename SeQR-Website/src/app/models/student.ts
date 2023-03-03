export class Student {
    key?: string ;
    firstname?: string ;
    middlename?: string;
    lastname?: string;
    course?: string;
    studentId?:string;
    sex?: string;
    soNumber?: string;
    dataImg?: string;
    txnHash?: string;
    

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
    public setGender(sex: string){
        this.sex = sex;
    }
    public setDiplomaNumber(soNumber: string){
        this.soNumber = soNumber;
    }
    public setDataImg(dataImg: string){
        this.dataImg = dataImg;
    }
    public setTxnHash(txnHash: string){
        this.txnHash = txnHash;
    }
}
