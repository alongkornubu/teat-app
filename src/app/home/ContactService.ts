import { Injectable } from '@angular/core';
import { Contact } from './contact';
import 'firebase/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private ngFirestore: AngularFirestore) { }

  // Create
  createUser(user: any) {
    return this.ngFirestore.collection('contact').add(user);
  }

  getData() {
    return this.ngFirestore.collection('contact').snapshotChanges();
  }

  // Update
  updateUser(getid, updatedata: any) {
    return this.ngFirestore.doc('contact/'+getid).update(updatedata);
  }

  // Delete
  deleteUser(delid) {
    return this.ngFirestore.doc('contact/'+delid).delete();
  }
}