const enum eProductModifier {
  CELL = 'cell',
  WIDE = 'wide',
}

const enum eProductCellSubModifier {
  DEFAULT = 'default',
  REVERSE = 'reverse',
  IMG_SQUARED_PB_VERTICAL = 'img_squared_pb_vertical',
  IMG_SQUARED_PB_HORIZONTAL = 'img_squared_pb_horizontal',
  IMG_RECTANGULAR_PB_VERTICAL = 'img_rectangular_pb_vertical',
  IMG_RECTANGULAR_PB_HORIZONTAL = 'img_rectangular_pb_horizontal',
  IMG_SQUARED_PB_VERTICAL_OVER = 'img_squared_pb_vertical_over',
  IMG_SQUARED_PB_HORIZONTAL_OVER = 'img_squared_pb_horizontal_over',
  IMG_RECTANGULAR_PB_VERTICAL_OVER = 'img_rectangular_pb_vertical_over',
  IMG_RECTANGULAR_PB_HORIZONTAL_OVER = 'img_rectangular_pb_horizontal_over',
}

const enum eProductWideSubModifier {
  DEFAULT = 'default',
}

export { eProductModifier, eProductCellSubModifier, eProductWideSubModifier }
export type TSubModifier = eProductCellSubModifier | eProductWideSubModifier
