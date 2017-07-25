
export class DomHandler {
      defaultElementId: string = 'gui';
      private element: HTMLCanvasElement;
      constructor(id?: string) {
            console.log('Wildflower launched');
            let elementId = (id) ? id : this.defaultElementId
            this.element = <HTMLCanvasElement>document.getElementById(elementId);
      }

      getCanvas(): HTMLCanvasElement {
            return this.element;
      }
}