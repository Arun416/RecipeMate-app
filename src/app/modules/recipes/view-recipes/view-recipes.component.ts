import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Name: string;
  id: number;
  Quantity: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,Name:'Pizza Sauce',Quantity:'1tspoon'},
  {id:2,Name:'Baby Spinach',Quantity:'1tspoon'},
  {id:3,Name:'Part-Skim Mozzarella',Quantity:'1tspoon'},
  {id:4,Name:'Artichoke',Quantity:'1tspoon'},
  {id:5,Name:'Bell Pepper',Quantity:'1tspoon'},
  {id:6,Name:'Red Onion',Quantity:'1tspoon'},
  {id:7,Name:'Cherry Tomatoes',Quantity:'1tspoon'},

]


@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.css']
})
export class ViewRecipesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'Name', 'Quantity'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


