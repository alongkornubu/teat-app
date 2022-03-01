import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Contact } from './contact';
import { ContactService } from './ContactService';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
//export class HomePage {

  //constructor() {}
  export class HomePage implements OnInit {
    stdobj: any;
     searchTerm: string;
    constructor(private apiservice: ContactService, private alertCtrl: AlertController,
      private router: Router, private ngFirestore: AngularFirestore) { }
  
  
  
    ngOnInit() {
      this.apiservice.getData().subscribe((res) => {
        this.stdobj = res.map((t) => ({
            getid: t.payload.doc.id,
            name: t.payload.doc.data()['name'.toString()],
            phone: t.payload.doc.data()['phone'.toString()],
            note: t.payload.doc.data()['note'.toString()]
          }));
          console.log(this.stdobj);
        });
  
        
        
  
      }//method
  
      async presentPromptAdd() {
        const alert = this.alertCtrl.create({
          header: 'Add',
          inputs: [
            {
              name: 'inputname',
              placeholder: 'Name'
            },
            {
              name: 'inputphone',
              placeholder: 'Call'
            },
            {
              name: 'inputnote',
              placeholder: 'Note'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Add',
              handler: data => {
                const tmpdata = {};
                 tmpdata['name'.toString()] = data.inputname;
                 tmpdata['phone'.toString()] = data.inputphone;
                 tmpdata['note'.toString()] = data.inputnote;
                    this.apiservice.createUser(tmpdata);
                    console.log(tmpdata);
              }
            }
          ]
        });
        (await alert).present();
      }
  
      async presentConfirmDelete(delid: any) {
        const alert = this.alertCtrl.create({
          header: 'Delete', // Header
          message: 'Do you want to delete?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Delete',
              handler: () => {
              console.log('Cancel clicked');
  
                this.apiservice.deleteUser(delid);
              }
            }
          ]
        });
        (await alert).present();
      }
  
  // Update
      //async presentPromptEdit(id, name, age, address) {
        async presentPromptEdit(tmpobj) {
        const alert = this.alertCtrl.create({
          header: 'Edit',
          message: 'Now you are editing ',
          inputs: [
            {
              name: 'name',
              placeholder: tmpobj.name,
              value: tmpobj.name
            },
            {
              name: 'phone',
              placeholder:tmpobj.phone,
              value: tmpobj.phone
            },
            {
              name: 'note',
              placeholder: tmpobj.note,
              value: tmpobj.note
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Update',
              handler: data => {
                const updatedata = {};
                 updatedata['name'.toString()] = data.name;
                 updatedata['phone'.toString()] = data.phone;
                 updatedata['note'.toString()] = data.note;
                 ///this.ngFirestore.doc('/Student/'+id).update(updatedata);
                 this.apiservice.updateUser(tmpobj.getid, updatedata);
                 console.log(updatedata);
              }
            }
          ]
        });
        (await alert).present();
      }
  
  
  }//class
  
