import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


export class TODO {
  $key: string;
  name: string;
  latitud: string;
  longitud: string;
}

@Injectable({
  providedIn: 'root',
})


export class CrudService {
  constructor(private ngFirestore: AngularFirestore, private router: Router) {}

  create(todo: TODO) {
    return this.ngFirestore.collection('positions').add(todo);
  }

  getTasks() {
    return this.ngFirestore.collection('positions').snapshotChanges();
  }

  getTask(id) {
    return this.ngFirestore.collection('positions').doc(id).valueChanges();
  }

  update(id, todo: TODO) {
    this.ngFirestore
      .collection('positions')
      .doc(id)
      .update(todo)
      .then(() => {
        this.router.navigate(['/todo-list']);
      })
      .catch((error) => console.log(error));
  }

  delete(id: string) {
    this.ngFirestore.doc('positions/' + id).delete();
  }
}
