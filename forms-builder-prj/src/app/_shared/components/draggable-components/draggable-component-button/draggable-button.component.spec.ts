import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableItemStyles } from 'src/app/_models/draggable/draggable-item-styles';
import { DraggableButtonComponent } from './draggable-button.component';

describe('FormBuilderComponent', () => {
    let component: DraggableButtonComponent;
    let fixture: ComponentFixture<DraggableButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DraggableButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DraggableButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('style', () => {
        it('should return style value by name', () => {
            const expectedPropValue = 'qwezlckajdshjaieklawew';

            component.draggableItemStyles = new DraggableItemStyles();
            component.draggableItemStyles.styles = [
                { inStyleArray: false, propName: 'hello', propValue: '123', validationRules: [] },
                { inStyleArray: true, propName: 'placeHolderText', propValue: expectedPropValue, validationRules: [] },
            ]

            const actualPropValue = component.style('placeHolderText');

            expect(actualPropValue).toBe(expectedPropValue);
        });

        it('should return undefined', () => {
            component.draggableItemStyles = new DraggableItemStyles();
            component.draggableItemStyles.styles = [
                { inStyleArray: false, propName: 'hello', propValue: '123', validationRules: [] },
                { inStyleArray: true, propName: 'placeHolderText', propValue: '123', validationRules: [] },
            ]

            const actualPropValue = component.style('wow');

            expect(actualPropValue).toBe(undefined);
        });
    });
});

