import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DTable } from "./DTable";

@Component({
  selector: 'd-table-monkata',
  templateUrl: "./view/dtable.template.html",
  styles: []
})
export class DTableComponent<T> implements OnInit {
    @Input()  DTable! : DTable<T>;
    @Output() pageChanged = new EventEmitter<any>();
    @Input() totalPages!: number;
    @Output() getRow: EventEmitter<T> = new EventEmitter<T>();



    ngOnInit(): void {
      console.log(this.DTable);
    }
  
    getValue(row: any , key: string){
      return key ? row[key] : "";
    }
  
    onPageChange(data: any): void {
      if (this.DTable.pagination != undefined) {
         this.DTable.pagination.newPage = data.page;
      }
      this.pageChanged.emit(data);
    }

    clickGetRow(row: T) {
      this.getRow.emit(row);
    }

    onAction(e: any) {
      
    }
}