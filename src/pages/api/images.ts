import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';
import { NextApiRequest, NextApiResponse } from 'next';

export default function Handle(req: NextApiRequest, res: NextApiResponse) {
    const { img } = req.query;

    const { serverRuntimeConfig } = getConfig();
    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public', 'img');

    // ?img=imgname.extension
    if(img) {
        const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, './public', 'img', img.toString());

        if(!fs.existsSync(filePath)) {
            return res.status(404).send('error: file don\'t exists');
        }
        
        const file = fs.readFileSync(filePath);
        res.writeHead(200, {'Content-Type': 'image/png'});
        return res.end(file);
    }

    const filenames = fs.readdirSync(dir);

    res.statusCode = 200;
    res.json(filenames);
};
