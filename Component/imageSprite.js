const INIT_IMAGE = [
  {
    key: "cloud1",
    path: "assets/scenery/overworld/cloud1.png",
  },
  {
    key: "cloud2",
    path: "assets/scenery/overworld/cloud2.png",
  },
  {
    key: "floorbricks",
    path: "assets/scenery/overworld/floorbricks.png",
  },
  {
    key: "mushroom",
    path: "assets/collectibles/super-mushroom.png",
  },
  {
    key: "mountain1",
    path: "assets/scenery/overworld/mountain1.png",
  },
  {
    key: "mountain2",
    path: "assets/scenery/overworld/mountain2.png",
  },
  {
    key: "bush1",
    path: "assets/scenery/overworld/bush1.png",
  },
  {
    key: "bush2",
    path: "assets/scenery/overworld/bush2.png",
  },
  {
    key: "emptyBlock",
    path: "assets/blocks/overworld/emptyBlock.png",
  },
  {
    key: "block",
    path: "assets/blocks/overworld/block.png",
  },
  {
    key: "vertical-small-tube",
    path: "assets/scenery/vertical-small-tube.png",
  },
  {
    key: "vertical-medium-tube",
    path: "assets/scenery/vertical-medium-tube.png",
  },
  {
    key: "vertical-large-tube",
    path: "assets/scenery/vertical-large-tube.png.png",
  },
];

export const imageSprite = ({ load }) => {
  INIT_IMAGE.forEach(({ key, path }) => {
    load.image(key, path);
  });
};
