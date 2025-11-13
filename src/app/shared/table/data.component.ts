import {AfterViewInit, Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


export interface TableAction<T = any> {
  name?: string;  
  label?: string;        
  icon?: string;   
  color?: 'primary' | 'accent' | 'warn' | string; 
  handler?: (row: T) =>void
}

@Component({
  selector: 'data-table',
  templateUrl: './data.component.html',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
})
export class DataTable implements AfterViewInit {
  @Input() columns: string[]= [];
  @Input() rows: Record<string, any>[]= [];
  @Input() actions: TableAction[] = [];

  @Output() pageChanged= new EventEmitter<PageEvent>();

  
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe((value: PageEvent)=>{
        this.pageChanged.emit(value);
    })
  }
  ngOnChanges(){
    this.dataSource = new MatTableDataSource<any>(this.rows);
     if (this.actions?.length && !this.columns.includes('actions')) {
        this.columns = [...this.columns, 'actions'];
    }
  }

  onAction(action: TableAction, row: any) {
    action.handler?.(row);
  }
}

