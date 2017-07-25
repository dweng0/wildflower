export class DomHandler {
      defaultElementId: string = 'gui';
      element: HTMLCanvasElement;
      constructor(id?: string) {
            let elementId = (id) ? id : this.defaultElementId
            this.element = <HTMLCanvasElement>document.getElementById(elementId);
      }

      getCanvas(): HTMLCanvasElement {
            return this.element;
      }
}