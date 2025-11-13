import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
    selector:"[columnTemplate]"
})
export class ColumnTemplateDirective {
    @Input('columnTemplate') name! :string;
    constructor(public template: TemplateRef<any>){}

}