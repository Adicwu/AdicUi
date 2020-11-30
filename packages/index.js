import AwWaterfall from './Waterfall/src/Waterfall.vue';
import AwWaterfallColumn from './WaterfallColumn/src/WaterfallColumn.vue';
import AwButton from './Button/src/Button.vue';
import AwCarousel from './Carousel/src/Carousel.vue';
import AwCarouselItem from './CarouselItem/src/CarouselItem.vue';
import AwCollapse from './Collapse/src/Collapse.vue';
import AwCollapseItem from './CollapseItem/src/CollapseItem.vue';
import AwOverlay from './Overlay/src/Overlay.vue';
import AwSwitch from './Switch/src/Switch.vue';
import AwTextField from './TextField/src/TextField.vue';
import AwBackTop from './BackTop/src/BackTop.vue';
import AwRadioGroup from './RadioGroup/src/RadioGroup.vue';
import AwRadio from './Radio/src/Radio.vue';
import AwRadioButton from './RadioButton/src/RadioButton.vue';
import AwCheckboxGroup from './CheckboxGroup/src/CheckboxGroup.vue';
import AwCheckbox from './Checkbox/src/Checkbox.vue';
import AwCheckboxButton from './CheckboxButton/src/CheckboxButton.vue';
import AwSelect from './Select/src/Select.vue';
import AwOption from './Option/src/Option.vue';
import AwDragItem from "./DragItem/src/DragItem.vue";
import AwDragGroup from "./DragGroup/src/DragGroup.vue";
import AwSlider from "./Slider/src/Slider.vue";
import AwScrollbar from "./Scrollbar/src/scrollbar.js";

import AwCollapseTransition from "@src/transitions/collapse-transition.js";

const components = [
    AwWaterfall,
    AwWaterfallColumn,
    AwButton,
    AwCarousel,
    AwCarouselItem,
    AwCollapse,
    AwCollapseItem,
    AwOverlay,
    AwSwitch,
    AwTextField,
    AwBackTop,
    AwRadioGroup,
    AwRadio,
    AwRadioButton,
    AwCheckboxGroup,
    AwCheckbox,
    AwCheckboxButton,
    AwSelect,
    AwOption,
    AwCollapseTransition,
    AwDragItem,
    AwDragGroup,
    AwSlider,
    AwScrollbar
]
const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) install(window.Vue)
export default {
    install
}