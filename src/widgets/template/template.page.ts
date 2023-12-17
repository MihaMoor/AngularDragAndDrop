import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {SidebarWidget} from "../sidebar/sidebar.widget";
import {NzResizableModule} from "ng-zorro-antd/resizable";
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import {SidebarSideEnum} from "../sidebar/sidebar.enums";

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    NzLayoutModule,
    SidebarWidget,
    NzResizableModule
  ],
  templateUrl: './template.page.html',
  styleUrl: './template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePage {

  protected readonly SidebarSideEnum = SidebarSideEnum;
  protected leftIconsSet: string[] = ['home','check-circle'];
  protected rightIconsSet: string[] = ['question-circle','pic-right','pic-left'];
}
