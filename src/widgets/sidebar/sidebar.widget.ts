import {Component, Input} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {SidebarSideEnum} from "./sidebar.enums";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    NzIconModule,
  ],
  templateUrl: './sidebar.widget.html',
  styleUrl: './sidebar.widget.css'
})
export class SidebarWidget {
  @Input()
  public side: SidebarSideEnum = SidebarSideEnum.LEFT;
  @Input()
  public iconSet: string[] = [];
  @Input()
  public id: string = SidebarSideEnum.LEFT;

  public dropped(event: CdkDragDrop<string[], any>): void {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  protected readonly SidebarSideEnum = SidebarSideEnum;
}
