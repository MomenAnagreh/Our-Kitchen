import { Component, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css'],
})
export class AddPopupComponent implements OnInit {
  name: string = '';
  description: string = '';
  price!: number;
  url!: URL;

  constructor(
    public dishesService: DishesService,
    public generalService: GeneralService
  ) {}

  ngOnInit(): void {}

  onChange(e: any) {
    if (e) {
      let reader = new FileReader();
      this.dishesService.file = e.target.files[0];

      reader.onload = (e: any) => {
        this.url = e.target.result;
      };

      reader.onerror = (e: any) => {
        console.log('File cannot be read: ' + e.target.error.code);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  Submit() {
    if (this.url && this.name && this.description && this.price) {
      this.dishesService.addFile(
        this.name,
        this.description,
        '$' + this.price.toString()
      );
      this.generalService.popupShow = false;
    }
  }

  hide() {
    this.dishesService.file = {} as File;
    this.generalService.popupShow = false;
  }
}
