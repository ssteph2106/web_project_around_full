import type { UserData } from "../interfaces/UserData";
import type { CardData } from "../interfaces/CardData";

export interface ApiOptions {
baseUrl: string;    
headers: HeadersInit;
}

export class Api {
private baseUrl: string;
private headers: HeadersInit;

constructor(options: ApiOptions) {
this.baseUrl = options.baseUrl;
this.headers = options.headers;
}

private getHeaders(): Headers {
    const headers = new Headers(this.headers);
    const token = localStorage.getItem("jwt");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}

private async checkResponse(res: Response) {
    if(res.ok) {
        return await res.json();
    }
    throw new Error (`Error: ${res.status}`);

}

async getUserInfo() {
const res: Response = await fetch(`${this.baseUrl}/users/me`, {
headers: this.getHeaders()
});
return this.checkResponse(res);
}

async getInitialCards() {
    const res: Response = await fetch(`${this.baseUrl}/cards`, {
       headers: this.getHeaders()
    });
return this.checkResponse(res);
}

async editUserInfo(data: {name: string; about:string}): Promise<UserData> {
    const res: Response = await fetch (`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        }),
    });
    return this.checkResponse(res);
}

async addCard(data: {name: string; link: string}): Promise<CardData> {
const res: Response = await fetch (`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        }),
    });
    return this.checkResponse(res);    
}

async updateAvatar(data: {avatar: string}): Promise<UserData> {
    const res: Response = await fetch (`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify({
           avatar: data.avatar
        }),
    });
    return this.checkResponse(res);
}

async likeCard(cardId: string): Promise<CardData> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.getHeaders(),
        }
    );
    return this.checkResponse(res);
}

async deleteCardLike(cardId: string): Promise<CardData> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.getHeaders(),
        }
    );
    return this.checkResponse(res);
}

async deleteCard(cardId: string): Promise<void> {
    const res: Response = await fetch (`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        }
    );
    await this.checkResponse(res)
}
}

export const api = new Api ({
baseUrl: import.meta.env.VITE_API_URL,
headers: {
  "Content-Type": "application/json",
},
});

export default api;