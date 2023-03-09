import { Injectable } from '@angular/core';

import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { LoggingService } from './logging.service';
import { filter, map, switchMap, Observable, take } from 'rxjs';
import { Encryption } from '../models/encryption';
import { IpfsStudent } from '../interfaces/IpfsStudent';
import { GoerliEtherscanService } from './goerli-etherscan.service';
import { PinataService } from './pinata.service';
import { environment } from 'src/environments/environment';
import web3 from 'web3';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

 
  studentList!: Observable <any[]>;
  decryptedList!: Observable <any[]>;
  encryptFunction = new Encryption;
  public maleCount = 0;
  public femaleCount = 0;
  private BASE_URL = 'https://api-goerli.etherscan.io/api';

  constructor(private afs: AngularFireDatabase, private http: HttpClient, private logs:LoggingService,
    private goerliService: GoerliEtherscanService, private pinataService: PinataService) { }

  //add student
  addStudent(student: any){
    const ref = this.afs.list('students');
    ref.push(student).then(()=>{
      this.logs.info("User: " + localStorage.getItem('idUserEmail')+ " added a student record");

    }).catch(() =>{
      window.alert('An error occured, please try again.');
      throw "Add Student Failed";
    });
  }

  updateStudent(student: any, x: any, y: any, z:any) {
    // console.log(x,"-",y,"-",z);
    // console.log(student.studentId,"-",student.course,"-",student.soNumber);
    const ref = this.afs.list('students');
    const studentToUpdate = ref.snapshotChanges().pipe(
        map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...(c.payload.val() as any) })
            )
        ),
        map(students =>
            students.find(s =>
                s.studentId === x &&
                s.course === y &&
                s.soNumber === z
            )
        ),
        take(1)
    );
    studentToUpdate.subscribe((foundStudent) => {
        if (foundStudent) {
          ref.remove
          console.log(foundStudent);
          ref.update(foundStudent.key, student).then(() => {
                window.alert('Student record updated successfully!');
                this.logs.info("User: " + localStorage.getItem('idUserEmail') + " updated a student record");
            }).catch(() => {
                window.alert('An error occurred, please try again.');
                throw "Update Student Failed";
            });
        } else {
            window.alert('Student record not found.');
        }
    });
}

// getStudentCount(): Promise<number> {
//   let count = 0;
//   return new Promise<number>((resolve, reject) => {
//     this.afs.list<Student>('students').valueChanges().pipe(
//       take(1)
//     ).subscribe((students: Student[]) => {
//       if (students) {
//         resolve(students.length);
//       } else {
//         reject("No students found");
//       }
//     });
//   });
// }


async checkAddDuplicate(studentId: string | null, course: string | null, soNumber: string | null): Promise<any> {
  const result = {
    dupeCount: 0,
    dupeMessage: "",
  };

  return new Promise<any>((resolve, reject) => {
    this.afs.list('students').snapshotChanges().subscribe((items: any[]) => {
      const students = items.map(item => {
        const data = item.payload.val();
        if (data) {
          if(this.encryptFunction.decryptData(data.soNumber) === soNumber ){
            result.dupeMessage = "This Diploma number already exists!"
            result.dupeCount++;
           }else if(this.encryptFunction.decryptData(data.course) === course &&
           this.encryptFunction.decryptData(data.studentId) === studentId ){
            result.dupeMessage = "This Student already has a diploma record with the same degree!"
            result.dupeCount++;
           }

        }
        return data;
      }).filter(item => item !== null) // remove null items from the array;

      resolve(result);
    }, error => {
      reject(error);
    });
  });
}

async checkEditDuplicate(studentId: string | null, course: string | null, soNumber: string | null): Promise<any> {
  const result = {
    dupeCount: 0,
    dupeMessage: "",
  };

  return new Promise<any>((resolve, reject) => {
    this.afs.list('students').snapshotChanges().subscribe((items: any[]) => {
      const students = items.map(item => {
        const data = item.payload.val();
        if (data) {
          if(this.encryptFunction.decryptData(data.soNumber) === soNumber ){
            result.dupeMessage = "This Diploma number already exists!"
            result.dupeCount++;
           }else if(this.encryptFunction.decryptData(data.course) === course &&
           this.encryptFunction.decryptData(data.studentId) === studentId ){
            result.dupeMessage = "This Student already has a diploma record with the same degree!"
            result.dupeCount++;
           }

        }
        return data;
      }).filter(item => item !== null) // remove null items from the array;

      resolve(result);
    }, error => {
      reject(error);
    });
  });
}








  setStudentList(){
    console.log(this.getStudent());
    this.studentList = this.getStudent();
  }



  getStudent(): Observable<any[]> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        return items.map(item => {

          const data = item.payload.val();
          if (data) { // check if data is not null
            return {
              key: item.payload.key,
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber),
              dataImg: data.dataImg,
              txnHash: data.txnHash
            };
          } else {
            return null;
          }
        }).filter(item => item !== null); // remove null items from the array
      })
    );
  }

  getStudentsByGender(gender: string): Observable<{ males: number, females: number }> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        const students = items.map(item => {
          const data = item.payload.val();
          if (data) { // check if data is not null
            const student = {
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber)
            };
            return student;
          } else {
            return null;
          }
        }).filter(item => item !== null) // remove null items from the array;

        const result = {
          males: 0,
          females: 0
        };

        students.forEach(student => {
          if (student) { // check if data is not null
            if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
              result.males++;
            } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
              result.females++;
            }
          }
        });

        return result;
      })
    );
  }

  // getStudentsByCourse(course: string): Observable<{ [key: string]: number }> {
  //   return this.afs.list('students').snapshotChanges().pipe(
  //     map((items: any[]) => {
  //       const students = items.map(item => {
  //         const data = item.payload.val();
  //         if (data) { // check if data is not null
  //           const student = {
  //             studentId: this.encryptFunction.decryptData(data.studentId),
  //             firstname: this.encryptFunction.decryptData(data.firstname),
  //             middlename: this.encryptFunction.decryptData(data.middlename),
  //             lastname: this.encryptFunction.decryptData(data.lastname),
  //             course: this.encryptFunction.decryptData(data.course),
  //             sex: this.encryptFunction.decryptData(data.sex),
  //             soNumber: this.encryptFunction.decryptData(data.soNumber)
  //           };
  //           return student;
  //         } else {
  //           return null;
  //         }
  //       }).filter(item => item !== null) // remove null items from the array;

  //       const result = {
  //         BSEMC: 0,
  //         BSIT: 0,
  //         BSCS: 0,
  //         BSANIMATION: 0,
  //         BSMAD: 0,
  //         BSFD: 0,
  //         BSFILM: 0,
  //         BAMUSIC: 0,
  //         BSPSYCH: 0,
  //         BSACCT: 0
  //       };

  //       students.forEach(student => {
  //         if (student) { // check if data is not null
  //           if (student.course === 'BSEMC'  || student.course === 'Bachelor of Science in Entertainment and Multimedia Computing'  ){
  //             result.BSEMC++;
  //           } else if (student.course === 'BSIT' || student.course === 'Bachelor of Science in Information Technology'  ) {
  //             result.BSIT++;
  //           }
  //           else if (student.course === 'BSCS'  || student.course === 'Bachelor of Science in Computer Science' ) {
  //             result.BSCS++;
  //           }
  //           else if (student.course === 'BS-ANIMATION' || student.course === 'Bachelor of Science in Animation'  ) {
  //             result.BSANIMATION++;
  //           }
  //           else if (student.course === 'BS-MAD' || student.course === 'Bachelor of Arts in Multimedia Arts and Design'  ) {
  //             result.BSMAD++;
  //           }
  //           else if (student.course === 'BSFD'  || student.course === 'Bachelor of Arts in Fashion Design and Technology' ) {
  //             result.BSFD++;
  //           }
  //           else if (student.course === 'BS-FILM' || student.course === 'Bachelor of Arts in Film and Visual Effects' ) {
  //             result.BSFILM++;
  //           }
  //           else if (student.course === 'BS-MUSIC' || student.course === 'Bachelor of Arts in Music Production and Sound Design' ) {
  //             result.BAMUSIC++;
  //           }
  //           else if (student.course === 'BSPSYCH' || student.course === 'Bachelor of Arts in Psychology' ) {
  //             result.BSPSYCH++;
  //           }
  //           else if (student.course === 'BSACCT' || student.course === 'Bachelor of Science in Accountancy' ) {
  //             result.BSACCT++;
  //           }
  //         }
  //       });

  //       return result;
  //     })
  //   );
  // }
  getStudentsByCourse(course: string): Observable<{ BSEMC: number, BSIT: number, BSCS: number, BSANIMATION: number,
    BSMAD: number, BSFD: number,  BSFILM: number, BAMUSIC: number, BSPSYCH: number, BSACCT: number}> {
      return this.afs.list('students').snapshotChanges().pipe(
        map((items: any[]) => {
          const students = items.map(item => {
            const data = item.payload.val();
            if (data) { // check if data is not null
              const student = {
                studentId: this.encryptFunction.decryptData(data.studentId),
                firstname: this.encryptFunction.decryptData(data.firstname),
                middlename: this.encryptFunction.decryptData(data.middlename),
                lastname: this.encryptFunction.decryptData(data.lastname),
                course: this.encryptFunction.decryptData(data.course),
                sex: this.encryptFunction.decryptData(data.sex),
                soNumber: this.encryptFunction.decryptData(data.soNumber)
              };
              return student;
            } else {
              return null;
            }
          }).filter(item => item !== null) // remove null items from the array;

          const result = {
              BSEMC: 0,
              BSIT: 0,
              BSCS: 0,
              BSANIMATION: 0,
              BSMAD: 0,
              BSFD: 0,
              BSFILM: 0,
              BAMUSIC: 0,
              BSPSYCH: 0,
              BSACCT: 0,
              //gender
              BSEMC_male: 0,
              BSEMC_female: 0,
              BSIT_male: 0,
              BSIT_female: 0,
              BSCS_male: 0,
              BSCS_female: 0,
              BSANIMATION_male: 0,
              BSANIMATION_female: 0,
              BSMAD_male: 0,
              BSMAD_female: 0,
              BSFD_male: 0,
              BSFD_female: 0,
              BSFILM_male: 0,
              BSFILM_female: 0,
              BAMUSIC_male: 0,
              BAMUSIC_female: 0,
              BSPSYCH_male: 0,
              BSPSYCH_female: 0,
              BSACCT_male: 0,
              BSACCT_female: 0
            };

          const gender = {
            males: 0,
            females: 0
          }

            students.forEach(student => {
              if (student) { // check if data is not null
                if (student.course === 'BSEMC'  || student.course === 'Bachelor of Science in Entertainment and Multimedia Computing'  ){
                  result.BSEMC++;
                } else if (student.course === 'BSIT' || student.course === 'Bachelor of Science in Information Technology'  ) {
                  result.BSIT++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSIT_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSIT_female++;
                  }
                }
                else if (student.course === 'BSCS'  || student.course === 'Bachelor of Science in Computer Science' ) {
                  result.BSCS++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSCS_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSCS_female++;
                  }
                }
                else if (student.course === 'BS-ANIMATION' || student.course === 'Bachelor of Science in Animation'  ) {
                  result.BSANIMATION++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSANIMATION_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSANIMATION_female++;
                  }
                }
                else if (student.course === 'BS-MAD' || student.course === 'Bachelor of Arts in Multimedia Arts and Design'  ) {
                  result.BSMAD++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSMAD_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSMAD_female++;
                  }
                }
                else if (student.course === 'BSFD'  || student.course === 'Bachelor of Arts in Fashion Design and Technology' ) {
                  result.BSFD++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSFD_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSFD_female++;
                  }
                }
                else if (student.course === 'BS-FILM' || student.course === 'Bachelor of Arts in Film and Visual Effects' ) {
                  result.BSFILM++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSFILM_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSFILM_female++;
                  }
                }
                else if (student.course === 'BA-MUSIC' || student.course === 'Bachelor of Arts in Music Production and Sound Design' ) {
                  result.BAMUSIC++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BAMUSIC_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BAMUSIC_female++;
                  }
                }
                else if (student.course === 'BSPSYCH' || student.course === 'Bachelor of Arts in Psychology' ) {
                  result.BSPSYCH++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSPSYCH_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSPSYCH_female++;
                  }
                }
                else if (student.course === 'BSACCT' || student.course === 'Bachelor of Science in Accountancy' ) {
                  result.BSACCT++;
                  if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
                    result.BSACCT_male++;
                  } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
                    result.BSACCT_female++;
                  }
                }
              }
            });
            return result;
          })
        );
    }

    getGenderByCourse(course: string): Observable<{ [key: string]: number }> {
      return this.afs.list('students').snapshotChanges().pipe(
        map((items: any[]) => {
          const students = items.map(item => {
            const data = item.payload.val();
            if (data) { // check if data is not null
              const student = {
                studentId: this.encryptFunction.decryptData(data.studentId),
                firstname: this.encryptFunction.decryptData(data.firstname),
                middlename: this.encryptFunction.decryptData(data.middlename),
                lastname: this.encryptFunction.decryptData(data.lastname),
                course: this.encryptFunction.decryptData(data.course),
                sex: this.encryptFunction.decryptData(data.sex),
                soNumber: this.encryptFunction.decryptData(data.soNumber)
              };
              return student;
            } else {
              return null;
            }
          }).filter(item => item !== null) // remove null items from the array;

          const result = {
            BSEMC: 0,
            BSIT: 0,
            BSCS: 0,
            BSANIMATION: 0,
            BSMAD: 0,
            BSFD: 0,
            BSFILM: 0,
            BAMUSIC: 0,
            BSPSYCH: 0,
            BSACCT: 0
          };

          students.forEach(student => {
            if (student) { // check if data is not null
              if (student.course === 'BSEMC'  || student.course === 'Bachelor of Science in Entertainment and Multimedia Computing'  ){
                result.BSEMC++;
              } else if (student.course === 'BSIT' || student.course === 'Bachelor of Science in Information Technology'  ) {
                result.BSIT++;
              }
              else if (student.course === 'BSCS'  || student.course === 'Bachelor of Science in Computer Science' ) {
                result.BSCS++;
              }
              else if (student.course === 'BS-ANIMATION' || student.course === 'Bachelor of Science in Animation'  ) {
                result.BSANIMATION++;
              }
              else if (student.course === 'BS-MAD' || student.course === 'Bachelor of Arts in Multimedia Arts and Design'  ) {
                result.BSMAD++;
              }
              else if (student.course === 'BSFD'  || student.course === 'Bachelor of Arts in Fashion Design and Technology' ) {
                result.BSFD++;
              }
              else if (student.course === 'BS-FILM' || student.course === 'Bachelor of Arts in Film and Visual Effects' ) {
                result.BSFILM++;
              }
              else if (student.course === 'BS-MUSIC' || student.course === 'Bachelor of Arts in Music Production and Sound Design' ) {
                result.BAMUSIC++;
              }
              else if (student.course === 'BSPSYCH' || student.course === 'Bachelor of Arts in Psychology' ) {
                result.BSPSYCH++;
              }
              else if (student.course === 'BSACCT' || student.course === 'Bachelor of Science in Accountancy' ) {
                result.BSACCT++;
              }
            }
          });

          return result;
        })
      );
    }



  getCourses(): Observable<any[]> {
    return this.afs.list('courses').valueChanges();
  }

  getSearchStudent(query: string): Observable<any[]> {
    return this.studentList.pipe(
      map((students: any[]) => {
        return students.filter((student: any) => {
          const values = Object.values(student);
          return values.some((value: any) => typeof value === 'string' && value.includes(query));
        });
      })
    );
  }

  getStudentFromIpfs(ipfsLink: string): Observable<any>{
    return this.http.get(ipfsLink).pipe(
      switchMap((user: any)=>{
        return this.getSearchStudent(this.encryptFunction.decryptData(user.studentId));
      })
    )
  }

  getStudentDiplomaFromBlockchain(txnHash: string, index: number): Observable<any> {
    const TRANSACTION_BY_HASH_QUERY = `?module=proxy&action=eth_getTransactionByHash&txhash=${txnHash}&apikey=${environment.goerli_etherscan.apiKey}`
    if (index == -1) {
      return this.http.get(this.BASE_URL + TRANSACTION_BY_HASH_QUERY).pipe(
        switchMap((item: any) =>{
          let ipfsLink;
          try{
            ipfsLink = web3.utils.hexToAscii(item.result.input).slice(68, 148)
          }catch(err){
            ipfsLink = '';
          }
          return this.http.get(ipfsLink.toString()).pipe(
            switchMap((user: any) => {
              return this.getSearchStudent(this.encryptFunction.decryptData(user.studentId));
            })
          )
        })
      )
    } else {
      return this.http.get(this.BASE_URL + TRANSACTION_BY_HASH_QUERY).pipe(
        switchMap((item: any) =>{
          let ipfsLink;
          try{
            ipfsLink = web3.utils.hexToAscii(item.result.input).slice(68, 148)
          }catch(err){
            ipfsLink = '';
          }
          return this.http.get(ipfsLink.toString()).pipe(
            switchMap((user: any) => {
              return this.getSearchStudent(this.encryptFunction.decryptData(user[index].studentId));
            })
          )
        })
      )
    }
  }

  getStudentFromIpfsByIndex(ipfsLink: string, index: number): Observable<any>{
    return this.http.get(ipfsLink).pipe(
      switchMap((user: any)=>{
        return this.getSearchStudent(this.encryptFunction.decryptData(user[index].studentId));
      })
    )
  }

  deleteStudentRecord(recordKey: any){

    const confirmed = window.confirm("Are you sure you want to delete this record?");
if (confirmed) {
  try {
    const ref = this.afs.list('students');
    ref.remove(recordKey);
  } catch (error) {
  
  }

} else {
  // user clicked "Cancel"
  // do nothing
}
  

}
}