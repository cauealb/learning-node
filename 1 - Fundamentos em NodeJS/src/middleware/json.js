export async function json(req, res) {
    const buffs = [];

    for await(const chunck of req) {
        buffs.push(chunck);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffs).toString())
    } catch {
        req.body = null;
    }

    res.setHeader('Content-type', 'application/json');
}