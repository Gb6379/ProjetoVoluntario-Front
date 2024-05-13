import { NextApiRequest, NextPageContext } from "next";
import { parseCookies } from "nookies";


export class StorageService {
    static getCookie = (name: string, ctx?: Pick<NextPageContext, "req"> | {
        req:NextApiRequest;
    }): string | null => {
        const cookies = parseCookies(ctx);
        return cookies[name] || null;
    }

}