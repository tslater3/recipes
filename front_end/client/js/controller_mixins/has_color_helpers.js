export default /* @ngInject */ function($mdColorPalette) {
  return {
    getMaterialColor(base, shade) {
      var color = $mdColorPalette[base][shade].value;
      return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    },
    getMaterialColorCss(base, shade) {
      return `color: ${this.getMaterialColor(base, shade)};`;
    }
  };
}
