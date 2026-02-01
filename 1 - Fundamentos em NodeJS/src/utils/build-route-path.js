export function BuildRoutePath(path) {
    const regex = /:([a-zA-Z]+)/g;

    console.log(Array.from(path.matchAll(regex)))
}