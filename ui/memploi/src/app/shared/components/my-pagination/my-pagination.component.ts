import { Component, EventEmitter, Input, Output } from '@angular/core';
import { generatePaginationRange } from './pagination.util';

@Component({
  selector: 'app-my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.scss']
})
export class MyPaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<any>();

  get paginationRange() {
    return generatePaginationRange(this.currentPage, this.totalPages);
  }

  onPageChange(page: number, e: any) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit({page, e });
    }
  }
}
