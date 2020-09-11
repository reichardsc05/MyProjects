export function detectCollision(object1, object2) {
  let bottomOfobject1 = object1.position.y + object1.size;
  let topOfobject1 = object1.position.y;

  let topOfObject = object2.position.y;
  let leftSideOfObject = object2.position.x;
  let rightSideOfObject = object2.position.x + object2.width;
  let bottomOfObject = object2.position.y + object2.height;

  if (
    bottomOfobject1 >= topOfObject &&
    topOfobject1 <= bottomOfObject &&
    object1.position.x >= leftSideOfObject &&
    object1.position.x + object1.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
