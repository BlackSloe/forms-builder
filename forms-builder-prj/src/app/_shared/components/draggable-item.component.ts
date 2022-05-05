import { DraggableItemStyles } from '../../_models/draggable-item-styles';

export class DraggableItemComponent {
    draggableItemStyles: DraggableItemStyles = new DraggableItemStyles();

    public getStylesAsKeyValue(draggableItemStyles: DraggableItemStyles): any {
        const styles = {};

        for(const style of draggableItemStyles.styles) {
            if (style.inStyleArray) {
                styles[style.propName] = style.propValue;
            } 
        }

        return styles;
    }
};
