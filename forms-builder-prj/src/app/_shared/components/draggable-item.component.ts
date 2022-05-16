import { DraggableItemStyles } from '../../_models/draggable/draggable-item-styles';

export class DraggableItemComponent {
    public draggableItemStyles: DraggableItemStyles;

    constructor() {
        this.draggableItemStyles = new DraggableItemStyles();
    }

    public getStylesAsKeyValue(draggableItemStyles: DraggableItemStyles): any {
        const styles = {};

        for (const style of draggableItemStyles.styles) {
            if (style.inStyleArray) {
                styles[style.propName] = style.propValue;
            }
        }

        return styles;
    }

    public style(styleName: string): string {
        return this.draggableItemStyles.styles.find((value) => value.propName === styleName)?.propValue;
    }
};
