export function BuildRoutePath(path) {
    const regex = /:([a-zA-Z]+)/g;
    const newPathRegex = path.replaceAll(regex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${newPathRegex}(?<query>\\?(.*))?$`);
    return pathRegex;
}