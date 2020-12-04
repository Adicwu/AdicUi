import AwButton from './Button/index.js';
import AwWaterfall from './Waterfall/index.js';
import AwWaterfallColumn from './WaterfallColumn/index.js';
import AwCarousel from './Carousel/index.js';
import AwCarouselItem from './CarouselItem/index.js';
import AwCollapse from './Collapse/index.js';
import AwCollapseItem from './CollapseItem/index.js';
import AwOverlay from './Overlay/index.js';
import AwSwitch from './Switch/index.js';
import AwTextField from './TextField/index.js';
import AwBackTop from './BackTop/index.js';
import AwRadioGroup from './RadioGroup/index.js';
import AwRadio from './Radio/index.js';
import AwRadioButton from './RadioButton/index.js';
import AwCheckboxGroup from './CheckboxGroup/index.js';
import AwCheckbox from './Checkbox/index.js';
import AwCheckboxButton from './CheckboxButton/index.js';
import AwSelect from './Select/index.js';
import AwOption from './Option/index.js';
import AwDragItem from "./DragItem/index.js";
import AwDragGroup from "./DragGroup/index.js";
import AwSlider from "./Slider/index.js";
import AwNotification from "./Notification/index.js";

import AwScrollbar from "./Scrollbar/src/scrollbar.js";
import AwCollapseTransition from "@src/transitions/collapse-transition.js";

const components = [
    AwButton,
    AwWaterfall,
    AwWaterfallColumn,
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
    AwDragItem,
    AwDragGroup,
    AwSlider,
    AwCollapseTransition,
    AwScrollbar,
    AwNotification
]
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    components.forEach(component => Vue.component(component.name, component))
    Vue.prototype.$notify = AwNotification
}
if (typeof window !== 'undefined' && window.Vue) install(window.Vue)
export default {
    install
}