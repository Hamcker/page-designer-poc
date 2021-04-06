import { TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { BaseRenderer } from "../base-renderer";
import { RendererRepository } from "../repositories/renderer-repository";
import { ToolboxElement } from "../toolbox-element";

export function renderer(toolboxElement: ToolboxElement) {
   return <T extends Type<BaseRenderer>>(constructor: T) => {
      RendererRepository.register({ toolboxElement, componentType: constructor });
   }
}
