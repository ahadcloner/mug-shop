import React from "react";
import {useCookies} from "react-cookie";
import axios from "axios";

export async function Simple_get(url, auth = true, id, token, meth, data) {
    const config = {
        method: meth,
        url: id ? `${url}${id}` : url,
        headers: {
            ...(auth ? {authorization: 'Bearer ' + token} : {})
        },
        data: {
            ...(data ? data : {})
        }
    }

    try {
        const res = await axios.request(config);
        return [res.data.data, res.data.message, res.status];
    } catch (err) {
        return [err]
    }
}