import { DraggableItemStyles } from '../../_models/draggable/draggable-item-styles';

export class DraggableItemComponent {
    public draggableItemStyles: DraggableItemStyles;

    constructor() {
        this.draggableItemStyles = new DraggableItemStyles();
    }

    public getStylesAsKeyValue(draggableItemStyles: DraggableItemStyles): any {
        let styles = {};

        for(const style of draggableItemStyles.styles) {
            if (style.inStyleArray) {
                styles[style.propName] = style.propValue;
            } 
        }

        return styles;
    }

    public getPlaceHolderText(draggableItemStyles: DraggableItemStyles): string {
        return draggableItemStyles.styles.find((value) => value.propName === 'placeHolderText')?.propValue;
    }
};
