import {Component, Input} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragExit,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {SidebarSideEnum, SidebarWidgetNamesEnum} from "./sidebar.enums";
import {NgClass} from "@angular/common";
import {CheckWidgetWidget} from "../check-widget/check-widget.widget";
import {HomeWidgetWidget} from "../home-widget/home-widget.widget";
import {QuestionWidgetWidget} from "../question-widget/question-widget.widget";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    NzIconModule,
    NgClass,
    CheckWidgetWidget,
    HomeWidgetWidget,
    QuestionWidgetWidget,
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

  protected readonly SidebarWidgetNamesEnum = SidebarWidgetNamesEnum;
  protected readonly SidebarSideEnum = SidebarSideEnum;
  protected isShowWidget: boolean = false;
  protected activeWidget: SidebarWidgetNamesEnum = SidebarWidgetNamesEnum.EMPTY;
  protected dropListConnectedTo: (CdkDropList | string)[] | CdkDropList | string = [SidebarSideEnum.LEFT, SidebarSideEnum.RIGHT];

  protected showWidget(icon: string): void {
    if(this.activeWidget === this.getWidgetName(icon)) {
      this.activeWidget = SidebarWidgetNamesEnum.EMPTY;
      this.isShowWidget = false;
      return;
    }
    this.activeWidget = this.getWidgetName(icon);
    this.isShowWidget = true;
  }
  private getWidgetName(iconName: string): SidebarWidgetNamesEnum {
    switch (iconName){
      case 'home':
        return SidebarWidgetNamesEnum.HOME;
      case 'check-circle':
        return SidebarWidgetNamesEnum.CHECK;
      case 'question-circle':
        return SidebarWidgetNamesEnum.QUESTION;
      case 'pic-right':
        return SidebarWidgetNamesEnum.EMPTY;
      case 'pic-left':
        return SidebarWidgetNamesEnum.EMPTY;
      case 'fullscreen':
        return SidebarWidgetNamesEnum.EMPTY;
      case 'fullscreen-exit':
        return SidebarWidgetNamesEnum.EMPTY;
      default:
        return SidebarWidgetNamesEnum.EMPTY;
    }
  }

  protected dragExited($event: CdkDragExit<string>): void {
    this.activeWidget = SidebarWidgetNamesEnum.EMPTY;
    this.isShowWidget = false;
  }
  public dropped(event: CdkDragDrop<string[], any>): void {
    if(event.item.element.nativeElement.id === this.activeWidget){
      this.activeWidget = SidebarWidgetNamesEnum.EMPTY;
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
      this.activeWidget = this.getWidgetName(event.item.element.nativeElement.id);
    }
  }
}
