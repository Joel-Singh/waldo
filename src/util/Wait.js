export default async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms))
}
