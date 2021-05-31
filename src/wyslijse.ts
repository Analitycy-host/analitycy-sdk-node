import fetch from "node-fetch";
import formData from "form-data";

export class WyslijSeClient {

    token: string | undefined;
    APIUrl: string = `https://api.wyslij.se` || process.env.WYSLIJSE_URL;

    public constructor(token: string) {
        this.token = token || process.env.WYSLIJSE_TOKEN
    };

    async uploadFile(content: StreamPipeOptions): Promise<WyslijSeUpload> {
        let form = new formData();
        form.append('file', content);
        let request = await fetch(`${this.APIUrl}/api/v1/upload/`, {
            method: "POST",
            headers: {
                "User-Agent": "Analitycy-SDK-node/1",
                'Authorization': `Bearer ${this.token}`
            },
            body: form
        })
        let response = request.json()
        return response
    };

    async listFiles(): Promise<WyslijSeListResponse> {
        let request = await fetch(`${this.APIUrl}/api/v1/list/`, {
            method: "GET",
            headers: {
                "User-Agent": "Analitycy-SDK-node/1",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.token}`
            }
        })
        return request.json()
    };

    async deleteFiles(toDelete: string): Promise<WyslijSeDeleteResponse> {
        let request = await fetch(`${this.APIUrl}/api/v1/delete/`, {
            method: "DELETE",
            headers: {
                "User-Agent": "Analitycy-SDK-node/1",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                delete: toDelete
            })
        })
        return request.json()
    };
};

interface WyslijSeUpload {
    status: number,
    message: string | undefined,
    url: string | undefined,
}

interface WyslijSeListResponse {
    status: number,
    message: string | undefined,
    tag: string,
    files: Array<Array<WyslijSeListResponseFiles>> | undefined | null,
    fileCount: number,
    size: number
}

interface WyslijSeListResponseFiles {
    fileName: string,
    fileSize: number
}

interface WyslijSeDeleteResponse {
    status: number,
    message: string | undefined,
}