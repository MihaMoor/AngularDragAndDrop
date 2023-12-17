import {Component, Input, signal} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop, CdkDragExit,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {SidebarSideEnum} from "./sidebar.enums";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    NzIconModule,
    NgClass,
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
    if(event.item.element.nativeElement.id === this.activeWidget){
      this.activeWidget = '';
      this.isShowWidget = false;
    }
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
    if(this.isShowWidget){
      this.activeWidget = event.item.element.nativeElement.id;
    }
  }

  protected readonly SidebarSideEnum = SidebarSideEnum;
  protected isShowWidget: boolean = false;
  protected activeWidget: string = '';
  protected dropListConnectedTo: (CdkDropList | string)[] | CdkDropList | string = [SidebarSideEnum.LEFT, SidebarSideEnum.RIGHT];

  protected showWidget(icon: string): void {
    if(this.activeWidget === icon) {
      this.activeWidget = '';
      this.isShowWidget = false;
      return;
    }
    this.activeWidget = icon;
    this.isShowWidget = true;
  }
  protected dragExited($event: CdkDragExit<string>): void {
    console.log($event);
    this.activeWidget = '';
    this.isShowWidget = false;
  }
}
