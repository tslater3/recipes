import _ from 'lodash';

const Stylesheet = class Stylesheet {
  constructor(stylesheet) {
    this.stylesheet = stylesheet;
  }

  rulesLength() {
    const rules = this.stylesheet.cssRules || this.stylesheet.rules || {};
    return rules.length;
  }

  addCssRule(selector, rules, index = this.rulesLength()) {
    if("insertRule" in this.stylesheet) {
      this.stylesheet.insertRule(`${selector} { ${rules} }`, index);
    } else if("addRule" in this.stylesheet) {
      this.stylesheet.addRule(selector, rules, index);
    }

    return this;
  }

  addBackgroundColorRule(selector, color_value) {
    this.addCssRule(selector, `background: ${color_value};`);
  }

  addNestedIconsBackgroundColorRule(selector, color_value) {
    this.addCssRule(`${selector} md-icon`, `background: ${color_value};`);
  }

  addNestedIconsForegroundColorRule(selector, color_value) {
    this.addCssRule(`${selector} md-icon`, `color: ${color_value};`);
  }

  addForegroundColorRule(selector, color_value) {
    this.addCssRule(selector, `color: ${color_value};`);
  }

  addBorderColorRule(selector, color_value) {
    this.addCssRule(selector, `border-color: ${color_value};`);
  }

  addBackgroundColorOnHoverRule(selector, color_value) {
    this.addCssRule(`${selector}:hover`, `background: ${color_value};`);
  }

  addForegroundColorOnHoverRule(selector, color_value) {
    this.addCssRule(`${selector}:hover`, `color: ${color_value};`);
  }

  addTextShadowTopRule(selector, color_value) {
    this.addCssRule(`${selector}`, `text-shadow: 0 0 -1px ${color_value};`);
  }

  addTextShadowBottomRule(selector, color_value) {
    this.addCssRule(`${selector}`, `text-shadow: 0 0 1px ${color_value};`);
  }
};

const prefixes = {
  bg: 'bg',
  fg: 'fg',
  nested_icons_bg: 'nested-icons-bg',
  nested_icons_fg: 'nested-icons-fg',
  on_hover_bg: 'on-hover-bg',
  on_hover_fg: 'on-hover-fg',
  border: 'border',
  text_shadow_top: 'text-shadow-top',
  text_shadow_bottom: 'text-shadow-bottom'
};

function createStyleTag() {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  style.type = "text/css";
  document.head.appendChild(style);
  return style;
}

export default /* @ngInject */ function($mdColorPalette) {
  const style = createStyleTag();
  const sheet = new Stylesheet(style.sheet);

  _.each($mdColorPalette, function(palette, color_name){
    _.each(palette, function(hex, intensity){
      const selector_suffix = `${color_name}-${intensity}`;

      sheet.addBackgroundColorRule(`.${prefixes.bg}-${selector_suffix}`, hex);
      sheet.addBackgroundColorOnHoverRule(`.${prefixes.on_hover_bg}-${selector_suffix}`, hex);
      sheet.addForegroundColorRule(`.${prefixes.fg}-${selector_suffix}`, hex);
      sheet.addForegroundColorOnHoverRule(`.${prefixes.on_hover_fg}-${selector_suffix}`, hex);
      sheet.addBorderColorRule(`.${prefixes.border}-${selector_suffix}`, hex);
      sheet.addNestedIconsBackgroundColorRule(`.${prefixes.nested_icons_bg}-${selector_suffix}`, hex);
      sheet.addNestedIconsForegroundColorRule(`.${prefixes.nested_icons_fg}-${selector_suffix}`, hex);
    });
  });
}
