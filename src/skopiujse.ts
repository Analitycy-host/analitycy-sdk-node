import fetch from "node-fetch";

interface SkopiujSeResponse {
    key: string
}

export class SkopiujSeClient {

    public constructor() {}

    async createPaste(content: string): Promise<SkopiujSeResponse> {
        let request = await fetch("https://skopiuj.se/documents", {
            method: "POST",
            headers: {
                "User-Agent": "Analitycy-SDK-node/1",
                "Content-Type": "application/json"
            },
            body: content
        })
        let response = request.json()
        return response
    }
}