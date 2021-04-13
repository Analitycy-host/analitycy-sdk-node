import fetch from "node-fetch";

interface PrzytnijSeResponse {
    status: number,
    message: string,
    shortUrl?: string
}

export class PrzytnijSeClient {

    public constructor() {}

    async shortenURL(url: string, desiredID?: string): Promise<PrzytnijSeResponse> {
        let request = await fetch("https://przytnij.se/create", {
            headers: {
                "User-Agent": "Analitycy-SDK-node/1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                desiredShortUrl: desiredID
            })
        })
        let response = request.json()
        return response
    }
}