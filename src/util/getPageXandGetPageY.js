export default function getPageXandGetPageY(event) {
  function inJestTest() {
    return process.env.JEST_WORKER_ID !== undefined;
  }
  let pageX;
  let pageY;
  // Necessary because test environment doesn't support pageX and pageY
  if (inJestTest()) {
    pageX = event.screenX;
    pageY = event.screenY;
  } else {
    pageX = event.pageX;
    pageY = event.pageY;
  }

  return { pageX, pageY };
}
