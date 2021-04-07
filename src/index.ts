import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo";

createConnection().then(async connection => {
    // console.log("done...");
    // let photo = new Photo();
    // photo.name = "Me and Girls";
    // photo.description = "I am near girls.";
    // photo.filename = "photo-with-girls.jpg";
    // photo.views = 100;
    // photo.isPublished = true;

    let photoRepository = connection.getRepository(Photo);

    // await photoRepository.save(photo);
    // console.log("Photo has been saved");

    let foundPhoto = await photoRepository.find({id : 2});
    if(foundPhoto){
        console.log('Data', foundPhoto);

    }else{
        console.log('cannot found...');
    }

}).catch(error => console.log(error));
// interface Person{
//     name: string,
//     age: number,
//     hobbies: string[];
   
// }

// class Employee {
//     constructor(id){

//     }
// }

// function add(a:number, b?:number): number{
//     return a+b;
// }
// function addPerson(person: Person) : string{

//     return person.name
// }
// console.log(addPerson({
//     name: 'zaytsev',
//     age:20,
//     hobbies:['game','music']
// }));

