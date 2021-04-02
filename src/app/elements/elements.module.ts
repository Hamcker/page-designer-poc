import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { CONTENT_MAPPINGS } from '../constants';
import { ButtonComponent } from './button/button.component';
import { ColumnComponent } from './column/column.component';

import { RowComponent } from './row/row.component';
import { TextinputComponent } from './textinput/textinput.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RemoveWrapperDirective } from '../removewrapper.directive';

export const CONTENT_COMPONENTS = [ColumnComponent,RowComponent,TextinputComponent, ButtonComponent];


export const CONTENT_MAPPINGS_PROVIDER: Provider = [
    {
      provide: CONTENT_MAPPINGS,
      useValue: {
        'C': ColumnComponent,
        'R': RowComponent,
        'TI': TextinputComponent,
        'B': ButtonComponent
      }
    }
  ];

@NgModule({
    imports: [CommonModule, NzInputModule],
    exports: [...CONTENT_COMPONENTS],
    declarations: [...CONTENT_COMPONENTS, RemoveWrapperDirective],
    providers: [...CONTENT_MAPPINGS_PROVIDER],
})
export class ElementsModule { }
