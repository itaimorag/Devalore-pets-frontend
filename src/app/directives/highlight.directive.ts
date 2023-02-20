import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) { }
    @Output() onBlur = new EventEmitter()
   
    @HostListener('mouseover', ['$event'])
    onMouseHover(ev: MouseEvent) {
        this.bgColor = 'lightyellow'
        this.isEditable = true
    }
    
    @HostListener('mouseleave')
    onMouseLeave() {
        this.bgColor = ''
        this.isEditable = false
        this.cursor = 'pointer'
    }

    @HostListener('focus')
    onFocus() {
        this.cursor = ''
    }

    @HostListener('blur')
    _onBlur() {
        const { innerText } = this.el.nativeElement
        this.onBlur.emit(innerText)
    }

    @HostBinding('style.backgroundColor')
    bgColor = ''

    @HostBinding('contentEditable')
    isEditable = false


    @HostBinding('style.cursor')
    cursor = 'pointer'

}
